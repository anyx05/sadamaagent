"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DashboardHeaderProps {
  sidebarCollapsed: boolean
  onMenuClick: () => void
}

export function DashboardHeader({ sidebarCollapsed, onMenuClick }: DashboardHeaderProps) {
  return (
    <header 
      className="fixed top-0 right-0 z-30 h-16 bg-background border-b border-border flex items-center justify-between px-6 transition-all duration-300"
      style={{ 
        left: sidebarCollapsed ? "72px" : "256px" 
      }}
    >
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search berths, bookings..."
            className="pl-10 w-64 h-9 bg-secondary border-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber rounded-full" />
        </Button>

        {/* Current Date/Time */}
        <div className="hidden md:block text-right">
          <p className="text-sm font-medium text-foreground">
            {new Date().toLocaleDateString("en-EE", { 
              weekday: "short", 
              month: "short", 
              day: "numeric" 
            })}
          </p>
          <p className="text-xs text-muted-foreground">
            Tallinn Port Authority
          </p>
        </div>
      </div>
    </header>
  )
}
