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
import { Ship, Plus, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dummy berth data for presentation
const berths = [
  {
    id: 1,
    name: "Marina Slip A-01",
    length: 12,
    draft: 2.5,
    price: 45,
    status: "available",
  },
  {
    id: 2,
    name: "Marina Slip A-02",
    length: 15,
    draft: 3.0,
    price: 55,
    status: "occupied",
  },
  {
    id: 3,
    name: "Yacht Berth B-01",
    length: 20,
    draft: 4.0,
    price: 85,
    status: "available",
  },
  {
    id: 4,
    name: "Yacht Berth B-02",
    length: 25,
    draft: 4.5,
    price: 110,
    status: "maintenance",
  },
  {
    id: 5,
    name: "Commercial Berth C-01",
    length: 40,
    draft: 6.0,
    price: 180,
    status: "occupied",
  },
  {
    id: 6,
    name: "Commercial Berth C-02",
    length: 50,
    draft: 8.0,
    price: 250,
    status: "available",
  },
  {
    id: 7,
    name: "Small Craft Slip D-01",
    length: 8,
    draft: 1.5,
    price: 25,
    status: "available",
  },
  {
    id: 8,
    name: "Small Craft Slip D-02",
    length: 8,
    draft: 1.5,
    price: 25,
    status: "occupied",
  },
]

const statusConfig = {
  available: {
    label: "Available",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/15",
  },
  occupied: {
    label: "Occupied",
    className: "bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/15",
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-amber/10 text-amber border-amber/20 hover:bg-amber/15",
  },
}

export default function BerthsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Berth Manager
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage marina slips and berth facilities
          </p>
        </div>
        <Button className="bg-navy hover:bg-navy-light text-white shadow-md shadow-navy/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy/30">
          <Plus className="w-4 h-4 mr-2" />
          Add New Berth
        </Button>
      </div>

      {/* Data Table Card */}
      <Card className="border-border/40 bg-card/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy/10 text-navy">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">All Berths</CardTitle>
              <CardDescription>
                {berths.length} berths across all facilities
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="pl-6">Name</TableHead>
                <TableHead className="text-right">Length (m)</TableHead>
                <TableHead className="text-right">Draft (m)</TableHead>
                <TableHead className="text-right">Price/Night</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {berths.map((berth) => {
                const status = statusConfig[berth.status as keyof typeof statusConfig]
                return (
                  <TableRow
                    key={berth.id}
                    className="group hover:bg-muted/30 transition-colors border-border/30"
                  >
                    <TableCell className="pl-6 font-medium text-foreground">
                      {berth.name}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {berth.length}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {berth.draft}
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      &euro;{berth.price}
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
                            Edit Berth
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {/* Table Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border/30 bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{berths.length}</span> of{" "}
              <span className="font-medium text-foreground">{berths.length}</span> berths
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {berths.filter((b) => b.status === "available").length} Available
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                {berths.filter((b) => b.status === "occupied").length} Occupied
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-amber" />
                {berths.filter((b) => b.status === "maintenance").length} Maintenance
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
