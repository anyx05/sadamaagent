import { Ship, Anchor, Calendar, TrendingUp } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { BookingsTable } from "@/components/dashboard/bookings-table"
import { ActivityFeed } from "@/components/dashboard/activity-feed"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your harbour operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Berths"
          value="24"
          change="+2 new this month"
          changeType="positive"
          icon={Anchor}
          iconColor="bg-navy/10 text-navy"
        />
        <StatsCard
          title="Active Vessels"
          value="8"
          change="3 arriving today"
          changeType="neutral"
          icon={Ship}
          iconColor="bg-amber/10 text-amber"
        />
        <StatsCard
          title="Bookings This Week"
          value="42"
          change="+15% from last week"
          changeType="positive"
          icon={Calendar}
          iconColor="bg-emerald-500/10 text-emerald-600"
        />
        <StatsCard
          title="Occupancy Rate"
          value="87%"
          change="+5% from yesterday"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-navy/10 text-navy"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BookingsTable />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
