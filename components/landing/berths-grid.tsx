"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Anchor, Ship, Ruler, Waves, MapPin, Clock } from "lucide-react"

const berths = [
  {
    id: 1,
    name: "Terminal A - Deep Water",
    location: "Muuga Harbour",
    depth: "16m",
    length: "400m",
    status: "available",
    type: "Container",
    featured: true,
  },
  {
    id: 2,
    name: "Terminal B - Cruise",
    location: "Old City Harbour",
    depth: "12m",
    length: "350m",
    status: "occupied",
    type: "Passenger",
    featured: false,
  },
  {
    id: 3,
    name: "Terminal C - Cargo",
    location: "Paldiski South",
    depth: "14m",
    length: "280m",
    status: "available",
    type: "General Cargo",
    featured: false,
  },
  {
    id: 4,
    name: "Terminal D - RoRo",
    location: "Muuga Harbour",
    depth: "10m",
    length: "220m",
    status: "maintenance",
    type: "RoRo",
    featured: false,
  },
  {
    id: 5,
    name: "Terminal E - Tanker",
    location: "Paldiski North",
    depth: "18m",
    length: "320m",
    status: "available",
    type: "Liquid Bulk",
    featured: true,
  },
  {
    id: 6,
    name: "Terminal F - Yacht",
    location: "Old City Harbour",
    depth: "6m",
    length: "80m",
    status: "available",
    type: "Leisure",
    featured: false,
  },
]

const statusColors = {
  available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  occupied: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  maintenance: "bg-amber/10 text-amber border-amber/20",
}

const statusLabels = {
  available: "Available",
  occupied: "Occupied",
  maintenance: "Maintenance",
}

export function BerthsGrid() {
  return (
    <section id="berths" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy/10 mb-4">
            <Anchor className="w-6 h-6 text-navy" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Available Berths
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore our network of premium berth facilities across Estonian ports. 
            Each terminal is equipped with modern infrastructure and 24/7 support.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {berths.map((berth, index) => (
            <Card 
              key={berth.id}
              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-border/50 ${
                berth.featured ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              } ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className={`absolute inset-0 bg-navy/[0.02] group-hover:bg-navy/[0.04] transition-colors ${
                berth.featured ? "bg-navy/[0.04]" : ""
              }`} />
              
              <CardContent className={`relative flex flex-col h-full p-6 ${
                berth.featured && index !== 0 ? "lg:py-8" : ""
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy/10 text-navy group-hover:bg-navy group-hover:text-white transition-colors">
                    <Ship className="w-5 h-5" />
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${statusColors[berth.status as keyof typeof statusColors]} font-medium`}
                  >
                    {statusLabels[berth.status as keyof typeof statusLabels]}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-navy transition-colors">
                  {berth.name}
                </h3>
                
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  {berth.location}
                </div>

                <div className="mt-auto">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {berth.type}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        <span className="font-medium text-foreground">{berth.depth}</span>
                        <span className="text-muted-foreground ml-1">depth</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        <span className="font-medium text-foreground">{berth.length}</span>
                        <span className="text-muted-foreground ml-1">length</span>
                      </span>
                    </div>
                  </div>
                </div>

                {berth.featured && (
                  <div className="absolute top-4 right-4">
                    <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Info Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-navy text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber" />
              <span className="text-white/80">
                Real-time availability updates every <span className="text-amber font-semibold">5 minutes</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-white/70">4 Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-sm text-white/70">1 Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber" />
                <span className="text-sm text-white/70">1 Maintenance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
