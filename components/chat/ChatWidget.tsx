"use client"

import { useState } from "react"
import { Send, Bot, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Hello! I am SadamaAgent. How can I assist you with your berth reservation?' }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMsg = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/chat-handler`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY}`
        },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          sessionId: "guest-" + Math.floor(Math.random() * 10000),
          locale: "en"
        })
      })

      const data = await response.json()
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.text || 'Error obtaining response' }])
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network connectivity error. Please try again later.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[350px] h-[500px] bg-background border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-navy p-4 flex justify-between items-center text-primary-foreground">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">SadamaAgent</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-xl max-w-[85%] text-sm ${m.role === 'user' ? 'bg-amber text-navy' : 'bg-white border text-foreground shadow-sm'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-xl bg-white border text-muted-foreground animate-pulse text-sm">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-background flex items-center gap-2">
            <Input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about available berths..."
              className="flex-1 focus-visible:ring-amber/50"
              disabled={loading}
            />
            <Button size="icon" className="bg-amber hover:bg-amber/90 text-navy" onClick={sendMessage} disabled={loading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-xl bg-amber hover:bg-amber/90 text-navy transition-transform duration-300 hover:scale-105 group"
        >
          <Bot className="w-6 h-6 group-hover:animate-pulse" />
        </Button>
      )}
    </div>
  )
}
