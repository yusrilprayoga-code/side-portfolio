"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, User, X, Copy } from "lucide-react";
import { generatePortfolio } from "../api/route";
import { readStreamableValue } from "ai/rsc";
import { Message } from "@/types/message";
import FormattedMessage from "@/components/formattedMessage";

type Props = {
  onGenerate: (value: string) => void;
  isComposing?: boolean;
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  
  const autoInput = " Hi, I'm Yusril Prayoga. Can you tell me more about your portfolio?";

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
    handleSend();
  };

  const currentSession =
    chatSessions.find((session) => session.id === currentSessionId) ||
    chatSessions[0];

  const updateCurrentSession = useCallback(
    (updater: (session: ChatSession) => ChatSession) => {
      setChatSessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId ? updater(session) : session
        )
      );
    },
    [currentSessionId]
  );

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
    - Full Stack Developer at B-Otomotif 2018 - Present
    - Full Stack Developer at Cleanique Academy (PT. Indotech Berkah Abadi) Internship Sep 24 - Present
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
    setInput("");
    setIsGenerating(true);
    setShouldStop(false);

    try {
      const combinedPrompt = `${portfolioInfo}\n\nUser query: ${input}\n\nPlease provide a response based on the portfolio information above. If the query is not related to the portfolio, politely redirect the conversation back to the portfolio contents.`;

      const { output } = await generatePortfolio(combinedPrompt, "");
      let botResponse = "";

      for await (const chunk of readStreamableValue(output)) {
        botResponse += chunk;
      }

      if (botResponse.trim() === "") {
        throw new Error("No content generated");
      }

      updateCurrentSession((prev) => ({
        ...prev,
        messages: [...prev.messages, { role: "bot", content: botResponse }],
      }));

    } catch (error) {
      console.error("Error generating response:", error);
      updateCurrentSession((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            role: "bot",
            content:
              "An error occurred while generating the response. Please try again.",
          },
        ],
      }));
    } finally {
      setIsGenerating(false);
      setShouldStop(false);
    }
  };

  const handleStopThinking = useCallback(() => {
    setShouldStop(true);
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [currentSession.messages]);

  useEffect(() => {
    const lastMessage =
      currentSession.messages[currentSession.messages.length - 1];
    if (lastMessage && lastMessage.role === "bot" && lastMessage.fullContent) {
      const timer = setInterval(() => {
        updateCurrentSession((prev) => {
          const newMessages = [...prev.messages];
          const lastMsg = newMessages[newMessages.length - 1];
          if (
            lastMsg.role === "bot" &&
            lastMsg.content.length < lastMsg.fullContent!.length
          ) {
            lastMsg.content = lastMsg.fullContent!.slice(
              0,
              lastMsg.content.length + 1
            );
            return { ...prev, messages: newMessages };
          }
          clearInterval(timer);
          return prev;
        });
      }, 20);

      return () => clearInterval(timer);
    }
  }, [currentSession.messages, updateCurrentSession]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className="flex flex-col h-[100vh] bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Bot
            className="h-6 w-6 text-blue-500"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <h1 className="text-xl font-bold">AI Chatbot</h1>
          <p>
            <span className="text-gray-500 dark:text-gray-400">Powered by</span>{" "}
            <span className="text-blue-500">Cohere Ai</span>
          </p>
        </div>
      </div>

      {/* main page description */}
      {currentSession.messages.length === 0 && (
        <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <Bot
            className="h-24 w-24 text-blue-500 items-center mx-auto"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <h2 className="text-xl font-bold mt-4">Welcome to AI Chatbot</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Start a conversation by typing a message below.
          </p>
          <div className="flex items-center mt-4 mx-auto w-full h-full">
            <button
              onClick={handleAutoSend}
              disabled={isGenerating}
              className="bg-white text-black w-full border border-gray-300 rounded-lg shadow-md flex items-center justify-center p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-2 flex-col">
                <h1 className="text-lg font-semibold">{autoInput}</h1>
                <p className="text-sm font-normal">
                  Click to start the conversation
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
      )}

      <div className="flex-grow overflow-auto p-4" ref={scrollAreaRef}>
        <AnimatePresence>
          {currentSession.messages.map((message, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <div
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start space-x-2">
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? " text-white"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <FormattedMessage
                      content={message.content}
                      role={message.role}
                    />
                  </div>
                  <button
                    onClick={() => copyToClipboard(message.content)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center space-x-2 mb-4"
          >
            <Bot className="h-5 w-5" />
            <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
              <span className="inline-flex space-x-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
              </span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-grow resize-none rounded-lg border dark:text-black border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
          />
          {isGenerating ? (
            <button
              onClick={handleStopThinking}
              className="p-2 rounded-full bg-red-500 text-white"
            >
              <X
                className="h-4 w-4"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <span className="sr-only">Stop thinking</span>
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={isGenerating || input.trim() === ""}
              className="p-2 rounded-full bg-blue-500 text-white disabled:opacity-50"
            >
              <Send
                className="h-4 w-4"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <span className="sr-only">Send</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
