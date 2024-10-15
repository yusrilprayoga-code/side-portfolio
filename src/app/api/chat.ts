"use server";

import { createStreamableValue } from "ai/rsc";
import { CohereClient } from "cohere-ai";
import { StreamedChatResponse } from "cohere-ai/api";
import { Stream } from "cohere-ai/core";

// Initialize the Cohere client with API token
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Retry logic to handle retries with exponential backoff
const retry = async (fn: () => Promise<Stream<StreamedChatResponse>>, retries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      } else {
        throw new Error("Maximum retries reached");
      }
    }
  }
};

// Function to generate chat responses
export async function generateChat(context: string, prompt: string) {
  console.log("context", context);

  // Create a streamable value to send real-time updates
  const stream = createStreamableValue("");

  const processStream = async () => {
    const chatStream = await retry(async () => {
      // Make API call to Cohere's chatStream with retry logic
      return await cohere.chatStream({
        message: `You are an AI assistant embedded in a versatile application. You help users by responding to a variety of prompts and queries, providing detailed and thoughtful responses.

      THE TIME NOW IS ${new Date().toLocaleString()}

      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK

      USER PROMPT:
      ${prompt}

      When responding, please keep in mind:
      - Be extremely helpful, clever, and articulate.
      - Provide a detailed and comprehensive response that addresses the user's request.
      - Elaborate on your points and provide examples or supporting information where appropriate.
      - Avoid redundancy and ensure that no point or sentence is repeated.
      - Tailor your response based on the user's prompt and the context, if provided.
      - If the context does not contain enough information, generate a thorough response based on the prompt alone, making reasonable assumptions where necessary.
      - Always provide additional helpful information or suggestions when possible.
      - Adjust the length of the response according to the complexity of the user's query, but aim for thoroughness.
      - Be flexible: whether it's answering questions, generating ideas, writing content, or helping solve problems, your response should be informative, clear, and helpful.
      - Remember that you are an AI assistant, so your responses should reflect a high level of intelligence and understanding.
      - If the user asks for a list, provide a detailed list with explanations or examples.
      - If the user asks for a definition, provide a clear and concise definition with additional information or examples.
      - If the user asks for advice, provide thoughtful and practical advice with reasoning and examples.`,
        model: "command-r-08-2024",
        temperature: 0.7,
        promptTruncation: "AUTO",
        connectors: [{ id: "web-search" }]
      });
    });

    let fullResponse = "";

    // Stream the response in chunks
    if (chatStream) {
      for await (const chunk of chatStream) {
        if (chunk.eventType === "text-generation") {
          fullResponse += chunk.text;
          stream.update(fullResponse); // Update the stream in real-time
        }
      }
    }

    stream.done(); // Mark the stream as completed
  };

  // Start processing the stream
  await processStream();

  // Return the final output
  return { output: stream.value };
}
