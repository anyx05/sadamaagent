"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Dynamically import the map to avoid SSR issues with window/document
const PortsMap = dynamic(() => import("./ports-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] rounded-xl border border-white/5 bg-navy/50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-cyan/70">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-sm">Loading Marina Map...</p>
      </div>
    </div>
  ),
})

interface MapWrapperProps {
  ports: any[]
}

export function MapWrapper({ ports }: MapWrapperProps) {
  return <PortsMap ports={ports} />
}
