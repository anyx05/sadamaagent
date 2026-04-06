"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ship, MoreHorizontal, Calendar, MapPin } from "lucide-react"

const bookings = [
  {
    id: "BK-2024-001",
    vessel: "MV Baltic Star",
    berth: "Terminal A - Deep Water",
    arrival: "2024-03-15 08:00",
    departure: "2024-03-17 16:00",
    status: "confirmed",
    type: "Container",
  },
  {
    id: "BK-2024-002",
    vessel: "SS Nordic Queen",
    berth: "Terminal B - Cruise",
    arrival: "2024-03-16 06:00",
    departure: "2024-03-16 22:00",
    status: "pending",
    type: "Passenger",
  },
  {
    id: "BK-2024-003",
    vessel: "MV Cargo Express",
    berth: "Terminal C - Cargo",
    arrival: "2024-03-18 14:00",
    departure: "2024-03-20 10:00",
    status: "confirmed",
    type: "General Cargo",
  },
  {
    id: "BK-2024-004",
    vessel: "MT Fuel Carrier",
    berth: "Terminal E - Tanker",
    arrival: "2024-03-19 12:00",
    departure: "2024-03-21 08:00",
    status: "in-progress",
    type: "Liquid Bulk",
  },
  {
    id: "BK-2024-005",
    vessel: "SY Ocean Breeze",
    berth: "Terminal F - Yacht",
    arrival: "2024-03-20 10:00",
    departure: "2024-03-25 18:00",
    status: "pending",
    type: "Leisure",
  },
]

const statusStyles = {
  confirmed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  pending: "bg-amber/10 text-amber border-amber/20",
  "in-progress": "bg-navy/10 text-navy border-navy/20",
  cancelled: "bg-rose-500/10 text-rose-600 border-rose-500/20",
}

const statusLabels = {
  confirmed: "Confirmed",
  pending: "Pending",
  "in-progress": "In Progress",
  cancelled: "Cancelled",
}

export function BookingsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Bookings</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Vessel
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Berth
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                  Schedule
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((booking) => (
                <tr 
                  key={booking.id}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-foreground">
                      {booking.id}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy/10 text-navy">
                        <Ship className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {booking.vessel}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.type}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {booking.berth}
                    </div>
                  </td>
                  <td className="py-4 px-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{booking.arrival.split(" ")[0]}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge 
                      variant="outline"
                      className={statusStyles[booking.status as keyof typeof statusStyles]}
                    >
                      {statusLabels[booking.status as keyof typeof statusLabels]}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
