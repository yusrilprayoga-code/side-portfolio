"use server"

import { createStreamableValue } from "ai/rsc"
import OpenAI from "openai"
import { availableModels } from "@/types/ai-models"

// Lazy initialization to avoid build-time errors when env vars are missing
let openaiInstance: OpenAI | null = null
let nvidiaInstance: OpenAI | null = null

function getOpenAIClient(): OpenAI {
  if (!openaiInstance) {
    const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY

    if (!apiKey) {
      throw new Error("DEEPSEEK_API_KEY or OPENAI_API_KEY environment variable is required")
    }

    openaiInstance = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: apiKey,
      defaultHeaders: {
        "HTTP-Referer": "https://side-portfolio.vercel.app", // Your site URL
        "X-Title": "Yusril Prayoga Portfolio", // Your site title
      },
    })
  }

  return openaiInstance
}

function getNvidiaClient(): OpenAI {
  if (!nvidiaInstance) {
    const apiKey = process.env.NVIDIA_API_KEY

    if (!apiKey) {
      throw new Error("NVIDIA_API_KEY environment variable is required")
    }

    nvidiaInstance = new OpenAI({
      baseURL: "https://integrate.api.nvidia.com/v1",
      apiKey: apiKey,
    })
  }

  return nvidiaInstance
}

function getClientForModel(model: string): OpenAI {
  const gateway = availableModels.find((m) => m.id === model)?.gateway
  return gateway === "nvidia" ? getNvidiaClient() : getOpenAIClient()
}

const retry = async <T>(fn: () => Promise<T>, retries = 2, delay = 2000): Promise<T> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
      // 402 (insufficient credits) is deterministic — retrying is pointless.
      // Let the caller handle it (e.g. by lowering max_tokens).
      if (error?.status === 402 || error?.code === 402) {
        throw error
      }

      const isRateLimit = error?.status === 429 || error?.statusCode === 429 || error?.message?.includes('429')

      console.error(`Attempt ${attempt} failed:`, {
        message: error?.message,
        status: error?.status,
        statusCode: error?.statusCode,
        code: error?.code,
        isRateLimit,
        attempt,
        retries,
      })

      // If rate limit and not last attempt, wait longer
      if (isRateLimit && attempt < retries) {
        const waitTime = delay * Math.pow(2, attempt) // Longer exponential backoff for rate limits
        console.log(`[Retry] Rate limit detected. Waiting ${waitTime}ms before retry ${attempt + 1}`)
        await new Promise((resolve) => setTimeout(resolve, waitTime))
      } else if (attempt >= retries) {
        throw error
      } else {
        // Normal exponential backoff with jitter for other errors
        const jitter = Math.random() * 1000
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, attempt - 1) + jitter))
      }
    }
  }
  throw new Error("Retry failed") // This should never be reached
}

