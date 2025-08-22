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
        code: error?.code,
        attempt,
        retries,
      })

      if (attempt >= retries) {
        throw new Error(`Failed after ${retries} attempts: ${error?.message || "Unknown error"}`)
      }

      // Exponential backoff with jitter
      const jitter = Math.random() * 1000
      await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, attempt - 1) + jitter))
    }
  }
}

async function processAIStream(context: string, prompt: string, model: string) {
  const stream = createStreamableValue("")

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

    console.log("[AI Stream] Starting request with model:", model)

    const chatStream = await retry(async () => {
      return await cohere.chatStream({
        message: systemPrompt,
        model,
        temperature: 0.7,
        promptTruncation: "AUTO",
        connectors: [{ id: "web-search" }],
        maxTokens: 2000,
      })
    })

    let fullResponse = ""
    let chunkCount = 0

    if (chatStream) {
      console.log("[AI Stream] Stream started successfully")

      for await (const chunk of chatStream) {
        chunkCount++

        if (chunk.eventType === "text-generation") {
          fullResponse += chunk.text
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

export async function generateChat(context: string, prompt: string) {
  try {
    return await processAIStream(context, prompt, "command-nightly")
  } catch (error) {
    console.error("[generateChat] Error:", error)
    throw error
  }
}

export async function generatePortfolio(context: string, prompt: string) {
  try {
    return await processAIStream(context, prompt, "command-nightly")
  } catch (error) {
    console.error("[generatePortfolio] Error:", error)
    throw error
  }
}
