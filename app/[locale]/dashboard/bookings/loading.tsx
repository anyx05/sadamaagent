export default function BookingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-36 bg-muted rounded-lg" />
          <div className="h-4 w-72 bg-muted rounded mt-2" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-muted rounded-lg" />
          <div className="h-9 w-32 bg-muted rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-muted/50" />
        ))}
      </div>
      <div className="rounded-xl bg-muted/50 h-[400px]" />
    </div>
  )
}
