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

export default function SettingsPage() {
  const { data: settings, isLoading } = useAgentSettings()
  const { mutate: updateSettings, isPending: isSaving } = useUpdateAgentSettings()

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
        toast.success("AI Configuration saved to database.")
      },
      onError: (err) => {
        toast.error("Failed to save settings: " + err.message)
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
          Agent Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure your AI assistant and application preferences
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
                AI Configuration
                <Sparkles className="w-4 h-4 text-cyan" />
              </CardTitle>
              <CardDescription className="text-white/50">
                Customize how your AI assistant behaves and responds
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-6">
          {/* System Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="systemPrompt" className="text-sm font-medium text-white/80">
                System Prompt
              </Label>
              <span className="text-xs text-white/40 font-mono">
                {systemPrompt.length} chars
              </span>
            </div>
            <Textarea
              id="systemPrompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter instructions for how your AI assistant should behave..."
              className="min-h-[180px] resize-y bg-white/[0.05] border-white/10 text-white placeholder:text-white/30 focus:border-cyan focus:ring-cyan/20 font-mono text-sm"
            />
            <p className="text-xs text-white/40">
              This prompt defines the personality, knowledge, and behavior of your marina AI assistant.
            </p>
          </div>

          {/* Language & AI Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Default Language */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-white/80 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan/70" />
                Default Language
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
                AI Model
              </Label>
              <div className="h-10 px-3 flex items-center rounded-md bg-white/[0.05] border border-white/10 text-white/70 text-sm">
                gpt-4-turbo-preview
              </div>
            </div>
          </div>

          {/* AI Feature Toggles */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <p className="text-xs uppercase tracking-wider text-white/30 font-medium">AI Features</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-cyan/50" />
                  <div>
                    <p className="text-sm font-medium text-white/80">Streaming Responses</p>
                    <p className="text-xs text-white/40">Show AI responses as they generate</p>
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
                    <p className="text-sm font-medium text-white/80">Code Highlighting</p>
                    <p className="text-xs text-white/40">Syntax highlight code blocks in responses</p>
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
                    <p className="text-sm font-medium text-white/80">Auto-Suggestions</p>
                    <p className="text-xs text-white/40">Show smart suggestions while typing</p>
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
              {isSaving ? "Saving..." : "Save AI Settings"}
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
              <CardTitle className="text-lg">Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input id="firstName" defaultValue="Captain" className="h-10" />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input id="lastName" defaultValue="Admin" className="h-10" />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input 
                id="email" 
                type="email" 
                defaultValue="admin@maritime.ee" 
                className="h-10" 
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
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
              Save Changes
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
              <CardTitle className="text-lg">Organization</CardTitle>
              <CardDescription>
                Configure your marina authority details
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="orgName">Organization Name</FieldLabel>
              <Input 
                id="orgName" 
                defaultValue="Tallinn Marina Authority" 
                className="h-10" 
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
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
              <CardTitle className="text-lg">Notifications</CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {[
              { key: "bookings", label: "Booking confirmations", description: "Get notified when a berth booking is confirmed" },
              { key: "arrivals", label: "Vessel arrivals", description: "Receive alerts when vessels arrive at marina" },
              { key: "maintenance", label: "Maintenance alerts", description: "Be notified about scheduled maintenance" },
              { key: "reports", label: "Weekly reports", description: "Receive a weekly summary of marina activities" },
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
              <CardTitle className="text-lg">Security</CardTitle>
              <CardDescription>
                Manage your security preferences
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-3 border-b border-border/30">
              <div>
                <p className="text-sm font-medium text-foreground">Change Password</p>
                <p className="text-xs text-muted-foreground">Update your password regularly for security</p>
              </div>
              <Button variant="outline" size="sm" className="border-border/50">
                Update
              </Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border/30">
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm" className="border-border/50">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Active Sessions</p>
                <p className="text-xs text-muted-foreground">Manage your logged-in devices</p>
              </div>
              <Button variant="outline" size="sm" className="border-border/50">
                View All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-rose-500/20 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-rose-600">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Delete Account</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
