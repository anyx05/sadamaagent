"use client"

import { useState } from "react"
import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { BerthsGrid } from "@/components/landing/berths-grid"
import { Footer } from "@/components/landing/footer"
import { ChatWidget } from "@/components/landing/chat-widget"

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection onOpenChat={() => setIsChatOpen(true)} />
      <BerthsGrid />
      <Footer />
      <ChatWidget 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
    </main>
  )
}
