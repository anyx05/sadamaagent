"use client"

import { useEffect, useMemo } from "react"
import { MapContainer, TileLayer, useMap, ZoomControl } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { PortMarker } from "./port-marker"
import { Navigation } from "lucide-react"

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

// Estonia & Baltic coast — good default view
const ESTONIA_CENTER: [number, number] = [59.05, 24.7]
const DEFAULT_ZOOM = 8
const MIN_ZOOM = 2   // allow zooming out to global level
const MAX_ZOOM = 16

function FitBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (coords.length === 0) return
    if (coords.length === 1) {
      map.setView(coords[0], 11, { animate: false })
      return
    }
    const bounds = L.latLngBounds(coords)
    map.fitBounds(bounds, { padding: [80, 80], maxZoom: 11, animate: false })
  }, [coords, map])
  return null
}

function RecenterControl({ coords }: { coords: [number, number][] }) {
  const map = useMap()
  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: '10px', marginRight: '10px' }}>
      <div className="leaflet-control leaflet-control-zoom leaflet-bar">
        <a 
          href="#"
          role="button"
          onClick={(e) => {
            e.preventDefault()
            if (coords.length > 1) {
               const bounds = L.latLngBounds(coords)
               map.fitBounds(bounds, { padding: [80, 80], maxZoom: 11 })
            } else if (coords.length === 1) {
               map.setView(coords[0], 11)
            } else {
               map.setView(ESTONIA_CENTER, DEFAULT_ZOOM)
            }
          }}
          title="Recenter to ports"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Navigation className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
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
    <MapContainer
      center={ESTONIA_CENTER}
      zoom={DEFAULT_ZOOM}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      scrollWheelZoom={false}
      zoomControl={false}
      doubleClickZoom={true}
      className="w-full h-full"
    >
      {/*
        Stadia Maps — Alidade Smooth Dark
        Deep navy water, muted grey land, subtle white labels.
        Matches the brand palette exactly. Free, no API key for reasonable use.
      */}
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        maxZoom={MAX_ZOOM}
      />

      <ZoomControl position="bottomright" />
      <RecenterControl coords={allCoords} />

      <FitBounds coords={allCoords} />

      {validPorts.flatMap((port) => [
        <PortMarker
          key={`${port.id}-prev`}
          id={port.id}
          name={port.name}
          description={port.description}
          coordinates={[port.coords[0], port.coords[1] - 360]}
          totalBerths={port.berths?.length || 0}
        />,
        <PortMarker
          key={port.id}
          id={port.id}
          name={port.name}
          description={port.description}
          coordinates={port.coords}
          totalBerths={port.berths?.length || 0}
        />,
        <PortMarker
          key={`${port.id}-next`}
          id={port.id}
          name={port.name}
          description={port.description}
          coordinates={[port.coords[0], port.coords[1] + 360]}
          totalBerths={port.berths?.length || 0}
        />,
      ])}
    </MapContainer>
  )
}
