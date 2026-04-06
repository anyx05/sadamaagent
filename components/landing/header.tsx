"use client"

import Link from "next/link"
import { Anchor } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy text-white transition-transform group-hover:scale-105">
              <Anchor className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg text-foreground">SadamaAgent</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="#berths" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Berths
            </Link>
            <Link 
              href="#services" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link 
              href="#about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-navy hover:bg-navy-light text-white">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
