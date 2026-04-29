"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Link } from "@/i18n/routing"
import { ArrowLeft, Mail, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"

export default function CheckEmailPage() {
  const [countdown, setCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const t = useTranslations("CheckEmail")

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResend = async () => {
    if (!email) {
      toast.error(t("noEmail"))
      return
    }

    setIsResending(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      }
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success(t("resendSuccess"))
      setCountdown(60)
    }
    setIsResending(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-navy px-4 sm:px-6 py-12 overflow-hidden relative">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-navy via-slate to-navy-dark" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan/10 via-transparent to-transparent" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <Link
            href="/login"
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t("backToSignIn")}
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan/20 via-cyan/5 to-transparent rounded-2xl blur-xl" />

          <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-8 text-center">
            {/* Icon */}
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-2 bg-cyan/20 rounded-full blur-lg" />
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan to-cyan-dark text-white shadow-lg shadow-cyan/30 mx-auto">
                <Mail className="w-10 h-10" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              {t("title")}
            </h1>
            <p className="text-white/50 text-sm mb-8 whitespace-pre-line">
              {t("description")}
            </p>

            {/* Email Provider Links */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors">
                <span className="text-sm font-medium text-white/80">Gmail</span>
              </a>
              <a href="https://outlook.live.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors">
                <span className="text-sm font-medium text-white/80">Outlook</span>
              </a>
              <a href="https://mail.yahoo.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors">
                <span className="text-sm font-medium text-white/80">Yahoo</span>
              </a>
            </div>

            {/* Resend Action */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-white/40 mb-4">{t("didntReceive")}</p>
              <Button
                variant="outline"
                onClick={handleResend}
                disabled={countdown > 0 || isResending}
                className="w-full bg-white/[0.05] border-white/10 hover:bg-white/[0.1] text-white disabled:opacity-50"
              >
                {isResending ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Mail className="w-4 h-4 mr-2" />
                )}
                {countdown > 0 ? t("resendIn", { seconds: countdown }) : t("resendNow")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
