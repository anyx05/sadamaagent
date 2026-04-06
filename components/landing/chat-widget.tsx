"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Anchor, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatWidgetProps {
  isOpen: boolean
  onToggle: () => void
}

const dummyMessages = [
  {
    id: 1,
    role: "assistant" as const,
    content: "Welcome to SadamaAgent! I'm your harbour assistant. How can I help you today?",
  },
  {
    id: 2,
    role: "user" as const,
    content: "I need to reserve a berth for a cargo vessel.",
  },
  {
    id: 3,
    role: "assistant" as const,
    content: "I'd be happy to help you with a berth reservation. Could you please provide the following details:\n\n• Vessel name and IMO number\n• Expected arrival date\n• Vessel length and draft\n• Type of cargo",
  },
]

export function ChatWidget({ isOpen, onToggle }: ChatWidgetProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(dummyMessages)

  const handleSend = () => {
    if (!message.trim()) return
    
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        role: "user",
        content: message,
      },
    ])
    setMessage("")
    
    // Simulate assistant response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          role: "assistant",
          content: "Thank you for your inquiry. Our team will process your request shortly. Is there anything else I can help you with?",
        },
      ])
    }, 1000)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={onToggle}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          isOpen 
            ? "bg-foreground text-background" 
            : "bg-amber text-navy hover:bg-amber/90"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md transition-all duration-300 origin-bottom-right",
          isOpen 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-[500px] rounded-2xl border border-white/20 bg-background/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 bg-navy text-white">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber text-navy">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Harbour Assistant</h3>
              <p className="text-xs text-white/60">Online - Typically replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                    msg.role === "assistant" 
                      ? "bg-navy text-white" 
                      : "bg-amber text-navy"
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
                    "max-w-[75%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line",
                    msg.role === "assistant"
                      ? "bg-secondary text-foreground rounded-tl-none"
                      : "bg-navy text-white rounded-tr-none"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-background/50">
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
                placeholder="Type your message..."
                className="flex-1 bg-secondary border-0"
              />
              <Button 
                type="submit" 
                size="icon"
                className="bg-navy hover:bg-navy-light text-white shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
