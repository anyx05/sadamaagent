export default function SettingsLoading() {
  return (
    <div className="space-y-6 max-w-4xl animate-pulse">
      <div>
        <div className="h-8 w-40 bg-muted rounded-lg" />
        <div className="h-4 w-80 bg-muted rounded mt-2" />
      </div>
      <div className="h-[400px] rounded-xl bg-muted/50" />
      <div className="h-[250px] rounded-xl bg-muted/50" />
      <div className="h-[200px] rounded-xl bg-muted/50" />
    </div>
  )
}
