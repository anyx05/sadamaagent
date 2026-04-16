"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Anchor, MapPin, Ship, Mail, ChevronRight } from "lucide-react"
import { usePublicPortsAndBerths, PublicPort } from "@/lib/queries/public"
import { useTranslations } from "next-intl"

export function FeaturedPorts() {
  const { data, isLoading, error } = usePublicPortsAndBerths()
  const t = useTranslations("FeaturedPorts")

  const ports = data?.ports ?? []

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan/10 mb-4 transition-transform duration-300 hover:scale-105">
            <MapPin className="w-5 h-5 text-cyan" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty text-sm sm:text-base leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Ports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="border-border/40 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted animate-pulse" />
                    <div className="flex-1 space-y-3">
                      <div className="w-3/4 h-5 bg-muted animate-pulse rounded" />
                      <div className="w-1/2 h-4 bg-muted animate-pulse rounded" />
                      <div className="w-full h-12 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-full py-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/10 mb-4">
                <Anchor className="w-6 h-6 text-rose-500" />
              </div>
              <p className="text-rose-600 font-medium">
                {t("error")} {error.message}
              </p>
            </div>
          ) : ports.length > 0 ? (
            ports.map((port) => (
              <PortCard key={port.id} port={port} t={t} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <MapPin className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">{t("empty")}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function PortCard({ port, t }: { port: PublicPort; t: any }) {
  const availableCount = port.berths.filter(b => b.status === 'available').length
  const totalCount = port.berths.length

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-navy/10 hover:-translate-y-1 border-border/40 bg-card/80 backdrop-blur-sm">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan via-cyan-light to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Port Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-navy/10 text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300 ease-out shrink-0">
            <Anchor className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Port Name */}
            <h3 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-navy transition-colors duration-300">
              {port.name}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{port.location}</span>
            </div>

            {/* Description */}
            {port.description && (
              <p className="mt-3 text-sm text-muted-foreground/80 leading-relaxed line-clamp-2">
                {port.description}
              </p>
            )}

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-medium text-xs"
              >
                <Ship className="w-3 h-3 mr-1" />
                {availableCount} {t("available")}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {totalCount} {t("berthsTotal")}
              </span>
              <div className="flex items-center gap-1.5 ml-auto">
                <Mail className="w-3.5 h-3.5 text-muted-foreground/60" />
                <span className="text-xs text-muted-foreground/60 hidden sm:inline">
                  {port.contact_email}
                </span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#berths"
              className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-cyan hover:text-cyan-dark transition-colors"
            >
              {t("viewBerths")}
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
