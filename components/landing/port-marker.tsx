"use client"

import { useEffect, useState } from "react"
import { Marker, Popup, Tooltip } from "react-leaflet"
import L from "leaflet"
import { Button } from "@/components/ui/button"
import { Ship, Navigation } from "lucide-react"

const createMarkerIcon = () => {
  return L.divIcon({
    className: "bg-transparent",
    html: `
      <div class="port-marker-dot">
        <div class="port-marker-pulse"></div>
        <div class="port-marker-core"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14]
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
    setIcon(createMarkerIcon())
  }, [])

  if (!icon) return null

  const handleAskAI = (e: React.MouseEvent) => {
    e.stopPropagation()
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
      <Tooltip
        direction="top"
        offset={[0, -14]}
        className="port-tooltip"
      >
        {name}
      </Tooltip>
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
