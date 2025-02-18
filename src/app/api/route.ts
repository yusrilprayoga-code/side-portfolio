"use server";

import { createStreamableValue } from "ai/rsc";
import { CohereClient } from "cohere-ai";
import { StreamedChatResponse } from "cohere-ai/api";
import { Stream } from "cohere-ai/core";

// Inisialisasi Cohere API
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Fungsi retry dengan exponential backoff
const retry = async (fn: () => Promise<Stream<StreamedChatResponse>>, retries = 3, delay = 500) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt >= retries) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }
};

// Fungsi utama untuk streaming respons AI
async function processAIStream(context: string, prompt: string, model: string) {
  const stream = createStreamableValue("");

  try {
    const chatStream = await retry(async () => {
      return await cohere.chatStream({
        message: `
        You are an AI assistant embedded in a versatile application. You help users by responding to a variety of prompts and queries, providing detailed and thoughtful responses.

        THE TIME NOW IS ${new Date().toLocaleString()}

        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK

        USER PROMPT:
        ${prompt}
        `,
        model,
        temperature: 0.7,
        promptTruncation: "AUTO",
        connectors: [{ id: "web-search" }]
      });
    });

    let fullResponse = "";

    if (chatStream) {
      for await (const chunk of chatStream) {
        if (chunk.eventType === "text-generation") {
          fullResponse += chunk.text;
          stream.update(fullResponse);
        }
      }
    }
  } catch (error) {
    console.error("AI Stream Error:", error);
    stream.update("⚠️ Error generating response.");
  } finally {
    stream.done();
  }

  return { output: stream.value };
}

// **Fungsi untuk chatbot**
export async function generateChat(context: string, prompt: string) {
  return processAIStream(context, prompt, "command-r7b-12-2024"); 
}

// **Fungsi untuk portfolio AI**
export async function generatePortfolio(context: string, prompt: string) {
  return processAIStream(context, prompt, "command-r7b-12-2024");
}
