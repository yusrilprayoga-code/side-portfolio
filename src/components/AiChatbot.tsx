"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  X,
  Copy,
  AlertCircle,
  Sparkles,
  MessageCircle,
  User,
} from "lucide-react";
import { readStreamableValue } from "ai/rsc";
import type { Message } from "@/types/message";
import FormattedMessage from "@/components/formatted-message";
import { generatePortfolio } from "@/app/api/route";

type ChatSession = {
  id: string;
  name: string;
  messages: Message[];
};

export default function AIChatbotWithSidebar() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: "1", name: "New Chat", messages: [] },
  ]);
  const [currentSessionId, setCurrentSessionId] = useState("1");
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const autoInput = " Hi, Can you tell me more about your portfolio?";

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [input]);

  React.useEffect(() => {
    if (shouldStop) {
      setIsGenerating(false);
      setShouldStop(false);
    }
  }, [shouldStop]);

  const handleAutoSend = () => {
    setInput(autoInput);
    setTimeout(() => handleSend(), 100);
  };

  const currentSession =
    chatSessions.find((session) => session.id === currentSessionId) ||
    chatSessions[0];

  const updateCurrentSession = (
    updater: (session: ChatSession) => ChatSession
  ) => {
    setChatSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId ? updater(session) : session
      )
    );
  };

  const portfolioInfo = `
    Yusril Prayoga is a Full Stack Developer with experience in web development you can find in this github https://github.com/yusrilprayoga-code.
    Projects in the portfolio include:
    1. Cleanique Academy is a modern and innovative online learning platform that offers a wide range of courses and training programs for cleaning professionals. The platform is designed to provide high-quality education and practical skills training to individuals seeking to enhance their knowledge and expertise in the cleaning industry. With a focus on professional development and career advancement, Cleanique Academy offers a comprehensive curriculum, interactive learning materials, and expert instruction to help students succeed in their chosen field.
    2. Mailverra (powered by OpenAI) AI Email is a cutting-edge email client that leverages artificial intelligence to enhance productivity and efficiency. The platform is designed to help users manage their email communications more effectively by providing smart features, automated responses, and intelligent suggestions. By integrating advanced AI algorithms and natural language processing capabilities, AI Email offers a seamless and intuitive experience that streamlines the email workflow and improves overall communication.
    3. B-Otomotif is a cutting-edge website that complements its popular YouTube channel, focusing on the latest developments in the automotive world. The site is dedicated to car enthusiasts, offering comprehensive and in-depth content about new car models, detailed reviews, and insightful discussions. Visitors can explore a variety of articles, videos, and features that provide a closer look at the newest vehicles on the market, making B-Otomotif a go-to resource for anyone passionate about cars.
    4. CarShowroom is an informative website designed to provide comprehensive details about car rental services. Catering to a wide audience, from travelers seeking convenient transportation options to locals in need of temporary vehicle solutions, CarShowroom serves as a one-stop resource for all things related to car rentals. The website features a vast array of information on various rental car options, pricing, and rental locations, helping users make informed decisions that best suit their needs.
    5. Chatbot-Free is a user-friendly and interactive chatbot that provides personalized assistance and support to website visitors. The chatbot is designed to engage with users, answer questions, provide information, and offer recommendations, creating a seamless and engaging experience for customers. By leveraging advanced artificial intelligence algorithms and natural language processing capabilities, Chatbot-Free offers a human-like interaction that enhances customer satisfaction and drives conversions.
    6. Nike is a sleek and engaging landing page dedicated to providing comprehensive information about Nike shoes. Designed for both casual shoppers and dedicated sneaker enthusiasts, the website showcases a wide array of Nike footwear, highlighting the brand is latest innovations, iconic designs, and performance features. Visitors can explore detailed descriptions, high-quality images, and customer reviews, all aimed at helping them find the perfect pair of Nike shoes to match their style and needs.
    7. ArCipe is a vibrant and comprehensive website dedicated to sharing a diverse array of cooking recipes. Designed for both novice cooks and seasoned chefs, ArCipe offers an extensive collection of recipes spanning various cuisines and dietary preferences. From quick and easy weekday meals to gourmet dishes for special occasions, the website provides detailed instructions, ingredient lists, and cooking tips to ensure successful culinary experiences.
    8. YEC Bakat is a web application that provides a platform for young talents to showcase their skills and connect with potential opportunities. The platform allows users to create profiles, upload portfolios, and participate in talent competitions, enabling them to gain exposure, recognition, and valuable feedback from industry professionals. With a focus on empowering young creatives and performers, YEC Bakat aims to foster talent development, networking, and collaboration within the creative community.
    9. PicStash is a Web Application that provides users to Share and Store their Photos. Same as Unsplash but with more features. The app utilizes advanced algorithms to analyze user data and generate tailored Photos, ensuring that users discover new Photos that match their tastes and interests. With a sleek and intuitive interface, PicStash offers a seamless and engaging experience, allowing users to easily browse through Photos, view detailed information, and save favorites for later viewing.
    10. Movie Recommendation App is a mobile application that provides users with personalized movie recommendations based on their preferences and viewing history. The app utilizes advanced algorithms to analyze user data and generate tailored movie suggestions, ensuring that users discover new films that match their tastes and interests. With a sleek and intuitive interface, Movie Recommendation App offers a seamless and engaging experience, allowing users to easily browse through recommended movies, view detailed information, and save favorites for later viewing. 
    11. Ecommerce App is a mobile application that provides users with personalized movie recommendations based on their preferences and viewing history. The app utilizes advanced algorithms to analyze user data and generate tailored movie suggestions, ensuring that users discover new films that match their tastes and interests. With a sleek and intuitive interface, Movie Recommendation App offers a seamless and engaging experience, allowing users to easily browse through recommended movies, view detailed information, and save favorites for later viewing.
    12. Arcipe UI/UX Design  is designed with a focus on user experience, ensuring that visitors can easily navigate through the different projects, view detailed information, and interact with the various elements. With a combination of stunning visuals, dynamic animations, and cutting-edge technologies, ArCipe provides an immersive and inspiring journey into the world of digital design. Whether you are a fellow designer, potential client, or simply an admirer of creative work, ArCipe offers a glimpse into the talent and vision of Yusril Prayoga.

    Technologies and skills:
    - Frontend: NextJS, ReactJS, Flutter, Tailwind CSS, Bootstrap
    - Backend: Laravel, PHP
    - Databases: MySQL, PostgreSQL, MongoDB, Firebase
    - Cloud Services: Neon, Appwrite, Supabase
    - AI Integration: OpenAI
    - Design: Figma, Adobe XD

    Work Experience:
    - Dataiku Development at Pertamina Hulu Indonesia Aug 25 - Present
    - Full Stack Developer at B-Otomotif 2018 - Present
    - Full Stack Developer at Cleanique Academy (PT. Indotech Berkah Abadi) Internship Sep 24 - Jan 25
    - Bangkit Academy 2024 By Google, GoTo, Traveloka - Cloud Computing Learning Path Feb 2024 - June 2024
    - Frontend Developer at PT Solutionlabs Group Indonesia (Internship) Des 2023 - Feb 2024
    - Staff of Communication and Information Media Department at UPN Veteran Yogyakarta May 2023 - May 2024
    
    Yusril Prayoga has expertise in full-stack web development, with a focus on creating responsive and efficient web applications.
  `;

  const handleSend = async () => {
    if (input.trim() === "" || isGenerating) return;

    const userMessage: Message = { role: "user", content: input };
    updateCurrentSession((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));

    const currentInput = input;
    setInput("");
    setIsGenerating(true);
    setShouldStop(false);
    setError(null);

    try {
      const combinedPrompt = `${portfolioInfo}\n\nUser query: ${currentInput}\n\nInstructions:\n- If the user's question is about the portfolio, answer using only the portfolio information above.\n- If the user's question is outside the portfolio, answer directly and helpfully based on the question.\n- If the user's query asks for programming help or includes code, detect the programming language and explain step-by-step how to solve the problem. Provide a clear, runnable code example inside a fenced code block with the appropriate language tag (for example \`\`\`js).\n- When providing code examples, keep them concise and runnable, and include any commands required to run them.\n- Prefer short, actionable guidance and state any assumptions you make.\n`;

      console.log("[Chatbot] Starting AI generation...");

      const timeoutPromise = new Promise((_, reject) => {
        // increase client-side timeout to 2 minutes to allow long streaming generations
        setTimeout(
          () => reject(new Error("Request timeout after 120 seconds")),
          120000
        );
      });

      // Request a moderately long total generation (target ~5000 tokens) to reduce provider timeouts
      const generatePromise = generatePortfolio(combinedPrompt, "", {
        maxTotalTokens: 5000,
      });

      const result = (await Promise.race([
        generatePromise,
        timeoutPromise,
      ])) as any;
      const { output } = result;

      let botResponse = "";
      let chunkCount = 0;

      console.log("[Chatbot] Reading stream...");

      for await (const chunk of readStreamableValue(output)) {
        if (shouldStop) {
          console.log("[Chatbot] Generation stopped by user");
          break;
        }

        chunkCount++;
        botResponse += chunk || "";

        if (chunkCount % 3 === 0) {
          updateCurrentSession((prev) => {
            const newMessages = [...prev.messages];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === "bot") {
              lastMessage.content = botResponse;
            } else {
              newMessages.push({ role: "bot", content: botResponse });
            }
            return { ...prev, messages: newMessages };
          });
        }
      }

      console.log(
        `[Chatbot] Generation completed. Chunks: ${chunkCount}, Length: ${botResponse.length}`
      );

      if (!botResponse.trim()) {
        throw new Error("Empty response received from AI service");
      }

      updateCurrentSession((prev) => {
        const newMessages = [...prev.messages];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === "bot") {
          lastMessage.content = botResponse;
        } else {
          newMessages.push({ role: "bot", content: botResponse });
        }
        return { ...prev, messages: newMessages };
      });
    } catch (error: any) {
      console.error("[Chatbot] Error generating response:", {
        message: error?.message,
        stack: error?.stack,
        name: error?.name,
      });

      let errorMessage =
        "An error occurred while generating the response. Please try again.";

      if (error?.message?.includes("timeout")) {
        errorMessage =
          "Request timed out. Please try again with a shorter message.";
      } else if (error?.message?.includes("COHERE_API_KEY")) {
        errorMessage = "API configuration error. Please contact support.";
      } else if (error?.message?.includes("rate limit")) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      }

      setError(errorMessage);

      updateCurrentSession((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            role: "bot",
            content: errorMessage,
          },
        ],
      }));
    } finally {
      setIsGenerating(false);
      setShouldStop(false);
    }
  };

  const handleStopThinking = () => {
    console.log("[Chatbot] Stop requested by user");
    setShouldStop(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [currentSession.messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-neutral-900">
      {/* Header - Simple and Clean */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-neutral-900">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Portfolio Assistant
            </h1>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Welcome Screen */}
      {currentSession.messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 dark:bg-orange-900">
              <MessageCircle className="h-8 w-8 text-orange-600 dark:text-orange-200" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 dark:text-gray-100">
              Portfolio Assistant
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed dark:text-gray-300">
              Ask me anything about Yusril Prayoga&apos;s projects, skills, and
              experience as a Full Stack Developer.
            </p>
            <button
              onClick={handleAutoSend}
              disabled={isGenerating}
              className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors disabled:opacity-50 dark:bg-neutral-900 dark:hover:bg-neutral-900 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 mb-1 dark:text-gray-100">
                    Get started
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    Ask about the portfolio
                  </div>
                </div>
                <Send className="h-5 w-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-auto" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          {currentSession.messages.map((message, idx) => (
            <div key={idx} className="mb-8">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                  {message.role === "user" ? (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {message.role === "user" ? "You" : "Assistant"}
                    </span>
                  </div>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <FormattedMessage
                      content={message.content}
                      role={message.role}
                    />
                  </div>

                  {/* Copy Button */}
                  <div className="flex items-center justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 rounded dark:text-gray-300 dark:hover:text-gray-100"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isGenerating && (
            <div className="mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Assistant
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse dark:bg-gray-500"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75 dark:bg-gray-500"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150 dark:bg-gray-500"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, skills, or experience..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 dark:bg-neutral-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
                rows={1}
                disabled={isGenerating}
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
            </div>

            {isGenerating ? (
              <button
                onClick={handleStopThinking}
                className="flex-shrink-0 self-center w-12 h-12 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors flex items-center justify-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={isGenerating || input.trim() === ""}
                className="flex-shrink-0 self-center w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
