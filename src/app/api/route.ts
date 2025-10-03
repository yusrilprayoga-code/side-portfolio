"use server"

import { createStreamableValue } from "ai/rsc"
import { CohereClient } from "cohere-ai"
import type { StreamedChatResponse } from "cohere-ai/api"
import type { Stream } from "cohere-ai/core"

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
})

const retry = async (fn: () => Promise<Stream<StreamedChatResponse>>, retries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
      console.error(`Attempt ${attempt} failed:`, {
        message: error?.message,
        status: error?.status,
        statusCode: error?.statusCode,
        code: error?.code,
        body: error?.body,
        name: error?.name,
        fullError: JSON.stringify(error, null, 2),
        attempt,
        retries,
      })

      if (attempt >= retries) {
        throw error // throw the original error instead of wrapping it
      }

      // Exponential backoff with jitter
      const jitter = Math.random() * 1000
      await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, attempt - 1) + jitter))
    }
  }
}

async function processAIStream(context: string, prompt: string, model: string, options?: { maxTotalTokens?: number }) {
  const stream = createStreamableValue("")
  const maxTotalTokens = options?.maxTotalTokens ?? Number(process.env.COHERE_DEFAULT_MAX_TOKENS) ?? 4096
  // command-r-plus supports up to 128k tokens, but we use 4096 as default safe limit
  const modelMaxTokens = Number(process.env.COHERE_MODEL_MAX_TOKENS) || 128000

  try {
    if (!process.env.COHERE_API_KEY) {
      throw new Error("COHERE_API_KEY environment variable is not set")
    }

     const systemPrompt = `You are a helpful and versatile AI assistant for Yusril Prayoga.
Your primary role is to answer questions about his portfolio, skills, and experience based on the provided context.
If the user's question is NOT related to the portfolio context, you should act as a general AI assistant and answer their query using your knowledge and web search capabilities.
Always be friendly, conversational, and helpful.

THE TIME NOW IS ${new Date().toLocaleString()}

--- PORTFOLIO CONTEXT ---
${context}
--- END OF CONTEXT ---

Based on the context and your general knowledge, please answer the following user prompt.

USER PROMPT:
${prompt}`

  console.log("[AI Stream] Starting request with model:", model, "targetTokens:", maxTotalTokens)
  console.log("[AI Stream] Model max tokens:", modelMaxTokens)
  console.log("[AI Stream] API Key present:", !!process.env.COHERE_API_KEY)

  let fullResponse = ""

    // Helper: parse numbered outline to array of section texts
    function parseOutlineToSections(text: string): string[] {
      const lines = text.split(/\r?\n/)
      const sections: string[] = []
      for (const line of lines) {
        const m = line.match(/^\s*\d+\.\s+(.*)$/)
        if (m) sections.push(m[1].trim())
      }
      return sections
    }

    function fallbackSplit(text: string, maxChars = 1500): string[] {
      const parts: string[] = []
      let cursor = 0
      while (cursor < text.length) {
        parts.push(text.slice(cursor, cursor + maxChars))
        cursor += maxChars
      }
      return parts
    }

    // If requested total is within single-call model limit, stream normally
    if (maxTotalTokens <= modelMaxTokens) {
      console.log("[AI Stream] Making single API call with params:", {
        model,
        maxTokens: maxTotalTokens,
        temperature: 0.7,
        messageLength: systemPrompt.length
      })
      
      const chatStream = await retry(async () => {
        return await cohere.chatStream({
          message: systemPrompt,
          model,
          temperature: 0.7,
          promptTruncation: "AUTO",
          maxTokens: maxTotalTokens,
        })
      })

  let chunkCount = 0

      if (chatStream) {
        console.log("[AI Stream] Stream started successfully (single-call)")

        for await (const chunk of chatStream) {
          chunkCount++

          if (chunk.eventType === "text-generation") {
            fullResponse += chunk.text
            // stream.update expects a string
            stream.update(fullResponse)

            if (chunkCount % 10 === 0) {
              console.log(`[AI Stream] Processed ${chunkCount} chunks, response length: ${fullResponse.length}`)
            }
          }
        }

        console.log(
          `[AI Stream] Completed successfully. Total chunks: ${chunkCount}, Final length: ${fullResponse.length}`,
        )
      } else {
        throw new Error("Failed to create chat stream")
      }
    } else {
      // Multi-call chunking strategy: create an outline, split into sections, expand each section
      console.log("[AI Stream] Using multi-call chunking strategy")

      // 1) Generate outline
      const outlinePrompt = systemPrompt + `\n\nPlease produce a concise numbered outline (1..N) dividing the answer into sections. Keep each outline item short (one line).`

      const outlineStream = await retry(async () => {
        return await cohere.chatStream({
          message: outlinePrompt,
          model,
          temperature: 0.6,
          promptTruncation: "AUTO",
          maxTokens: 800,
        })
      })

      let outlineText = ""
      if (!outlineStream) throw new Error("Failed to create outline stream")
      for await (const chunk of outlineStream) {
        if (chunk.eventType === "text-generation") {
          outlineText += chunk.text
        }
      }

      // Parse outline into sections
      const sections = parseOutlineToSections(outlineText)
      if (sections.length === 0) {
        // fallback: split by paragraphs
        sections.push(...fallbackSplit(prompt))
      }

      // 2) Expand each section sequentially and stream updates
      let totalTokensSoFar = 0
      const perCallMax = modelMaxTokens

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const expandPrompt = systemPrompt + `\n\nExpand the following outline item in detail:\n${section}`

        const sectionStream = await retry(async () => {
          return await cohere.chatStream({
            message: expandPrompt,
            model,
            temperature: 0.7,
            promptTruncation: "AUTO",
            maxTokens: perCallMax,
          })
        })

        if (!sectionStream) continue

        for await (const chunk of sectionStream) {
          if (chunk.eventType === "text-generation") {
            // append to the aggregate response and stream
            fullResponse += chunk.text
            stream.update(fullResponse)
            totalTokensSoFar += 0 // best-effort: token accounting unavailable here
          }
        }

        console.log(`[AI Stream] Completed section ${i + 1}/${sections.length}`)
      }

      console.log(`[AI Stream] Multi-call expansion completed. Sections: ${sections.length}`)
    }

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

    if (error?.message?.includes("COHERE_API_KEY")) {
      errorMessage = "⚠️ API configuration error. Please check environment variables."
    } else if (error?.status === 429) {
      errorMessage = "⚠️ Rate limit exceeded. Please try again in a moment."
    } else if (error?.status >= 500) {
      errorMessage = "⚠️ Service temporarily unavailable. Please try again."
    } else if (error?.message?.includes("timeout")) {
      errorMessage = "⚠️ Request timed out. Please try again."
    }

    stream.update(errorMessage)
  } finally {
    stream.done()
  }

  return { output: stream.value }
}

export async function generateChat(context: string, prompt: string, options?: { maxTotalTokens?: number }) {
  try {
    return await processAIStream(context, prompt, "command-r-08-2024", options)
  } catch (error) {
    console.error("[generateChat] Error:", error)
    throw error
  }
}

export async function generatePortfolio(context: string, prompt: string, options?: { maxTotalTokens?: number }) {
  try {
    return await processAIStream(context, prompt, "command-r-08-2024", options)
  } catch (error) {
    console.error("[generatePortfolio] Error:", error)
    throw error
  }
}
