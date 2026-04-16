"use client"

import { useState } from "react"
import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturedPorts } from "@/components/landing/featured-ports"
import { BerthsGrid } from "@/components/landing/berths-grid"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Footer } from "@/components/landing/footer"
import { ChatWidget } from "@/components/landing/chat-widget"

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection onOpenChat={() => setIsChatOpen(true)} />
      <HowItWorks />
      <FeaturedPorts />
      <BerthsGrid />
      <Footer />
      <ChatWidget 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
    </main>
  )
}
