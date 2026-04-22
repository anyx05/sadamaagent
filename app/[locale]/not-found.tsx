import { Link } from "@/i18n/routing"
import { Compass, LayoutDashboard, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function NotFoundPage() {
  const t = useTranslations("NotFound")

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-navy via-navy to-navy-dark px-4 sm:px-6 py-12 overflow-hidden relative">
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan/8 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber/5 via-transparent to-transparent" />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Large 404 typography */}
        <div className="relative mb-8">
          <span className="text-[10rem] sm:text-[12rem] font-bold leading-none text-white/[0.04] select-none block">
            {t("title")}
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-2 bg-cyan/15 rounded-2xl blur-xl" />
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan to-cyan-dark text-white shadow-lg shadow-cyan/25">
                  <Compass className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
          {t("heading")}
        </h1>
        <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-10 max-w-md mx-auto text-pretty">
          {t("description")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto bg-cyan hover:bg-cyan-light text-navy font-semibold px-6 h-12 shadow-lg shadow-cyan/25 transition-all duration-300 hover:-translate-y-0.5">
            <Link href="/dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              {t("dashboardLink")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-white/20 bg-white/[0.05] text-white hover:bg-white/10 hover:border-white/30 hover:text-white px-6 h-12 transition-all duration-300 hover:-translate-y-0.5">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              {t("homeLink")}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
