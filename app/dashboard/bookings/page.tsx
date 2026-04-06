import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ship, Calendar, MapPin, Plus, Clock, Filter } from "lucide-react"

const bookings = [
  {
    id: "BK-2024-001",
    vessel: "MV Baltic Star",
    imo: "9876543",
    berth: "Terminal A - Deep Water",
    arrival: "2024-03-15 08:00",
    departure: "2024-03-17 16:00",
    status: "confirmed",
    type: "Container",
    captain: "Erik Hansen",
  },
  {
    id: "BK-2024-002",
    vessel: "SS Nordic Queen",
    imo: "9123456",
    berth: "Terminal B - Cruise",
    arrival: "2024-03-16 06:00",
    departure: "2024-03-16 22:00",
    status: "pending",
    type: "Passenger",
    captain: "Maria Lindgren",
  },
  {
    id: "BK-2024-003",
    vessel: "MV Cargo Express",
    imo: "9234567",
    berth: "Terminal C - Cargo",
    arrival: "2024-03-18 14:00",
    departure: "2024-03-20 10:00",
    status: "confirmed",
    type: "General Cargo",
    captain: "Jonas Eriksson",
  },
  {
    id: "BK-2024-004",
    vessel: "MT Fuel Carrier",
    imo: "9345678",
    berth: "Terminal E - Tanker",
    arrival: "2024-03-19 12:00",
    departure: "2024-03-21 08:00",
    status: "in-progress",
    type: "Liquid Bulk",
    captain: "Anna Kowalski",
  },
  {
    id: "BK-2024-005",
    vessel: "SY Ocean Breeze",
    imo: "9456789",
    berth: "Terminal F - Yacht",
    arrival: "2024-03-20 10:00",
    departure: "2024-03-25 18:00",
    status: "pending",
    type: "Leisure",
    captain: "Peter Mägi",
  },
  {
    id: "BK-2024-006",
    vessel: "MV Northern Light",
    imo: "9567890",
    berth: "Terminal A - Deep Water",
    arrival: "2024-03-22 09:00",
    departure: "2024-03-24 15:00",
    status: "confirmed",
    type: "Container",
    captain: "Lars Svensson",
  },
]

const statusColors = {
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

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
          <p className="text-muted-foreground mt-1">
            Manage berth reservations and vessel schedules
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-navy hover:bg-navy-light text-white" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">Total Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-emerald-600">6</p>
            <p className="text-sm text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-amber">4</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-navy">2</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card 
            key={booking.id}
            className="hover:shadow-md transition-all cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Vessel Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-navy/10 text-navy">
                    <Ship className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">
                        {booking.vessel}
                      </h3>
                      <Badge 
                        variant="outline"
                        className={statusColors[booking.status as keyof typeof statusColors]}
                      >
                        {statusLabels[booking.status as keyof typeof statusLabels]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      IMO: {booking.imo} &bull; {booking.type} &bull; Capt. {booking.captain}
                    </p>
                  </div>
                </div>

                {/* Berth */}
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{booking.berth}</span>
                </div>

                {/* Schedule */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">
                      {booking.arrival.split(" ")[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {booking.arrival.split(" ")[1]} - {booking.departure.split(" ")[1]}
                    </span>
                  </div>
                </div>

                {/* Booking ID */}
                <div className="text-sm font-mono text-muted-foreground">
                  {booking.id}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
