export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin" />
        <p className="text-white/50 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
