"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Anchor, 
  Ship, 
  Calendar, 
  Settings, 
  LogOut, 
  ChevronLeft,
  LayoutDashboard,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Berth Manager",
    href: "/dashboard/berths",
    icon: Ship,
  },
  {
    label: "Bookings",
    href: "/dashboard/bookings",
    icon: Calendar,
  },
  {
    label: "Agent Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-navy text-white transition-all duration-300 flex flex-col",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber text-navy shrink-0">
            <Anchor className="w-5 h-5" />
          </div>
          <span className={cn(
            "font-semibold text-lg whitespace-nowrap transition-opacity duration-300",
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}>
            SadamaAgent
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-white/15 text-white" 
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 shrink-0 transition-colors",
                    isActive ? "text-amber" : "group-hover:text-amber"
                  )} />
                  <span className={cn(
                    "whitespace-nowrap transition-opacity duration-300",
                    collapsed ? "opacity-0 w-0" : "opacity-100"
                  )}>
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-white/10 p-3">
        {/* User Profile */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 mb-3 transition-all duration-300",
          collapsed && "justify-center"
        )}>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber/20 text-amber shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className={cn(
            "transition-opacity duration-300 overflow-hidden",
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}>
            <p className="text-sm font-medium truncate">Captain Admin</p>
            <p className="text-xs text-white/50 truncate">admin@maritime.ee</p>
          </div>
        </div>

        {/* Logout */}
        <Link
          href="/login"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className={cn(
            "whitespace-nowrap transition-opacity duration-300",
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}>
            Sign Out
          </span>
        </Link>

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn(
            "w-full mt-3 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200",
            collapsed && "px-0"
          )}
        >
          <ChevronLeft className={cn(
            "w-5 h-5 transition-transform duration-300",
            collapsed && "rotate-180"
          )} />
          <span className={cn(
            "ml-2 transition-opacity duration-300",
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}>
            Collapse
          </span>
        </Button>
      </div>
    </aside>
  )
}
