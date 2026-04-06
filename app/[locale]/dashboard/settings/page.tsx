"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { User, Building, Bell, Shield, Bot, Sparkles, Globe } from "lucide-react"

const defaultSystemPrompt = `You are SadamaAgent, a helpful AI assistant for Estonian marina and harbour operations. Your role is to assist boat owners, captains, and port operators with:

- Berth reservations and availability inquiries
- Marina facility information and amenities
- Vessel requirements and documentation
- Local maritime regulations and procedures
- Weather and navigation guidance

Always be professional, accurate, and helpful. Prioritize safety information when relevant.`

export default function SettingsPage() {
  const [systemPrompt, setSystemPrompt] = useState(defaultSystemPrompt)
  const [language, setLanguage] = useState("en")

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

      {/* AI Configuration - Glassmorphism Card */}
      <Card className="relative overflow-hidden border-border/40 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm shadow-lg">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/[0.02] via-transparent to-amber/[0.02] pointer-events-none" />
        
        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-navy to-navy-light text-white shadow-md shadow-navy/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                AI Configuration
                <Sparkles className="w-4 h-4 text-amber" />
              </CardTitle>
              <CardDescription>
                Customize how your AI assistant behaves and responds
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-6">
          {/* System Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="systemPrompt" className="text-sm font-medium">
                System Prompt
              </Label>
              <span className="text-xs text-muted-foreground">
                {systemPrompt.length} characters
              </span>
            </div>
            <Textarea
              id="systemPrompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter instructions for how your AI assistant should behave..."
              className="min-h-[200px] resize-y bg-background/50 border-border/50 focus:border-navy focus:ring-navy/20"
            />
            <p className="text-xs text-muted-foreground">
              This prompt defines the personality, knowledge, and behavior of your marina AI assistant.
            </p>
          </div>

          {/* Default Language */}
          <div className="space-y-3">
            <Label htmlFor="language" className="text-sm font-medium flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              Default Language
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full sm:w-[280px] bg-background/50 border-border/50">
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
            <p className="text-xs text-muted-foreground">
              The default language for AI responses. Users can still interact in any supported language.
            </p>
          </div>

          <div className="flex justify-end pt-4 border-t border-border/30">
            <Button className="bg-navy hover:bg-navy-light text-white shadow-md shadow-navy/20 transition-all duration-300 hover:-translate-y-0.5">
              Save AI Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card className="border-border/40 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy/10 text-navy">
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

      {/* Notification Settings */}
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
          <div className="space-y-4">
            {[
              { label: "Booking confirmations", description: "Get notified when a berth booking is confirmed", checked: true },
              { label: "Vessel arrivals", description: "Receive alerts when vessels arrive at marina", checked: true },
              { label: "Maintenance alerts", description: "Be notified about scheduled maintenance", checked: false },
              { label: "Weekly reports", description: "Receive a weekly summary of marina activities", checked: true },
            ].map((item) => (
              <div 
                key={item.label}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={item.checked}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-navy transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
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
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <div>
                <p className="text-sm font-medium text-foreground">Change Password</p>
                <p className="text-xs text-muted-foreground">Update your password regularly for security</p>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Active Sessions</p>
                <p className="text-xs text-muted-foreground">Manage your logged-in devices</p>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-rose-200/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-rose-600">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
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
