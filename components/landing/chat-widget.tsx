"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Anchor, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations, useLocale } from "next-intl"

interface ChatWidgetProps {
  isOpen: boolean
  onToggle: () => void
}

export function ChatWidget({ isOpen, onToggle }: ChatWidgetProps) {
  const t = useTranslations("ChatWidget")
  const locale = useLocale()
  
  // Generate a unique session ID per chat session (not shared across all users)
  const sessionId = useMemo(() => `guest-${crypto.randomUUID()}`, [])
  
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ id: number; role: 'user' | 'assistant'; content: string }[]>([
    {
      id: 1,
      role: "assistant",
      content: t("welcome"),
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleOpenChat = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail?.prompt) {
        setMessage(customEvent.detail.prompt)
      }
    }
    window.addEventListener("open-chat", handleOpenChat)
    return () => window.removeEventListener("open-chat", handleOpenChat)
  }, [])

  const handleSend = async () => {
    if (!message.trim()) return
    
    // Add User Message Instantly
    const userMsg = { id: Date.now(), role: "user" as const, content: message }
    setMessages(prev => [...prev, userMsg])
    setMessage("")
    setIsTyping(true)
    
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
      
      if (!supabaseUrl || !publishableKey) {
        throw new Error('Missing configuration')
      }
      
      const res = await fetch(`${supabaseUrl}/functions/v1/chat-handler`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": publishableKey
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          sessionId: sessionId,
          locale: locale
        })
      })

      const data = await res.json()
      
      if (!res.ok) {
        // Edge function returned an error — use the fallback text if available
        setMessages(prev => [
          ...prev, 
          { 
            id: Date.now() + 1, 
            role: 'assistant' as const, 
            content: data.text || data.error || 'An error occurred. Please try again.' 
          }
        ])
        return
      }
      
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          role: 'assistant' as const, 
          content: data.text || 'I received an empty response. Please try again.' 
        }
      ])
    } catch (e) {
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          role: 'assistant' as const, 
          content: 'Network connectivity error. Please check your connection and try again.' 
        }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Floating Button with Animation */}
      <motion.button
        onClick={onToggle}
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1100] flex items-center justify-center w-14 h-14 rounded-2xl shadow-2xl transition-colors",
          isOpen 
            ? "bg-slate text-white" 
            : "bg-gradient-to-br from-cyan to-cyan-dark text-white"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse animation when closed */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-2xl bg-cyan/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Panel with Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-[1100] w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] max-w-md"
          >
            <div className="flex flex-col h-[450px] sm:h-[500px] rounded-2xl border border-white/10 bg-navy/95 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-navy to-slate border-b border-white/10">
                <div className="relative">
                  <div className="absolute -inset-1 bg-cyan/20 rounded-full blur-md" />
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-cyan-dark text-white">
                    <Anchor className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    {t("title")}
                    <Sparkles className="w-3.5 h-3.5 text-cyan" />
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-xs text-white/50">{t("status")}</p>
                  </div>
                </div>
                <button
                  onClick={onToggle}
                  className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "flex gap-3",
                      msg.role === "user" ? "flex-row-reverse" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                        msg.role === "assistant" 
                          ? "bg-gradient-to-br from-cyan/20 to-cyan/10 text-cyan ring-1 ring-cyan/20" 
                          : "bg-white/10 text-white/70"
                      )}
                    >
                      {msg.role === "assistant" ? (
                        <Anchor className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line",
                        msg.role === "assistant"
                          ? "bg-white/[0.05] text-white/90 rounded-tl-sm border border-white/10"
                          : "bg-cyan text-navy font-medium rounded-tr-sm"
                      )}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan/20 to-cyan/10 text-cyan ring-1 ring-cyan/20">
                      <Anchor className="w-4 h-4" />
                    </div>
                    <div className="bg-white/[0.05] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <motion.span
                          className="w-2 h-2 rounded-full bg-cyan/50"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span
                          className="w-2 h-2 rounded-full bg-cyan/50"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.span
                          className="w-2 h-2 rounded-full bg-cyan/50"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 bg-navy/50 backdrop-blur-sm">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex items-center gap-2"
                >
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("placeholder")}
                    className="flex-1 h-11 bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 focus:border-cyan focus:ring-cyan/20"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      type="submit" 
                      size="icon"
                      disabled={!message.trim()}
                      className="h-11 w-11 bg-cyan hover:bg-cyan-light text-navy shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </form>
                <p className="text-[10px] text-white/30 text-center mt-2">
                  {t("disclaimer")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
