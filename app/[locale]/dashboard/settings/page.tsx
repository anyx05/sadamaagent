"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { User, Building, Bell, Shield, Bot, Sparkles, Globe, Zap, Code } from "lucide-react"

import { useEffect } from "react"
import { useAgentSettings, useUpdateAgentSettings } from "@/lib/queries/settings"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

export default function SettingsPage() {
  const { data: settings, isLoading } = useAgentSettings()
  const { mutate: updateSettings, isPending: isSaving } = useUpdateAgentSettings()
  const t = useTranslations("SettingsPage")

  const [systemPrompt, setSystemPrompt] = useState("")
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    if (settings) {
      setSystemPrompt(settings.systemPrompt)
      setLanguage(settings.language)
    }
  }, [settings])

  const handleSaveSettings = () => {
    updateSettings({
      systemPrompt,
      language
    }, {
      onSuccess: () => {
        toast.success(t("saveSuccess"))
      },
      onError: (err) => {
        toast.error(t("saveError") + err.message)
      }
    })
  }

  const [notifications, setNotifications] = useState({
    bookings: true,
    arrivals: true,
    maintenance: false,
    reports: true,
  })
  const [aiFeatures, setAiFeatures] = useState({
    streaming: true,
    codeHighlight: true,
    autoSuggest: false,
  })

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("subtitle")}
        </p>
      </div>

      {/* AI Configuration - Premium Glassmorphism Card */}
      <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-navy/95 to-slate/95 backdrop-blur-xl shadow-2xl">
        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-32 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-24 bg-cyan/5 rounded-full blur-2xl pointer-events-none" />
        
        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-cyan/20 rounded-xl blur-md" />
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan to-cyan-dark text-white shadow-lg shadow-cyan/30">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                {t("aiConfig")}
                <Sparkles className="w-4 h-4 text-cyan" />
              </CardTitle>
              <CardDescription className="text-white/50">
                {t("aiConfigDesc")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-6">
          {/* System Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="systemPrompt" className="text-sm font-medium text-white/80">
                {t("systemPrompt")}
              </Label>
              <span className="text-xs text-white/40 font-mono">
                {systemPrompt.length} {t("chars")}
              </span>
            </div>
            <Textarea
              id="systemPrompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder={t("systemPromptPlaceholder")}
              className="min-h-[180px] resize-y bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 focus:border-cyan focus:ring-cyan/20 font-mono text-sm"
            />
            <p className="text-xs text-white/40">
              {t("systemPromptHelp")}
            </p>
          </div>

          {/* Language & AI Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Default Language */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-white/80 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan/70" />
                {t("defaultLanguage")}
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-white/[0.05] border-white/10 text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="et">Eesti (Estonian)</SelectItem>
                  <SelectItem value="ru">Русский (Russian)</SelectItem>
                  <SelectItem value="fi">Suomi (Finnish)</SelectItem>
                  <SelectItem value="sv">Svenska (Swedish)</SelectItem>
                  <SelectItem value="de">Deutsch (German)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* AI Model (display only) */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-white/80 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan/70" />
                {t("aiModel")}
              </Label>
              <div className="h-10 px-3 flex items-center rounded-md bg-white/[0.05] border border-white/10 text-white/70 text-sm">
                gpt-4-turbo-preview
              </div>
            </div>
          </div>

          {/* AI Feature Toggles */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <p className="text-xs uppercase tracking-wider text-white/30 font-medium">{t("aiFeatures")}</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-cyan/50" />
                  <div>
                    <p className="text-sm font-medium text-white/80">{t("streaming")}</p>
                    <p className="text-xs text-white/40">{t("streamingDesc")}</p>
                  </div>
                </div>
                <Switch
                  checked={aiFeatures.streaming}
                  onCheckedChange={(checked) => setAiFeatures(prev => ({ ...prev, streaming: checked }))}
                  className="data-[state=checked]:bg-cyan"
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Code className="w-4 h-4 text-cyan/50" />
                  <div>
                    <p className="text-sm font-medium text-white/80">{t("codeHighlight")}</p>
                    <p className="text-xs text-white/40">{t("codeHighlightDesc")}</p>
                  </div>
                </div>
                <Switch
                  checked={aiFeatures.codeHighlight}
                  onCheckedChange={(checked) => setAiFeatures(prev => ({ ...prev, codeHighlight: checked }))}
                  className="data-[state=checked]:bg-cyan"
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-cyan/50" />
                  <div>
                    <p className="text-sm font-medium text-white/80">{t("autoSuggest")}</p>
                    <p className="text-xs text-white/40">{t("autoSuggestDesc")}</p>
                  </div>
                </div>
                <Switch
                  checked={aiFeatures.autoSuggest}
                  onCheckedChange={(checked) => setAiFeatures(prev => ({ ...prev, autoSuggest: checked }))}
                  className="data-[state=checked]:bg-cyan"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <Button 
              onClick={handleSaveSettings}
              disabled={isSaving || isLoading}
              className="bg-cyan hover:bg-cyan-light text-navy font-semibold shadow-lg shadow-cyan/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              {isSaving ? t("saving") : t("saveAiSettings")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan/10 text-cyan">
              <User className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{t("profileTitle")}</CardTitle>
              <CardDescription>
                {t("profileDesc")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel htmlFor="firstName">{t("firstName")}</FieldLabel>
                <Input id="firstName" defaultValue="Captain" className="h-10" />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">{t("lastName")}</FieldLabel>
                <Input id="lastName" defaultValue="Admin" className="h-10" />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
              <Input 
                id="email" 
                type="email" 
                defaultValue="admin@maritime.ee" 
                className="h-10" 
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">{t("phone")}</FieldLabel>
              <Input 
                id="phone" 
                type="tel" 
                defaultValue="+372 5555 1234" 
                className="h-10" 
              />
            </Field>
          </FieldGroup>
          <div className="flex justify-end mt-6">
            <Button className="bg-navy hover:bg-navy-light text-white">
              {t("saveChanges")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Organization Settings */}
      <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber/10 text-amber">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{t("orgTitle")}</CardTitle>
              <CardDescription>
                {t("orgDesc")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="orgName">{t("orgName")}</FieldLabel>
              <Input 
                id="orgName" 
                defaultValue="Tallinn Marina Authority" 
                className="h-10" 
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="timezone">{t("timezone")}</FieldLabel>
              <Input 
                id="timezone" 
                defaultValue="Europe/Tallinn (EET)" 
                className="h-10" 
                readOnly
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Notification Settings - Using Switch Component */}
      <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{t("notifTitle")}</CardTitle>
              <CardDescription>
                {t("notifDesc")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {[
              { key: "bookings", label: t("notifBookings"), description: t("notifBookingsDesc") },
              { key: "arrivals", label: t("notifArrivals"), description: t("notifArrivalsDesc") },
              { key: "maintenance", label: t("notifMaintenance"), description: t("notifMaintenanceDesc") },
              { key: "reports", label: t("notifReports"), description: t("notifReportsDesc") },
            ].map((item) => (
              <div 
                key={item.key}
                className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Switch
                  checked={notifications[item.key as keyof typeof notifications]}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [item.key]: checked }))}
                  className="data-[state=checked]:bg-navy"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{t("securityTitle")}</CardTitle>
              <CardDescription>
                {t("securityDesc")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-3 border-b border-border/30">
              <div>
                <p className="text-sm font-medium text-foreground">{t("changePassword")}</p>
                <p className="text-xs text-muted-foreground">{t("changePasswordDesc")}</p>
              </div>
              <Button variant="outline" size="sm" className="border-border/50">
                {t("update")}
              </Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border/30">
              <div>
                <p className="text-sm font-medium text-foreground">{t("twoFactor")}</p>
                <p className="text-xs text-muted-foreground">{t("twoFactorDesc")}</p>
              </div>
              <Button variant="outline" size="sm" className="border-border/50">
                {t("enable")}
              </Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{t("activeSessions")}</p>
                <p className="text-xs text-muted-foreground">{t("activeSessionsDesc")}</p>
              </div>
              <Button variant="outline" size="sm" className="border-border/50">
                {t("viewAll")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-rose-500/20 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-rose-600">{t("dangerZone")}</CardTitle>
          <CardDescription>
            {t("dangerDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">{t("deleteAccount")}</p>
              <p className="text-xs text-muted-foreground">
                {t("deleteAccountDesc")}
              </p>
            </div>
            <Button variant="destructive" size="sm">
              {t("deleteAccount")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
