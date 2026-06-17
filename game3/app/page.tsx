"use client"

import React, { useState, useRef, useEffect } from "react"
import { Send, Bot, User, MessageCircle, X, Lock, Unlock, Eye, EyeOff, ShieldAlert, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// 1. Updated interface to match backend expectations exactly
interface Message {
  id: string
  role: "user" | "bot" // Changed from 'assistant' to 'bot' to sync with backend formatting loop
  text: string         // Changed from 'content' to 'text'
  timestamp: string
}

export default function MainGatePage() {
  const targetPassword = process.env.NEXT_PUBLIC_GATE_PASSWORD || "admin123"

  // Page-level authentication states
  const [isMainUnlocked, setIsMainUnlocked] = useState(false)
  const [mainPassword, setMainPassword] = useState("")
  const [showMainPassword, setShowMainPassword] = useState(false)
  const [mainPasswordError, setMainPasswordError] = useState(false)

  // Floating Chat states
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      role: "bot", // Styled as bot matching the array parser loop logic
      text: "System automated support online. I am Alpha Insecure 1.0. How can I help you navigate the gate terminal?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll logic for chat
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isChatOpen, isLoading])

  // Verify function for the main interface screen gate
  const handleMainVerify = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (mainPassword === targetPassword) {
      setIsMainUnlocked(true)
      setMainPasswordError(false)

      setMessages((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          role: "bot",
          text: "🎉 System Authenticated Successfully! Main core console interface is now fully exposed.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ])
    } else {
      setMainPasswordError(true)
    }
  }

  // Connected to updated /api/gemini endpoint
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || isLoading) return

    const currentInput = chatInput.trim()
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: currentInput,
      timestamp,
    }

    // Explicitly stage user message inside view array layout
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setChatInput("")
    setIsLoading(true)

    // Alternative bypass condition check if they pass key straight into client chat widget bubble
    if (!isMainUnlocked && currentInput === targetPassword) {
      setTimeout(() => {
        setIsMainUnlocked(true)
        setMainPasswordError(false)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "bot",
            text: "Access key accepted via prompt override! Unlocking the main HTML dashboard layer now...",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ])
        setIsLoading(false)
      }, 800)
      return
    }

    try {
      // 2. Format the payload payload to map backend expectation parameter { messages: [{role, text}] }
      const payloadMessages = updatedMessages.map(({ role, text }) => ({
        role,
        text,
      }))

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: payloadMessages }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: data.message, // 3. Updated to retrieve text content directly out of data.message schema matching backend output
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: `❌ Error: ${error.message || "Failed to communicate with Alpha Insecure daemon terminal."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-sans flex flex-col items-center justify-center relative overflow-hidden">

      {/* 1. MAIN INTERFACE PASSWORD GATE */}
      {!isMainUnlocked ? (
        <div className="w-full max-w-md p-8 mx-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-all animate-in fade-in zoom-in-95 duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4 ring-8 ring-rose-50 dark:ring-rose-950/20">
              <Lock className="h-6 w-6" />
            </div>

            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
              ALPHA INSECURE 1.0
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[280px]">
              This ecosystem deployment is locked. Enter the token key defined in your environment workspace setup.
            </p>

            <form onSubmit={handleMainVerify} className="w-full mt-6 space-y-3">
              <div className="relative">
                <Input
                  type={showMainPassword ? "text" : "password"}
                  value={mainPassword}
                  onChange={(e) => {
                    setMainPassword(e.target.value)
                    if (mainPasswordError) setMainPasswordError(false)
                  }}
                  placeholder="Enter system access token..."
                  className={`pr-10 h-11 bg-slate-50/50 dark:bg-slate-950/50 ${mainPasswordError ? "border-rose-500 focus-visible:ring-rose-500" : "border-slate-200 dark:border-slate-800"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowMainPassword(!showMainPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showMainPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {mainPasswordError && (
                <div className="flex items-center gap-1.5 text-rose-500 text-xs font-medium pl-1 animate-in fade-in duration-200">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Access Denied. Token mismatch.</span>
                </div>
              )}

              <Button type="submit" className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white font-medium transition-all">
                Authenticate Console
              </Button>
            </form>
          </div>
        </div>
      ) : (

        /* 2. PROTECTED MAIN APPLICATION CONTENT */
        <div className="w-full h-full flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
          <div className="max-w-md">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Unlock className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              System Dashboard Active
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back operator. You have full workspace clearance parsed from secure configurations.
            </p>
          </div>
        </div>
      )}

      {/* 3. GLOBAL FLOATING WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Popover Chat Frame */}
        {isChatOpen && (
          <div className="w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] max-h-[calc(100vh-6rem)] flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">

            {/* Chat Header */}
            <header className="flex items-center justify-between px-4 h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-rose-600" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 tracking-wide">
                    ALPHA INSECURE 1.0
                  </h3>
                  <p className={`text-[10px] font-medium ${isMainUnlocked ? "text-emerald-500" : "text-amber-500"}`}>
                    {isMainUnlocked ? "Secure Session Node" : "Terminal Support Mode"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </header>

            {/* Messages Loop Area - FIX APPLIED HERE */}
            <div className="flex-1 min-h-0 relative">
              <ScrollArea className="h-full w-full p-4 bg-slate-50 dark:bg-slate-950">
                <div className="space-y-4 pb-4">
                  {messages.map((msg) => {
                    const isBot = msg.role === "bot"
                    return (
                      <div key={msg.id} className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}>
                        {isBot && (
                          <Avatar className="h-7 w-7 border shrink-0">
                            <AvatarFallback className="bg-rose-600 text-white text-xs">
                              <Bot className="h-3.5 w-3.5" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`flex flex-col max-w-[85%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${isBot ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-100/80 dark:border-slate-800"
                            : "bg-slate-900 dark:bg-slate-100 text-slate-50 dark:text-slate-900 rounded-tr-none"
                          }`}>
                          <p className="leading-relaxed whitespace-pre-wrap text-[13px]">{msg.text}</p>
                          <span className="text-[9px] mt-1 self-end text-slate-400">{msg.timestamp}</span>
                        </div>
                        {!isBot && (
                          <Avatar className="h-7 w-7 border shrink-0">
                            <AvatarFallback className="bg-slate-200 dark:bg-slate-800 text-slate-700 text-xs">
                              <User className="h-3.5 w-3.5" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )
                  })}

                  {/* Loading Bubble Indicator */}
                  {isLoading && (
                    <div className="flex gap-3 justify-start animate-pulse">
                      <Avatar className="h-7 w-7 border shrink-0">
                        <AvatarFallback className="bg-rose-600 text-white text-xs">
                          <Bot className="h-3.5 w-3.5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 text-slate-400 rounded-2xl rounded-tl-none px-4 py-2 border border-slate-100 dark:border-slate-800 text-xs shadow-sm">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-rose-500" />
                        <span>Alpha typing...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </div>

            {/* Input Stream Footer */}
            <footer className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={isLoading ? "Waiting for connection..." : "Ask Alpha Gemini..."}
                  disabled={isLoading}
                  className="flex-1 h-9 bg-slate-50 dark:bg-slate-950 text-xs"
                />
                <Button type="submit" size="icon" disabled={!chatInput.trim() || isLoading} className="h-9 w-9 shrink-0">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            </footer>
          </div>
        )}

        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          size="icon"
          className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${isChatOpen ? "bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-800 dark:text-white rotate-90"
              : "bg-rose-600 hover:bg-rose-700 text-white"
            }`}
        >
          {isChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

    </div>
  )
}