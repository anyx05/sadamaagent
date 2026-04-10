"use client"

import { useState } from "react"
import { Link, useRouter } from "@/i18n/routing"
import { Anchor, ArrowLeft, Eye, EyeOff, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"
import { useTranslations } from "next-intl"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()
  const supabase = createClient()
  const t = useTranslations("SignUp")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error(t("mismatch"))
      return
    }

    setIsLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    if (error) {
      toast.error(error.message)
      setIsLoading(false)
    } else {
      toast.success(t("success"))
      router.push("/login")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-navy px-4 sm:px-6 py-12 overflow-hidden relative">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-navy via-slate to-navy-dark" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan/10 via-transparent to-transparent" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan/5 via-transparent to-transparent" />

      {/* Grid Pattern Overlay */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <Link
            href="/"
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t("back")}
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Card */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan/20 via-cyan/5 to-transparent rounded-2xl blur-xl" />

          <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-8">
            {/* Logo + Title */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-cyan/20 rounded-2xl blur-lg" />
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan to-cyan-dark text-white shadow-lg shadow-cyan/30 mx-auto">
                  <Anchor className="w-8 h-8" />
                </div>
              </div>
              <h1 className="mt-6 text-2xl font-bold text-white">
                {t("title")}
              </h1>
              <p className="mt-2 text-white/50 text-sm">
                {t("subtitle")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name" className="text-white/70 text-sm">
                    {t("nameLabel")}
                  </FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("namePlaceholder")}
                    required
                    className="h-11 bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 focus:border-cyan focus:ring-cyan/20"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email" className="text-white/70 text-sm">
                    {t("emailLabel")}
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    required
                    className="h-11 bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 focus:border-cyan focus:ring-cyan/20"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password" className="text-white/70 text-sm">
                    {t("passwordLabel")}
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("passwordPlaceholder")}
                      required
                      className="h-11 pr-10 bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 focus:border-cyan focus:ring-cyan/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword" className="text-white/70 text-sm">
                    {t("confirmLabel")}
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t("confirmPlaceholder")}
                    required
                    className="h-11 bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 focus:border-cyan focus:ring-cyan/20"
                  />
                </Field>
              </FieldGroup>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-cyan to-cyan-dark hover:from-cyan-light hover:to-cyan text-navy font-semibold shadow-lg shadow-cyan/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                    {t("creating")}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    {t("signUpBtn")}
                  </span>
                )}
              </Button>
            </form>

            {/* Footer Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-white/40">
                {t("hasAccount")}{" "}
                <Link
                  href="/login"
                  className="text-cyan hover:text-cyan-light transition-colors font-medium"
                >
                  {t("signIn")}
                </Link>
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-white/25 text-xs">
              <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              {t("securityNotice")}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
