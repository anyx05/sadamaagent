"use client"

import { useEffect, useState } from "react"
import { Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { Button } from "@/components/ui/button"
import { Ship, Navigation } from "lucide-react"

// Create the custom bolt-style icon (grey circle with thick dark border)
const createBoltStyleIcon = () => {
  return L.divIcon({
    className: "bg-transparent",
    html: `
      <div class="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#8b8b8b] border-[3px] border-[#1a1f2e] shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform hover:scale-110 cursor-pointer">
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  })
}

interface PortMarkerProps {
  id: string
  name: string
  description: string | null
  coordinates: [number, number]
  totalBerths: number
}

export function PortMarker({ id, name, description, coordinates, totalBerths }: PortMarkerProps) {
  const [icon, setIcon] = useState<L.DivIcon | null>(null)

  useEffect(() => {
    setIcon(createBoltStyleIcon())
  }, [])

  if (!icon) return null

  const handleAskAI = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Dispatch a custom event that the ChatWidget will listen to
    window.dispatchEvent(
      new CustomEvent('open-chat', {
        detail: {
          prompt: `I want to check berth availability at ${name}.`
        }
      })
    )
  }

  return (
    <Marker position={coordinates} icon={icon}>
      <Popup className="custom-popup min-w-[200px]">
        <div className="p-1 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan" />
              {name}
            </h3>
            {description && (
              <p className="text-sm text-slate-300 mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-200">
            <Ship className="w-4 h-4 text-amber" />
            <span>{totalBerths} Berths Total</span>
          </div>

          <Button 
            onClick={handleAskAI}
            className="w-full bg-cyan/20 hover:bg-cyan/30 text-cyan-light border border-cyan/30 transition-all mt-2"
          >
            Ask AI to Book
          </Button>
        </div>
      </Popup>
    </Marker>
  )
}
