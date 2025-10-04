"use server"

import { createStreamableValue } from "ai/rsc"
import OpenAI from "openai"

// Lazy initialization to avoid build-time errors when env vars are missing
let openaiInstance: OpenAI | null = null

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

const retry = async <T>(fn: () => Promise<T>, retries = 2, delay = 2000): Promise<T> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
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
  // Use environment variable or passed option, default to 20000 tokens
  const maxTokens = options?.maxTotalTokens ?? Number(process.env.DEEPSEEK_MAX_TOKENS) ?? 8096
  const temperature = Number(process.env.DEEPSEEK_TEMPERATURE) ?? 0.6

  try {
    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error("DEEPSEEK_API_KEY environment variable is not set")
    }

    const systemPrompt = `You are a helpful and versatile AI assistant for Yusril Prayoga.
Your primary role is to answer questions about his portfolio, skills, and experience based on the provided context.
If the user's question is NOT related to the portfolio context, you should act as a general AI assistant and answer their query using your knowledge.
Always be friendly, conversational, and helpful.

THE TIME NOW IS ${new Date().toLocaleString()}

--- PORTFOLIO CONTEXT ---
${context}
--- END OF CONTEXT ---

Based on the context and your general knowledge, please answer the following user prompt.`

    // Always use paid version (remove :free suffix if present)
    const modelUsed = model.replace(':free', '')
    
    console.log("[AI Stream] Starting request with model:", modelUsed, "maxTokens:", maxTokens)
    console.log("[AI Stream] API Key present:", !!process.env.DEEPSEEK_API_KEY)

    let fullResponse = ""
    
    // Get OpenAI client instance (lazy initialization)
    const openai = getOpenAIClient()

    // Make the streaming API call with retry logic
    const completion = await retry(async () => {
      return await openai.chat.completions.create({
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
        max_tokens: maxTokens,
        temperature: temperature,
        stream: true,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
      })
    })

    console.log("[AI Stream] Stream started successfully")
    let chunkCount = 0

    // Process the stream
    for await (const chunk of completion) {
      chunkCount++
      const content = chunk.choices[0]?.delta?.content

      if (content) {
        fullResponse += content
        stream.update(fullResponse)

        if (chunkCount % 10 === 0) {
          console.log(`[AI Stream] Processed ${chunkCount} chunks, response length: ${fullResponse.length}`)
        }
      }
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

    if (error?.message?.includes("DEEPSEEK_API_KEY")) {
      errorMessage = "⚠️ API configuration error. Please check environment variables."
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

  return { output: stream.value }
}

export async function generateChat(context: string, prompt: string, options?: { maxTotalTokens?: number }) {
  try {
    // Testing specific DeepSeek Chat version (v3-0324) with free tier
    return await processAIStream(context, prompt, "openai/gpt-oss-20b:free", options)
  } catch (error) {
    console.error("[generateChat] Error:", error)
    throw error
  }
}

export async function generatePortfolio(context: string, prompt: string, options?: { maxTotalTokens?: number }) {
  try {
    // Testing specific DeepSeek Chat version (v3-0324) with free tier
    return await processAIStream(context, prompt, "openai/gpt-oss-20b:free", options)
  } catch (error) {
    console.error("[generatePortfolio] Error:", error)
    throw error
  }
}
