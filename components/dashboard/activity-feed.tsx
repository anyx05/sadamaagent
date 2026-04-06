import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, Calendar, CheckCircle2, AlertCircle, Anchor } from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    type: "arrival",
    title: "MV Baltic Star arrived",
    description: "Docked at Terminal A - Deep Water",
    time: "2 hours ago",
    icon: Ship,
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: 2,
    type: "booking",
    title: "New booking confirmed",
    description: "SS Nordic Queen - Terminal B",
    time: "4 hours ago",
    icon: Calendar,
    iconBg: "bg-navy/10 text-navy",
  },
  {
    id: 3,
    type: "completed",
    title: "Departure completed",
    description: "MV Cargo Handler left Terminal C",
    time: "6 hours ago",
    icon: CheckCircle2,
    iconBg: "bg-amber/10 text-amber",
  },
  {
    id: 4,
    type: "alert",
    title: "Maintenance scheduled",
    description: "Terminal D - RoRo requires inspection",
    time: "8 hours ago",
    icon: AlertCircle,
    iconBg: "bg-rose-500/10 text-rose-600",
  },
  {
    id: 5,
    type: "berth",
    title: "Berth assigned",
    description: "MT Fuel Carrier assigned to Terminal E",
    time: "12 hours ago",
    icon: Anchor,
    iconBg: "bg-navy/10 text-navy",
  },
]

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={activity.id}
              className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className={cn(
                "flex items-center justify-center w-9 h-9 rounded-full shrink-0",
                activity.iconBg
              )}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
