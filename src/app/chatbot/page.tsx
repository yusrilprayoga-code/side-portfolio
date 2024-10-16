"use client"

import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, User, X, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { generateChat } from "@/app/api/chat";
import { readStreamableValue } from "ai/rsc";
import { Message } from "@/types/message";
import FormattedMessage from "@/components/formattedMessage";

type Props = {
  onGenerate: (value: string) => void
  isComposing?: boolean
}

type ChatSession = {
  id: string
  name: string
  messages: Message[]
}

export default function AIChatbotWithSidebar({ onGenerate, isComposing }: Props) {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    { id: "1", name: "New Chat", messages: [] },
  ])
  const [currentSessionId, setCurrentSessionId] = useState("1")
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [shouldStop, setShouldStop] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  const currentSession = chatSessions.find((session) => session.id === currentSessionId) || chatSessions[0]

  const updateCurrentSession = useCallback((updater: (session: ChatSession) => ChatSession) => {
    setChatSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId ? updater(session) : session
      )
    )
  }, [currentSessionId])

  const handleSend = async () => {
    if (input.trim() === "" || isGenerating) return

    const userMessage: Message = { role: "user", content: input }
    updateCurrentSession((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }))
    setInput("")
    setIsGenerating(true)
    setShouldStop(false)

    try {
      const { output } = await generateChat("", input)
      let botResponse = ""

      updateCurrentSession((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { role: "bot", content: "", fullContent: "" },
        ],
      }))

      for await (const delta of readStreamableValue(output)) {
        if (shouldStop) break
        if (delta) {
          botResponse += delta
          updateCurrentSession((prev) => {
            const newMessages = [...prev.messages]
            const lastMessage = newMessages[newMessages.length - 1]
            if (lastMessage.role === "bot") {
              lastMessage.fullContent = botResponse
            }
            return { ...prev, messages: newMessages }
          })
          onGenerate(delta)
        }
      }

      if (botResponse.trim() === "") {
        throw new Error("No content generated")
      }

      onGenerate("\n")
    } catch (error) {
      updateCurrentSession((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            role: "bot",
            content: "An error occurred while generating the response. Please try again.",
          },
        ],
      }))
    } finally {
      setIsGenerating(false)
      setShouldStop(false)
    }
  }

  const handleStopThinking = useCallback(() => {
    setShouldStop(true)
  }, [])

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("Text copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [currentSession.messages])

  useEffect(() => {
    const lastMessage = currentSession.messages[currentSession.messages.length - 1]
    if (lastMessage && lastMessage.role === "bot" && lastMessage.fullContent) {
      const timer = setInterval(() => {
        updateCurrentSession((prev) => {
          const newMessages = [...prev.messages]
          const lastMsg = newMessages[newMessages.length - 1]
          if (lastMsg.role === "bot" && lastMsg.content.length < lastMsg.fullContent!.length) {
            lastMsg.content = lastMsg.fullContent!.slice(0, lastMsg.content.length + 1)
            return { ...prev, messages: newMessages }
          }
          clearInterval(timer)
          return prev
        })
      }, 20)

      return () => clearInterval(timer)
    }
  }, [currentSession.messages, updateCurrentSession])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  return (
    <div className="flex flex-col h-[100vh] bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-bold">AI Chatbot by YusrilPrayoga</h1>
        </div>
      </div>

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
              <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-start space-x-2">
                  {message.role === "user" ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                  <div className={`rounded-lg p-3 ${
                    message.role === "user" ? " text-white" : "bg-gray-200 dark:bg-gray-700"
                  }`}>
                    <FormattedMessage content={message.content} role={message.role} />
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-grow resize-none rounded-lg border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
          />
          {isGenerating ? (
            <button onClick={handleStopThinking} className="p-2 rounded-full bg-red-500 text-white">
              <X className="h-4 w-4" />
              <span className="sr-only">Stop thinking</span>
            </button>
          ) : (
            <button 
              onClick={handleSend} 
              disabled={isGenerating || input.trim() === ""}
              className="p-2 rounded-full bg-blue-500 text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}