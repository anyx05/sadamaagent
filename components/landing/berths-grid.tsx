"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Anchor, Ship, Ruler, Waves, Clock, Euro } from "lucide-react"
import { useBerths } from "@/lib/queries/berths"

const statusColors = {
  available:
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/15",
  occupied:
    "bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/15",
  maintenance: "bg-amber/10 text-amber border-amber/20 hover:bg-amber/15",
}

const statusLabels = {
  available: "Available",
  occupied: "Occupied",
  maintenance: "Maintenance",
}

export function BerthsGrid() {
  const { data: berths, isLoading, error } = useBerths()

  return (
    <section id="berths" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-navy/10 mb-4 transition-transform duration-300 hover:scale-105">
            <Anchor className="w-5 h-5 text-navy" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Available Berths &amp; Marina Slips
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty text-sm sm:text-base leading-relaxed">
            From cozy marina slips for sailboats to large-capacity berths for
            yachts and commercial vessels. Modern amenities, 24/7 support, and
            real-time availability.
          </p>
        </div>

        {/* Responsive Grid - Single column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-border/40 bg-card/80 backdrop-blur-sm max-w-md mx-auto w-full sm:max-w-none"
              >
                <CardContent className="relative flex flex-col h-full p-5 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-muted animate-pulse" />
                    <div className="w-20 h-6 bg-muted animate-pulse rounded-full" />
                  </div>
                  <div className="w-3/4 h-5 bg-muted animate-pulse rounded my-2" />
                  <div className="w-1/2 h-4 bg-muted animate-pulse rounded mb-4" />

                  <div className="mt-auto">
                    <div className="flex gap-2 mb-4">
                      <div className="w-16 h-5 bg-muted animate-pulse rounded-md" />
                      <div className="w-16 h-5 bg-muted animate-pulse rounded-md" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/30">
                      <div className="w-20 h-5 bg-muted animate-pulse rounded" />
                      <div className="w-20 h-5 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-full py-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/10 mb-4">
                <Ship className="w-6 h-6 text-rose-500" />
              </div>
              <p className="text-rose-600 font-medium">
                Error fetching berths: {error.message}
              </p>
            </div>
          ) : berths && berths.length > 0 ? (
            berths.map((berth, index) => (
              <Card
                key={berth.id}
                className={`group relative overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-navy/10 hover:-translate-y-1 cursor-pointer border-border/40 bg-card/80 backdrop-blur-sm max-w-md mx-auto w-full sm:max-w-none ${
                  index === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="relative flex flex-col h-full p-5 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy/10 text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300 ease-out">
                      <Ship className="w-5 h-5" />
                    </div>
                    <Badge
                      variant="outline"
                      className={`${statusColors[(berth.status as keyof typeof statusColors) || "available"]} font-medium text-xs transition-colors duration-300`}
                    >
                      {
                        statusLabels[
                          (berth.status as keyof typeof statusLabels) ||
                            "available"
                        ]
                      }
                    </Badge>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 tracking-tight group-hover:text-navy transition-colors duration-300">
                    {berth.name}
                  </h3>

                  {/* Price - refined hierarchy */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <Euro className="w-3.5 h-3.5 text-amber self-center" />
                    <span className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                      {berth.price_per_night}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground font-normal">
                      / night
                    </span>
                  </div>

                  <div className="mt-auto">
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {berth.amenities?.slice(0, 3).map((amenity, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-muted/60 text-muted-foreground font-normal text-[10px] sm:text-xs px-2 py-0.5 pointer-events-none border-0"
                        >
                          {amenity}
                        </Badge>
                      ))}
                      {berth.amenities && berth.amenities.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="bg-muted/60 text-muted-foreground font-normal text-[10px] sm:text-xs px-2 py-0.5 pointer-events-none border-0"
                        >
                          +{berth.amenities.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2">
                        <Waves className="w-3.5 h-3.5 text-muted-foreground/70" />
                        <span className="text-xs sm:text-sm">
                          <span className="font-semibold text-foreground">
                            {berth.max_draft}m
                          </span>
                          <span className="text-muted-foreground ml-1">
                            draft
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-3.5 h-3.5 text-muted-foreground/70" />
                        <span className="text-xs sm:text-sm">
                          <span className="font-semibold text-foreground">
                            {berth.max_vessel_length}m
                          </span>
                          <span className="text-muted-foreground ml-1">
                            length
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <Anchor className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                No berths found for this port.
              </p>
            </div>
          )}
        </div>

        {/* Quick Info Bar - Glassmorphism */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-6 rounded-2xl bg-navy/95 backdrop-blur-sm border border-white/10 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber/20">
                <Clock className="w-4 h-4 text-amber" />
              </div>
              <span className="text-white/80 text-sm sm:text-base">
                Real-time updates every{" "}
                <span className="text-amber font-semibold">5 minutes</span>
              </span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                <span className="text-xs sm:text-sm text-white/70">
                  Available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-400 shadow-sm shadow-rose-400/50" />
                <span className="text-xs sm:text-sm text-white/70">
                  Occupied
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber shadow-sm shadow-amber/50" />
                <span className="text-xs sm:text-sm text-white/70">
                  Maintenance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
