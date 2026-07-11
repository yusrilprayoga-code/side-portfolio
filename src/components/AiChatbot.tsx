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
  Plus,
  History,
  ChevronDown,
  ArrowUp,
  Brain,
} from "lucide-react";
import { readStreamableValue } from "ai/rsc";
import FormattedMessage from "@/components/formatted-message";
import { generatePortfolio } from "@/lib/ai-actions";
import { useThinkingLimit } from "@/hooks/useThinkingLimit";
import { AIModel, availableModels, defaultModel } from "@/types/ai-models";

// Extended Message type with thinking process support
type Message = {
  role: "user" | "bot";
  content: string;
  thinking?: string; // DeepSeek-style thinking process
};

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

  // New features state
  const [selectedModel, setSelectedModel] = useState<AIModel>(defaultModel);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showHistorySidebar, setShowHistorySidebar] = useState(false);
  const {
    remainingThinking,
    isThinkingEnabled,
    setIsThinkingEnabled,
    consumeThinking,
    canUseThinking,
  } = useThinkingLimit();

  const autoInput = " Hi, Can you tell me more about your portfolio?";

  // Persist chat history across page reloads
  const STORAGE_KEY = "portfolio-chat-sessions-v1";
  const hasLoadedHistory = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.sessions) && parsed.sessions.length > 0) {
          setChatSessions(parsed.sessions);
          setCurrentSessionId(parsed.currentId ?? parsed.sessions[0].id);
        }
      }
    } catch {
      // Corrupt storage — start fresh
    }
    hasLoadedHistory.current = true;
  }, []);

  useEffect(() => {
    if (!hasLoadedHistory.current) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ sessions: chatSessions, currentId: currentSessionId })
      );
    } catch {
      // Storage full/unavailable — history just won't persist
    }
  }, [chatSessions, currentSessionId]);

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

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: "New Chat",
      messages: [],
    };
    setChatSessions([...chatSessions, newSession]);
    setCurrentSessionId(newSession.id);
    setShowHistorySidebar(false); // Close history after creating new chat
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setShowHistorySidebar(false); // Close history after selecting
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
    0. AURORA (Advanced Upstream Repository Orchestration & Reliable Analytics) is an enterprise SSPE (Subsurface Performance & Engineering) monitoring and governance platform built for Pertamina Regional 1. Yusril was the System Designer & Full-Stack Developer end-to-end: architecture, database design (PostgreSQL + Prisma 7), APIs, authentication and access control, responsive data-intensive dashboards (KPI cards, drill-down, interactive tables, chart visualizations with ECharts/Recharts/D3), FID governance workflows (submission, tiered review, approval, audit trail), phased Excel ETL (upload, preview, commit, recompute), and Docker deployment. Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, TanStack Query, React Hook Form, Zod, Better Auth. The project is private/proprietary, so source code and internal data cannot be shared.
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
    - System Designer & Full-Stack Developer (AURORA SSPE Platform) and Dataiku Development at Pertamina Hulu Rokan Aug 25 - Present
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
      // Name the session after its first message so history is scannable
      name:
        prev.messages.length === 0
          ? input.trim().slice(0, 40) || prev.name
          : prev.name,
      messages: [...prev.messages, userMessage],
    }));

    const currentInput = input;
    setInput("");
    setIsGenerating(true);
    setShouldStop(false);
    setError(null);

    try {
      // Check if thinking is enabled and use quota
      const willUseThinking = canUseThinking;
      if (willUseThinking) {
        consumeThinking(); // Decrement thinking counter
      }

      // Reasoning models (Nemotron, GLM) stream their thinking natively via
      // reasoning_content, so they need no prompting. For other models, one
      // short instruction is enough — the old multi-page "MANDATORY THINKING"
      // prompt kept getting echoed back into the answers.
      const needsPromptedThinking =
        willUseThinking && !selectedModel.supportsThinking;
      const promptToSend = needsPromptedThinking
        ? `${currentInput}\n\n(First reason step-by-step inside <think></think> tags, then write the final answer in clean markdown after the closing tag.)`
        : currentInput;

      console.log("[Chatbot] Starting AI generation...");
      console.log("[Chatbot] Model:", selectedModel.name);
      console.log("[Chatbot] Thinking enabled:", willUseThinking);
      console.log("[Chatbot] Remaining thinking:", remainingThinking);

      // NVIDIA NIM models can sit in a queue before responding, so give
      // NVIDIA NIM models can queue; give them a longer window than OpenRouter.
      // Two limits: how long to wait for the FIRST token, and an overall cap.
      const isNvidia = selectedModel.gateway === "nvidia";
      const firstTokenTimeoutMs = isNvidia ? 60000 : 25000;
      const overallTimeoutMs = isNvidia ? 150000 : 60000;

      // Portfolio info goes in as context; the user's message is the prompt
      const { output } = await generatePortfolio(portfolioInfo, promptToSend, {
        maxTotalTokens: selectedModel.maxTokens,
        model: selectedModel.id,
      });

      let botResponse = "";
      let chunkCount = 0;
      const startTime = Date.now();
      let firstChunkAt = 0;
      let timedOut = false;

      console.log("[Chatbot] Reading stream...");

      let thinkingContent = "";
      let finalContent = "";
      let hasClosedThinkTag = false;
      let isProcessingThinking = false;

      // Throttle UI updates to reduce re-renders
      let lastUpdateTime = Date.now();
      const UPDATE_INTERVAL = 100; // Update UI every 100ms (smoother but not too frequent)

      for await (const chunk of readStreamableValue(output)) {
        if (shouldStop) {
          console.log("[Chatbot] Generation stopped by user");
          break;
        }

        const now = Date.now();
        // Watchdog: bail out if the model is stuck queuing or running too long
        if (!firstChunkAt && chunk) firstChunkAt = now;
        if (!firstChunkAt && now - startTime > firstTokenTimeoutMs) {
          timedOut = true;
          break;
        }
        if (now - startTime > overallTimeoutMs) {
          timedOut = true;
          break;
        }

        chunkCount++;
        // readStreamableValue yields the FULL accumulated string each time
        // (the SDK sends append-patches and the reader applies them), so we
        // REPLACE here. Using += would concatenate cumulative snapshots and
        // duplicate the whole answer many times over.
        if (chunk != null) botResponse = chunk;

        // DeepSeek R1 uses <think> tags - check for multiple formats
        // Format 1: <think>...</think>
        // Format 2: <｜thinking｜>...</｜end_thinking｜> (some models use this)
        // Format 3: First paragraph might be thinking if model uses natural language

        const thinkCloseMatch = botResponse.match(/<think>([\s\S]*?)<\/think>/);
        const altThinkMatch = botResponse.match(
          /<｜thinking｜>([\s\S]*?)<｜end_thinking｜>/
        );

        if (thinkCloseMatch) {
          // Complete thinking block found (standard format)
          hasClosedThinkTag = true;
          isProcessingThinking = false;
          thinkingContent = thinkCloseMatch[1].trim();

          // Extract final content after </think>
          const afterThink = botResponse.split("</think>")[1];
          if (afterThink) {
            finalContent = afterThink.trim();
          }
        } else if (altThinkMatch) {
          // Alternative thinking format
          hasClosedThinkTag = true;
          isProcessingThinking = false;
          thinkingContent = altThinkMatch[1].trim();

          const afterThink = botResponse.split("<｜end_thinking｜>")[1];
          if (afterThink) {
            finalContent = afterThink.trim();
          }
        } else if (
          botResponse.includes("<think>") &&
          !botResponse.includes("</think>")
        ) {
          // Still collecting thinking content
          isProcessingThinking = true;
          const thinkOpenMatch = botResponse.match(/<think>([\s\S]*)$/);
          if (thinkOpenMatch) {
            thinkingContent = thinkOpenMatch[1].trim();
          }
          finalContent = ""; // Don't show content yet
        } else if (
          botResponse.includes("<｜thinking｜>") &&
          !botResponse.includes("<｜end_thinking｜>")
        ) {
          // Alternative format - still collecting
          isProcessingThinking = true;
          const altOpenMatch = botResponse.match(/<｜thinking｜>([\s\S]*)$/);
          if (altOpenMatch) {
            thinkingContent = altOpenMatch[1].trim();
          }
          finalContent = "";
        } else if (!isProcessingThinking && !hasClosedThinkTag) {
          // No thinking tags detected yet - show response directly
          // Only show warning after response is complete and still no thinking
          finalContent = botResponse;
          // Don't set warning immediately, wait until end
        }

        // Throttled UI update - only update every 100ms or on important events
        const shouldUpdate =
          now - lastUpdateTime >= UPDATE_INTERVAL ||
          hasClosedThinkTag ||
          chunkCount % 50 === 0; // Also update every 50 chunks as backup

        if (shouldUpdate) {
          lastUpdateTime = now;

          updateCurrentSession((prev) => {
            const newMessages = [...prev.messages];
            const lastMessage = newMessages[newMessages.length - 1];

            // Real-time display logic: stream whatever we have. While the
            // model is still inside <think>, finalContent stays empty so only
            // the thinking panel grows; afterwards the answer streams in live.
            const contentToShow = finalContent;
            const thinkToShow = thinkingContent;

            if (lastMessage && lastMessage.role === "bot") {
              lastMessage.content = contentToShow;
              lastMessage.thinking = thinkToShow;
            } else {
              newMessages.push({
                role: "bot",
                content: contentToShow,
                thinking: thinkToShow,
              });
            }
            return { ...prev, messages: newMessages };
          });
        }
      }

      // After streaming completes, finalize the message with proper parsing
      console.log(
        `[Chatbot] Generation completed. Chunks: ${chunkCount}, Length: ${botResponse.length}`
      );
      console.log("[Chatbot] Has closed think tag:", hasClosedThinkTag);
      console.log("[Chatbot] Thinking content length:", thinkingContent.length);
      console.log("[Chatbot] Final content length:", finalContent.length);
      console.log(
        "[Chatbot] Full response preview:",
        botResponse.substring(0, 300)
      );

      // Watchdog fired with nothing usable — surface a clear timeout error
      if (timedOut && !botResponse.trim()) {
        throw new Error(
          `Request timeout after ${Math.round(
            (Date.now() - startTime) / 1000
          )} seconds. ${
            isNvidia
              ? "The NVIDIA model is busy — try again or switch to a faster model."
              : "Please try again."
          }`
        );
      }

      if (!botResponse.trim()) {
        throw new Error("Empty response received from AI service");
      }

      if (timedOut) {
        console.warn("[Chatbot] Stopped early by watchdog; showing partial response");
      }

      // Final parsing to ensure we capture everything correctly
      let finalThinking = thinkingContent;
      let finalAnswer = finalContent;

      // Re-parse one more time to be sure
      const finalThinkMatch = botResponse.match(/<think>([\s\S]*?)<\/think>/);
      const finalAltThinkMatch = botResponse.match(
        /<｜thinking｜>([\s\S]*?)<｜end_thinking｜>/
      );

      if (finalThinkMatch) {
        finalThinking = finalThinkMatch[1].trim();
        const afterThinkTag = botResponse.split("</think>")[1];
        if (afterThinkTag) {
          finalAnswer = afterThinkTag.trim();
        }
      } else if (finalAltThinkMatch) {
        finalThinking = finalAltThinkMatch[1].trim();
        const afterThinkTag = botResponse.split("<｜end_thinking｜>")[1];
        if (afterThinkTag) {
          finalAnswer = afterThinkTag.trim();
        }
      } else if (!finalThinking) {
        // No thinking tags found - use full response as answer
        console.warn("[Chatbot] No thinking tags detected in final response");
        finalAnswer = botResponse;
        finalThinking = "";
      }

      console.log(
        "[Chatbot] FINAL - Thinking:",
        finalThinking.substring(0, 100)
      );
      console.log("[Chatbot] FINAL - Answer:", finalAnswer.substring(0, 100));

      // Update with final parsed content
      updateCurrentSession((prev) => {
        const newMessages = [...prev.messages];
        const lastMessage = newMessages[newMessages.length - 1];

        if (lastMessage && lastMessage.role === "bot") {
          lastMessage.content = finalAnswer;
          lastMessage.thinking = finalThinking;
        } else {
          newMessages.push({
            role: "bot",
            content: finalAnswer,
            thinking: finalThinking,
          });
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

      {/* Chat History Slide-over */}
      {showHistorySidebar && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setShowHistorySidebar(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-gray-800 shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-800">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Chat History
              </span>
              <button
                onClick={() => setShowHistorySidebar(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
                title="Close history"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {chatSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => handleSelectSession(session.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    session.id === currentSessionId
                      ? "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm truncate">{session.name}</span>
                </button>
              ))}
            </div>
            <div className="p-2 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>
          </div>
        </>
      )}

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
            <div key={idx} className="mb-8 chat-fade-in">
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
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {message.role === "user" ? "You" : "Assistant"}
                    </span>
                    {/* Copy Button - Always Visible */}
                    <button
                      onClick={() => copyToClipboard(message.content)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-100 rounded transition-colors"
                      title="Copy message"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Thinking Process - DeepSeek Style */}
                  {message.thinking && message.thinking.length > 0 && (
                    <details className="mb-4 group" open>
                      <summary className="cursor-pointer select-none flex items-center gap-2 px-4 py-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-colors">
                        <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm font-medium text-purple-900 dark:text-purple-300">
                          Thinking Process
                        </span>
                        <span className="ml-auto text-xs text-purple-600 dark:text-purple-400 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="mt-2 px-4 py-3 bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                        <div className="prose prose-sm dark:prose-invert max-w-none text-purple-900 dark:text-purple-200 prose-p:my-2">
                          <FormattedMessage
                            content={message.thinking}
                            role="bot"
                          />
                        </div>
                      </div>
                    </details>
                  )}

                  {/* Final Answer */}
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-headings:mt-4 prose-headings:mb-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1">
                    <FormattedMessage
                      content={message.content}
                      role={message.role}
                    />
                  </div>
                  {/* Blinking cursor while this message is still streaming */}
                  {isGenerating &&
                    idx === currentSession.messages.length - 1 &&
                    message.role === "bot" && (
                      <span className="chat-cursor" aria-hidden="true" />
                    )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator — only before the first chunk arrives; after
              that the message itself streams live in the list above */}
          {isGenerating &&
            currentSession.messages[currentSession.messages.length - 1]
              ?.role !== "bot" && (
              <div className="mb-8 chat-fade-in">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Assistant
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 rounded-lg w-fit">
                      <span className="chat-typing-dot" />
                      <span
                        className="chat-typing-dot"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="chat-typing-dot"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Input Area - Claude-style UI */}
      <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto p-4">
          {/* Top Row - Prompt Input */}
          <div className="mb-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="How can I help you today?"
              className="w-full resize-none rounded-xl border-0 bg-gray-100 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={1}
              disabled={isGenerating}
              style={{ minHeight: "48px", maxHeight: "160px" }}
            />
          </div>

          {/* Bottom Row - Controls (Icons, Model Selector, Send Button) */}
          <div className="flex items-center justify-between gap-2">
            {/* Left Icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleNewChat}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="New Chat"
              >
                <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              <button
                onClick={() => setIsThinkingEnabled(!isThinkingEnabled)}
                disabled={remainingThinking === 0}
                className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isThinkingEnabled
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
                title={`Extended Thinking (${remainingThinking}/3 left today)`}
              >
                <Brain className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowHistorySidebar(!showHistorySidebar)}
                className={`p-2 rounded-lg transition-colors ${
                  showHistorySidebar
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
                title="Chat History"
              >
                <History className="w-5 h-5" />
              </button>
            </div>

            {/* Center - Model Selector */}
            <div className="relative flex-1 max-w-xs">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {selectedModel.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
                    showModelDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Model Dropdown */}
              {showModelDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowModelDropdown(false)}
                  />
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                    {availableModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setShowModelDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                          selectedModel.id === model.id
                            ? "bg-blue-50 dark:bg-blue-900/20"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{model.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {model.name}
                              </span>
                              {model.supportsThinking && (
                                <Brain className="w-3 h-3 text-purple-500" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {model.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right - Send/Stop Button */}
            {isGenerating ? (
              <button
                onClick={handleStopThinking}
                className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                title="Stop generating"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={input.trim() === ""}
                className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Send message"
              >
                <ArrowUp className="w-5 h-5 text-white" />
              </button>
            )}
          </div>

          {/* Info Badge - Show when thinking is enabled */}
          {isThinkingEnabled && remainingThinking > 0 && (
            <div className="mt-2 flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
              <Brain className="w-3 h-3" />
              <span>
                Extended thinking enabled ({remainingThinking}/3 left today)
              </span>
            </div>
          )}
          {remainingThinking === 0 && isThinkingEnabled && (
            <div className="mt-2 flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="w-3 h-3" />
              <span>Thinking limit reached. Resets tomorrow.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
