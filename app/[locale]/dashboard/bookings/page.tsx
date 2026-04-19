"use client"

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
import { Calendar, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useBookings, useCancelBooking } from "@/lib/queries/bookings"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

function formatDate(dateStr: string) {
  if (!dateStr) return "N/A"
  return new Date(dateStr).toLocaleDateString("en-EE", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function BookingsPage() {
  const { data: bookings = [], isLoading } = useBookings()
  const cancelBooking = useCancelBooking()
  const t = useTranslations("BookingsPage")

  const handleCancel = (bookingId: string, customerName: string) => {
    cancelBooking.mutate(bookingId, {
      onSuccess: () => toast.success(`Booking for ${customerName} cancelled.`),
      onError: (err) => toast.error(`Failed to cancel: ${err.message}`),
    })
  }

  const statusConfig = {
    confirmed: {
      label: t("confirmed"),
      className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    pending: {
      label: t("pending"),
      className: "bg-amber/10 text-amber border-amber/20",
    },
    "in-progress": {
      label: t("inProgress"),
      className: "bg-cyan/10 text-cyan border-cyan/20",
    },
    cancelled: {
      label: t("cancelled"),
      className: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    },
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Summary Cards - Glassmorphism */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: t("totalBookings"), value: bookings.length, color: "text-foreground" },
          { label: t("confirmed"), value: bookings.filter(b => b.status === "confirmed").length, color: "text-emerald-600" },
          { label: t("pending"), value: bookings.filter(b => b.status === "pending").length, color: "text-amber" },
          { label: t("inProgress"), value: bookings.filter(b => b.status === "in-progress").length, color: "text-cyan" },
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
              <CardTitle className="text-lg">{t("allBookings")}</CardTitle>
              <CardDescription>
                {bookings.length} {t("reservationsTotal")}
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
                  <TableHead className="pl-6">{t("customerName")}</TableHead>
                  <TableHead>{t("arrival")}</TableHead>
                  <TableHead>{t("departure")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead className="pr-6 text-right">{t("actions")}</TableHead>
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
                              {t("viewDetails")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="w-4 h-4 mr-2" />
                              {t("editBooking")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleCancel(booking.id, booking.customerName)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              {t("cancel")}
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
                      <p className="text-muted-foreground text-xs">{t("arrival")}</p>
                      <p className="font-medium tabular-nums">{formatDate(booking.arrival)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{t("departure")}</p>
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
              {t("showing")} <span className="font-medium text-foreground">{bookings.length}</span> {t("allBookings").toLowerCase()}
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
