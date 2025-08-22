"use client"

import React, { useState, useRef, useEffect } from "react"
import { Bot, Send, X, Copy, AlertCircle, Sparkles, MessageCircle } from "lucide-react"
import { readStreamableValue } from "ai/rsc"
import type { Message } from "@/types/message"
import FormattedMessage from "@/components/formatted-message"
import { generatePortfolio } from '@/app/api/route';

type ChatSession = {
  id: string
  name: string
  messages: Message[]
}

export default function AIChatbotWithSidebar() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([{ id: "1", name: "New Chat", messages: [] }])
  const [currentSessionId, setCurrentSessionId] = useState("1")
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [shouldStop, setShouldStop] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const autoInput = " Hi, I'm Yusril Prayoga. Can you tell me more about your portfolio?"

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight
    }
  }, [input])

  React.useEffect(() => {
    if (shouldStop) {
      setIsGenerating(false)
      setShouldStop(false)
    }
  }, [shouldStop])

  const handleAutoSend = () => {
    setInput(autoInput)
    setTimeout(() => handleSend(), 100)
  }

  const currentSession = chatSessions.find((session) => session.id === currentSessionId) || chatSessions[0]

  const updateCurrentSession = (updater: (session: ChatSession) => ChatSession) => {
    setChatSessions((prev) => prev.map((session) => (session.id === currentSessionId ? updater(session) : session)))
  }

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
  `

  const handleSend = async () => {
    if (input.trim() === "" || isGenerating) return

    const userMessage: Message = { role: "user", content: input }
    updateCurrentSession((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }))

    const currentInput = input
    setInput("")
    setIsGenerating(true)
    setShouldStop(false)
    setError(null)

    try {
      const combinedPrompt = `${portfolioInfo}\n\nUser query: ${currentInput}\n\nPlease provide a response based on the portfolio information above. If the query is not related to the portfolio, politely redirect the conversation back to the portfolio contents.`

      console.log("[Chatbot] Starting AI generation...")

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout after 30 seconds")), 30000)
      })

      const generatePromise = generatePortfolio(combinedPrompt, "")

      const result = (await Promise.race([generatePromise, timeoutPromise])) as any
      const { output } = result

      let botResponse = ""
      let chunkCount = 0

      console.log("[Chatbot] Reading stream...")

      for await (const chunk of readStreamableValue(output)) {
        if (shouldStop) {
          console.log("[Chatbot] Generation stopped by user")
          break
        }

        chunkCount++
        botResponse += chunk || ""

        if (chunkCount % 3 === 0) {
          updateCurrentSession((prev) => {
            const newMessages = [...prev.messages]
            const lastMessage = newMessages[newMessages.length - 1]
            if (lastMessage && lastMessage.role === "bot") {
              lastMessage.content = botResponse
            } else {
              newMessages.push({ role: "bot", content: botResponse })
            }
            return { ...prev, messages: newMessages }
          })
        }
      }

      console.log(`[Chatbot] Generation completed. Chunks: ${chunkCount}, Length: ${botResponse.length}`)

      if (!botResponse.trim()) {
        throw new Error("Empty response received from AI service")
      }

      updateCurrentSession((prev) => {
        const newMessages = [...prev.messages]
        const lastMessage = newMessages[newMessages.length - 1]
        if (lastMessage && lastMessage.role === "bot") {
          lastMessage.content = botResponse
        } else {
          newMessages.push({ role: "bot", content: botResponse })
        }
        return { ...prev, messages: newMessages }
      })
    } catch (error: any) {
      console.error("[Chatbot] Error generating response:", {
        message: error?.message,
        stack: error?.stack,
        name: error?.name,
      })

      let errorMessage = "An error occurred while generating the response. Please try again."

      if (error?.message?.includes("timeout")) {
        errorMessage = "Request timed out. Please try again with a shorter message."
      } else if (error?.message?.includes("COHERE_API_KEY")) {
        errorMessage = "API configuration error. Please contact support."
      } else if (error?.message?.includes("rate limit")) {
        errorMessage = "Too many requests. Please wait a moment and try again."
      }

      setError(errorMessage)

      updateCurrentSession((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            role: "bot",
            content: errorMessage,
          },
        ],
      }))
    } finally {
      setIsGenerating(false)
      setShouldStop(false)
    }
  }

  const handleStopThinking = () => {
    console.log("[Chatbot] Stop requested by user")
    setShouldStop(true)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [currentSession.messages])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="relative bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b border-border/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
              <div className="relative bg-gradient-to-br from-primary to-accent p-2 rounded-full">
                <Sparkles className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text">
                AI Portfolio Assistant
              </h1>
              <p className="text-sm text-muted-foreground">
                Powered by <span className="font-medium text-accent">Cohere AI</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="animate-slide-up bg-destructive/10 border border-destructive/20 p-4 m-4 rounded-xl flex items-center space-x-3 shadow-sm">
          <div className="bg-destructive/20 p-1 rounded-full">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </div>
          <span className="text-sm text-destructive flex-1">{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-destructive hover:text-destructive/80 transition-colors p-1 rounded-full hover:bg-destructive/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {currentSession.messages.length === 0 && (
        <div className="flex-grow flex items-center justify-center p-8">
          <div className="text-center max-w-2xl animate-fade-in">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-full border border-border/50 backdrop-blur-sm">
                <MessageCircle className="h-16 w-16 text-primary mx-auto" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
              Welcome to AI Portfolio Assistant
            </h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Discover Yusril Prayoga portfolio through intelligent conversation. Ask about projects, skills, or
              experience.
            </p>
            <div className="w-full max-w-lg mx-auto">
              <button
                onClick={handleAutoSend}
                disabled={isGenerating}
                className="group w-full bg-card hover:bg-card/80 border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 disabled:opacity-50"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {autoInput}
                    </h3>
                    <p className="text-sm text-muted-foreground">Click to start exploring the portfolio</p>
                  </div>
                  <div className="ml-4 bg-primary/10 group-hover:bg-primary/20 p-3 rounded-full transition-colors">
                    <Send className="h-5 w-5 text-primary" strokeWidth={2} />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow overflow-auto p-6 space-y-6" ref={scrollAreaRef}>
        {currentSession.messages.map((message, idx) => (
          <div key={idx} className="animate-fade-in">
            <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start space-x-3 max-w-[85%]">
                {message.role === "bot" && (
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-2 rounded-full border border-border/50 flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" strokeWidth={2} />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 shadow-sm border ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-primary/20"
                      : "bg-card text-card-foreground border-border/50 shadow-black/20"
                  }`}
                >
                  <FormattedMessage content={message.content} role={message.role} />
                </div>
                <button
                  onClick={() => copyToClipboard(message.content)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted/50 flex-shrink-0"
                >
                  <Copy className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-start space-x-3 animate-fade-in">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-2 rounded-full border border-border/50">
              <Bot className="h-4 w-4 text-primary" strokeWidth={2} />
            </div>
            <div className="bg-card border border-border/50 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm p-6">
        <div className="flex items-end space-x-4 max-w-4xl mx-auto">
          <div className="flex-grow relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about projects, skills, or experience..."
              className="w-full resize-none rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
              rows={1}
              disabled={isGenerating}
              style={{ minHeight: "48px", maxHeight: "120px" }}
            />
          </div>
          {isGenerating ? (
            <button
              onClick={handleStopThinking}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground p-3 rounded-2xl transition-all shadow-sm hover:shadow-md flex-shrink-0"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={isGenerating || input.trim() === ""}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-2xl transition-all shadow-sm hover:shadow-md hover:shadow-primary/20 flex-shrink-0"
            >
              <Send className="h-5 w-5" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
