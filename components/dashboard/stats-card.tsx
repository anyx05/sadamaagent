import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  iconColor?: string
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "bg-cyan/10 text-cyan",
}: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group border-border/50">
      {/* Left accent bar */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300",
        changeType === "positive" && "bg-emerald-500",
        changeType === "negative" && "bg-rose-500",
        changeType === "neutral" && "bg-cyan/60",
      )} />
      <CardContent className="p-6 pl-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {value}
            </p>
            {change && (
              <p className={cn(
                "text-xs mt-1 font-medium",
                changeType === "positive" && "text-emerald-600",
                changeType === "negative" && "text-rose-600",
                changeType === "neutral" && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={cn(
            "flex items-center justify-center w-11 h-11 rounded-xl transition-transform duration-300 group-hover:scale-110",
            iconColor
          )}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
