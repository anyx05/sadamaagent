"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations("DashboardError")

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          {t("title")}
        </h2>
        <p className="text-sm text-muted-foreground max-w-md">
          {t("description")}
        </p>
      </div>
      <Button
        onClick={reset}
        variant="outline"
        className="gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        {t("tryAgain")}
      </Button>
    </div>
  )
}