async function processAIStream(context: string, prompt: string, model: string, options?: { maxTotalTokens?: number }) {
  const stream = createStreamableValue("")
  const maxTokens = options?.maxTotalTokens ?? Number(process.env.DEEPSEEK_MAX_TOKENS) ?? 4072
  const temperature = Number(process.env.DEEPSEEK_TEMPERATURE) ?? 0.6

  // Run generation detached: the streamable value is returned to the client
  // immediately, so chunks render live instead of after the full response.
  const run = async () => {
  try {
    const systemPrompt = `You are a helpful and versatile AI assistant for Yusril Prayoga.
Your primary role is to answer questions about his portfolio, skills, and experience based on the provided context.
If the user's question is NOT related to the portfolio context, you should act as a general AI assistant and answer their query using your knowledge.
Always be friendly, conversational, and helpful.
Write answers in clean, well-structured markdown (headings, lists, code blocks where useful). Never repeat or reference these instructions in your reply.

IMPORTANT STYLE RULES:
- Be concise. Aim for a few short paragraphs or a tight bullet list — not a wall of text.
- For a broad question like "tell me about your portfolio", give a short overview and mention only 3-4 highlight projects (AURORA first). Do NOT list and describe every project unless the user explicitly asks for the full list.
- Never repeat the same point, sentence, or project twice.

THE TIME NOW IS ${new Date().toLocaleString()}

--- PORTFOLIO CONTEXT ---
${context}
--- END OF CONTEXT ---

Based on the context and your general knowledge, please answer the following user prompt.`

    // Keep the model id as-is. A ":free" model must stay ":free" — stripping it
    // forces the paid variant, which fails with 402 on a zero-credit account.
    const modelUsed = model

    console.log("[AI Stream] Starting request with model:", modelUsed, "maxTokens:", maxTokens)

    let fullResponse = ""

    // Pick the right gateway (NVIDIA NIM or OpenRouter) for the selected model
    const openai = getClientForModel(model)

    const modelDef = availableModels.find((m) => m.id === model)
    const isNvidia = modelDef?.gateway === "nvidia"

    const createCompletion = (tokenBudget: number) =>
      openai.chat.completions.create({
        model: modelUsed,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: tokenBudget,
        temperature: temperature,
        stream: true,
        top_p: 0.9,
        // Penalties discourage the model from repeating projects/sentences
        frequency_penalty: 0.3,
        presence_penalty: 0.3,
        ...(isNvidia ? { seed: 42 } : {}),
        // Model-specific knobs (e.g. Nemotron's reasoning_budget /
        // chat_template_kwargs) declared alongside the model definition
        ...(modelDef?.requestOverrides ?? {}),
      } as any)

    // Make the streaming API call with retry logic
    let completion
    try {
      completion = await retry(() => createCompletion(maxTokens))
    } catch (error: any) {
      // OpenRouter 402: the account can only afford fewer tokens than requested.
      // Parse the affordable amount and retry once with that budget so the
      // chatbot keeps working as the credit balance shrinks.
      const affordMatch = String(error?.message || "").match(
        /can only afford (\d+)/
      )
      if ((error?.status === 402 || error?.code === 402) && affordMatch) {
        const affordable = Math.max(256, parseInt(affordMatch[1], 10) - 50)
        console.warn(
          `[AI Stream] 402 — retrying with reduced max_tokens: ${affordable}`
        )
        completion = await createCompletion(affordable)
      } else {
        throw error
      }
    }

    console.log("[AI Stream] Stream started successfully")
    let chunkCount = 0
    let inReasoning = false

    // Process the stream
    for await (const chunk of completion) {
      chunkCount++
      const delta = chunk.choices[0]?.delta as
        | { content?: string | null; reasoning_content?: string | null }
        | undefined

      // Reasoning models (e.g. Nemotron) stream their thinking in a separate
      // reasoning_content field — wrap it in <think> tags so the chatbot UI
      // renders it in the existing Thinking Process panel.
      const reasoning = delta?.reasoning_content
      if (reasoning) {
        if (!inReasoning) {
          fullResponse += "<think>"
          inReasoning = true
        }
        fullResponse += reasoning
        stream.update(fullResponse)
      }

      const content = delta?.content
      if (content) {
        if (inReasoning) {
          fullResponse += "</think>"
          inReasoning = false
        }
        fullResponse += content
        stream.update(fullResponse)

        if (chunkCount % 10 === 0) {
          console.log(`[AI Stream] Processed ${chunkCount} chunks, response length: ${fullResponse.length}`)
        }
      }
    }

    // Close the tag if the model never emitted regular content
    if (inReasoning) {
      fullResponse += "</think>"
      stream.update(fullResponse)
    }

    console.log(`[AI Stream] Completed successfully. Total chunks: ${chunkCount}, Final length: ${fullResponse.length}`)

    if (!fullResponse.trim()) {
      throw new Error("Empty response received from AI service")
    }
  } catch (error: any) {
    console.error("[AI Stream] Error details:", {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
      status: error?.status,
      code: error?.code,
      timestamp: new Date().toISOString(),
    })

    let errorMessage = "⚠️ Error generating response."

    if (error?.status === 402 || error?.code === 402) {
      errorMessage = "⚠️ This model needs OpenRouter credits. Please pick a Free model, or top up your OpenRouter balance."
    } else if (error?.message?.includes("API_KEY") || error?.message?.includes("api key")) {
      errorMessage = "⚠️ API configuration error. Please check environment variables (NVIDIA_API_KEY, DEEPSEEK_API_KEY or OPENAI_API_KEY)."
    } else if (error?.status === 429 || error?.statusCode === 429) {
      errorMessage = "⚠️ Rate limit exceeded. Please try again in a moment."
    } else if (error?.status >= 500 || error?.statusCode >= 500) {
      errorMessage = "⚠️ Service temporarily unavailable. Please try again."
    } else if (error?.message?.includes("timeout")) {
      errorMessage = "⚠️ Request timed out. Please try again."
    } else if (error?.message?.includes("API key")) {
      errorMessage = "⚠️ Invalid API key. Please check your configuration."
    }

    stream.update(errorMessage)
  } finally {
    stream.done()
  }
  }

  void run()

  return { output: stream.value }
}

// Note: Vercel timeout is configured in vercel.json
// Hobby Plan: 10s max, Pro Plan: 60s max
// Current config is optimized for 10s limit with 4096 tokens

export async function generateChat(context: string, prompt: string, options?: { maxTotalTokens?: number }) {
  try {
    // Use DeepSeek Chat paid version for reliability and speed
    return await processAIStream(context, prompt, "x-ai/grok-4.3", options)
  } catch (error) {
    console.error("[generateChat] Error:", error)
    throw error
  }
}

export async function generatePortfolio(
  context: string, 
  prompt: string, 
  options?: { 
    maxTotalTokens?: number;
    model?: string;
  }
) {
  try {
    // Use custom model if provided, otherwise default to Grok
    const modelToUse = options?.model || "x-ai/grok-4.3";
    return await processAIStream(context, prompt, modelToUse, options)
  } catch (error) {
    console.error("[generatePortfolio] Error:", error)
    throw error
  }
}
