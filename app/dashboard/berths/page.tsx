import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ship, MapPin, Ruler, Waves, Plus } from "lucide-react"

const berths = [
  {
    id: 1,
    name: "Terminal A - Deep Water",
    location: "Muuga Harbour",
    depth: "16m",
    length: "400m",
    status: "available",
    type: "Container",
    currentVessel: null,
  },
  {
    id: 2,
    name: "Terminal B - Cruise",
    location: "Old City Harbour",
    depth: "12m",
    length: "350m",
    status: "occupied",
    type: "Passenger",
    currentVessel: "SS Nordic Queen",
  },
  {
    id: 3,
    name: "Terminal C - Cargo",
    location: "Paldiski South",
    depth: "14m",
    length: "280m",
    status: "available",
    type: "General Cargo",
    currentVessel: null,
  },
  {
    id: 4,
    name: "Terminal D - RoRo",
    location: "Muuga Harbour",
    depth: "10m",
    length: "220m",
    status: "maintenance",
    type: "RoRo",
    currentVessel: null,
  },
  {
    id: 5,
    name: "Terminal E - Tanker",
    location: "Paldiski North",
    depth: "18m",
    length: "320m",
    status: "occupied",
    type: "Liquid Bulk",
    currentVessel: "MT Fuel Carrier",
  },
  {
    id: 6,
    name: "Terminal F - Yacht",
    location: "Old City Harbour",
    depth: "6m",
    length: "80m",
    status: "available",
    type: "Leisure",
    currentVessel: null,
  },
]

const statusColors = {
  available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  occupied: "bg-navy/10 text-navy border-navy/20",
  maintenance: "bg-amber/10 text-amber border-amber/20",
}

const statusLabels = {
  available: "Available",
  occupied: "Occupied",
  maintenance: "Maintenance",
}

export default function BerthsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Berths</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all berth facilities
          </p>
        </div>
        <Button className="bg-navy hover:bg-navy-light text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Berth
        </Button>
      </div>

      {/* Berths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {berths.map((berth) => (
          <Card 
            key={berth.id}
            className="hover:shadow-md transition-all cursor-pointer group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy/10 text-navy group-hover:bg-navy group-hover:text-white transition-colors">
                    <Ship className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{berth.name}</CardTitle>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {berth.location}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="outline"
                  className={statusColors[berth.status as keyof typeof statusColors]}
                >
                  {statusLabels[berth.status as keyof typeof statusLabels]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {berth.type}
                </p>
                {berth.currentVessel ? (
                  <p className="text-sm font-medium text-foreground">
                    {berth.currentVessel}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No vessel docked
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
