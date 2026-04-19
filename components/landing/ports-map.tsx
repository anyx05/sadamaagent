"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { PortMarker } from "./port-marker"

// Types matching the DB schema we expect
export interface MapPort {
  id: string
  name: string
  description: string | null
  coordinates: string | null
  berths: any[] // Just grabbing length for the map
}

interface PortsMapProps {
  ports: MapPort[]
}

// Component to dynamically set map center based on Geolocation
function MapController({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

const ESTONIA_CENTER: [number, number] = [58.5953, 25.0136]

export default function PortsMap({ ports }: PortsMapProps) {
  const [center, setCenter] = useState<[number, number]>(ESTONIA_CENTER)
  const [zoom, setZoom] = useState(7)
  const [locationFound, setLocationFound] = useState(false)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Check if within rough bounding box of Europe to avoid zooming to somewhere irrelevant
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          if (lat > 35 && lat < 72 && lng > -10 && lng < 40) {
            setCenter([lat, lng])
            setZoom(8)
            setLocationFound(true)
          }
        },
        (error) => {
          console.log("Geolocation error or denied:", error.message)
        },
        { timeout: 5000 }
      )
    }
  }, [])

  return (
    <div className="w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-white/5 relative z-10">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        {locationFound && <MapController center={center} />}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark-map-tiles"
        />
        
        {ports.map((port) => {
          if (!port.coordinates) return null
          const [latStr, lngStr] = port.coordinates.split(",")
          const lat = parseFloat(latStr)
          const lng = parseFloat(lngStr)
          if (isNaN(lat) || isNaN(lng)) return null

          // Ensure it's treated as an array of numbers
          const coords: [number, number] = [lat, lng]
          const totalBerths = port.berths?.length || 0

          return (
            <PortMarker
              key={port.id}
              id={port.id}
              name={port.name}
              description={port.description}
              coordinates={coords}
              totalBerths={totalBerths}
            />
          )
        })}
      </MapContainer>
    </div>
  )
}
