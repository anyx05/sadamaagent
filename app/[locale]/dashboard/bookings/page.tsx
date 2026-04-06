import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar, Plus, Filter, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Operator-focused booking data
const bookings = [
  {
    id: "BK-2026-001",
    customerName: "Erik Hansen",
    vessel: "SY Nordic Wind",
    arrival: "2026-04-08",
    departure: "2026-04-12",
    status: "confirmed",
  },
  {
    id: "BK-2026-002",
    customerName: "Maria Lindgren",
    vessel: "MY Sea Breeze",
    arrival: "2026-04-10",
    departure: "2026-04-15",
    status: "pending",
  },
  {
    id: "BK-2026-003",
    customerName: "Jonas Eriksson",
    vessel: "SY Baltic Star",
    arrival: "2026-04-12",
    departure: "2026-04-14",
    status: "confirmed",
  },
  {
    id: "BK-2026-004",
    customerName: "Anna Kowalski",
    vessel: "MY Coastal Dream",
    arrival: "2026-04-14",
    departure: "2026-04-20",
    status: "in-progress",
  },
  {
    id: "BK-2026-005",
    customerName: "Peter Mägi",
    vessel: "SY Ocean Pearl",
    arrival: "2026-04-16",
    departure: "2026-04-18",
    status: "pending",
  },
  {
    id: "BK-2026-006",
    customerName: "Lars Svensson",
    vessel: "MY Northern Light",
    arrival: "2026-04-18",
    departure: "2026-04-25",
    status: "confirmed",
  },
  {
    id: "BK-2026-007",
    customerName: "Katrin Tamm",
    vessel: "SY Estonian Pride",
    arrival: "2026-04-20",
    departure: "2026-04-22",
    status: "cancelled",
  },
  {
    id: "BK-2026-008",
    customerName: "Jaan Rebane",
    vessel: "MY Wave Rider",
    arrival: "2026-04-22",
    departure: "2026-04-28",
    status: "confirmed",
  },
]

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    className: "bg-amber/10 text-amber border-amber/20",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-cyan/10 text-cyan border-cyan/20",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-EE", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Bookings</h1>
          <p className="text-muted-foreground mt-1">
            Manage berth reservations and customer schedules
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm" className="border-border/50 hover:bg-muted/50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-navy hover:bg-navy-light text-white shadow-md shadow-navy/20 transition-all duration-300 hover:-translate-y-0.5" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Summary Cards - Glassmorphism */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Bookings", value: bookings.length, color: "text-foreground" },
          { label: "Confirmed", value: bookings.filter(b => b.status === "confirmed").length, color: "text-emerald-600" },
          { label: "Pending", value: bookings.filter(b => b.status === "pending").length, color: "text-amber" },
          { label: "In Progress", value: bookings.filter(b => b.status === "in-progress").length, color: "text-cyan" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card/80 backdrop-blur-sm border-border/40">
            <CardContent className="p-4">
              <p className={`text-2xl font-bold tabular-nums ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Table Card */}
      <Card className="border-border/40 bg-card/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan/10 text-cyan">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">All Bookings</CardTitle>
              <CardDescription>
                {bookings.length} reservations total
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {/* Desktop Table */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="pl-6">Customer Name</TableHead>
                  <TableHead>Arrival</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => {
                  const status = statusConfig[booking.status as keyof typeof statusConfig]
                  return (
                    <TableRow
                      key={booking.id}
                      className="group hover:bg-muted/30 transition-colors border-border/30"
                    >
                      <TableCell className="pl-6">
                        <div>
                          <p className="font-medium text-foreground">{booking.customerName}</p>
                          <p className="text-xs text-muted-foreground">{booking.vessel}</p>
                        </div>
                      </TableCell>
                      <TableCell className="tabular-nums text-foreground">
                        {formatDate(booking.arrival)}
                      </TableCell>
                      <TableCell className="tabular-nums text-foreground">
                        {formatDate(booking.departure)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={status.className}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="w-4 h-4 mr-2" />
                              Edit Booking
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-border/30">
            {bookings.map((booking) => {
              const status = statusConfig[booking.status as keyof typeof statusConfig]
              return (
                <div key={booking.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{booking.customerName}</p>
                      <p className="text-xs text-muted-foreground">{booking.vessel}</p>
                    </div>
                    <Badge variant="outline" className={status.className}>
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Arrival</p>
                      <p className="font-medium tabular-nums">{formatDate(booking.arrival)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Departure</p>
                      <p className="font-medium tabular-nums">{formatDate(booking.departure)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Table Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-border/30 bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{bookings.length}</span> bookings
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              {Object.entries(statusConfig).slice(0, 3).map(([key, config]) => (
                <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className={`w-2 h-2 rounded-full ${
                    key === "confirmed" ? "bg-emerald-500" : 
                    key === "pending" ? "bg-amber" : "bg-cyan"
                  }`} />
                  {bookings.filter(b => b.status === key).length} {config.label}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
