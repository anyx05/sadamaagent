export default function BerthsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-40 bg-muted rounded-lg" />
          <div className="h-4 w-64 bg-muted rounded mt-2" />
        </div>
        <div className="h-10 w-36 bg-muted rounded-lg" />
      </div>
      <div className="rounded-xl bg-muted/50 h-[500px]" />
    </div>
  )
}
