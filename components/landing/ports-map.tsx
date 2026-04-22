"use client"

import { useEffect, useState, useMemo } from "react"
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { PortMarker } from "./port-marker"

export interface MapPort {
  id: string
  name: string
  description: string | null
  coordinates: string | null
  berths: any[]
}

interface PortsMapProps {
  ports: MapPort[]
}

const ESTONIA_CENTER: [number, number] = [58.5953, 25.0136]
const DEFAULT_ZOOM = 7

function FitBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (coords.length === 0) return
    if (coords.length === 1) {
      map.setView(coords[0], 10)
      return
    }
    const bounds = L.latLngBounds(coords)
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 })
  }, [coords, map])
  return null
}

export default function PortsMap({ ports }: PortsMapProps) {
  const validPorts = useMemo(() => {
    return ports
      .filter((p) => p.coordinates)
      .map((p) => {
        const [latStr, lngStr] = p.coordinates!.split(",")
        const lat = parseFloat(latStr)
        const lng = parseFloat(lngStr)
        if (isNaN(lat) || isNaN(lng)) return null
        return { ...p, coords: [lat, lng] as [number, number] }
      })
      .filter(Boolean) as (MapPort & { coords: [number, number] })[]
  }, [ports])

  const allCoords = useMemo(() => validPorts.map((p) => p.coords), [validPorts])

  return (
    <div className="w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-white/5 relative z-10">
      <MapContainer
        center={ESTONIA_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        <FitBounds coords={allCoords} />

        {validPorts.map((port) => (
          <PortMarker
            key={port.id}
            id={port.id}
            name={port.name}
            description={port.description}
            coordinates={port.coords}
            totalBerths={port.berths?.length || 0}
          />
        ))}
      </MapContainer>
    </div>
  )
}
