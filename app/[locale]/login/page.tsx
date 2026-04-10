"use client"

import { useState } from "react"
import { Link, useRouter } from "@/i18n/routing"
import { Anchor, ArrowLeft, Eye, EyeOff, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"
import { useTranslations } from "next-intl"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const supabase = createClient()
  const t = useTranslations("Auth")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
      setIsLoading(false)
    } else {
      toast.success(t("success"))
      router.push("/dashboard")
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
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          {t("back")}
        </Link>

        {/* Glassmorphism Card */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan/20 via-cyan/10 to-cyan/20 rounded-3xl blur-xl opacity-50" />
          
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
            {/* Header */}
            <div className="text-center pt-8 pb-4 px-8">
              {/* Logo */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-cyan/20 rounded-2xl blur-lg" />
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan to-cyan-dark text-white shadow-lg shadow-cyan/30">
                    <Anchor className="w-8 h-8" />
                  </div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {t("title")}
              </h1>
              <p className="text-white/50 text-sm mt-2">
                {t("subtitle")}
              </p>
            </div>

            {/* Form */}
            <div className="px-8 pb-8">
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email" className="text-white/70 text-sm font-medium">
                      {t("emailLabel")}
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      className="h-12 bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 focus:border-cyan focus:ring-cyan/20 transition-all duration-300"
                      autoComplete="email"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password" className="text-white/70 text-sm font-medium">
                      {t("passwordLabel")}
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("passwordPlaceholder")}
                        className="h-12 bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 pr-12 focus:border-cyan focus:ring-cyan/20 transition-all duration-300"
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-300"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </Field>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan focus:ring-cyan/30"
                      />
                      <span className="text-white/50 group-hover:text-white/70 transition-colors">{t("remember")}</span>
                    </label>
                    <Link 
                      href="#" 
                      className="text-cyan hover:text-cyan-light transition-colors duration-300 font-medium"
                    >
                      {t("forgot")}
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-cyan to-cyan-dark hover:from-cyan-light hover:to-cyan text-white font-semibold shadow-lg shadow-cyan/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan/30"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t("authenticating")}
                      </span>
                    ) : (
                      t("signInBtn")
                    )}
                  </Button>
                </FieldGroup>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-3 text-white/30 backdrop-blur-sm">
                    {t("or")}
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-3 gap-3">
                {/* Google */}
                <Button 
                  type="button"
                  variant="outline" 
                  className="h-11 bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 cursor-pointer" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  <span className="sr-only">Sign in with Google</span>
                </Button>
                {/* Apple */}
                <Button 
                  type="button"
                  variant="outline" 
                  className="h-11 bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 cursor-pointer" viewBox="0 0 384 512">
                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  <span className="sr-only">Sign in with Apple</span>
                </Button>
                {/* Facebook */}
                <Button 
                  type="button"
                  variant="outline" 
                  className="h-11 bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.08] hover:text-white hover:border-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5 cursor-pointer" viewBox="0 0 320 512">
                    <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                  <span className="sr-only">Sign in with Facebook</span>
                </Button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-white/40 mt-8">
                {t("noAccount")}{" "}
                <Link 
                  href="/signup" 
                  className="text-cyan hover:text-cyan-light transition-colors duration-300 font-medium"
                >
                  {t("createAccount")}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Terminal className="w-3.5 h-3.5 text-cyan/50" />
          <p className="text-xs text-white/30">
            {t("securityNotice")}
          </p>
        </div>
      </div>
    </main>
  )
}
