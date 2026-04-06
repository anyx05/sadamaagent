"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { User, Building, Bell, Shield, Globe, Palette } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and application preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy/10 text-navy">
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
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber/10 text-amber">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Organization</CardTitle>
              <CardDescription>
                Configure your port authority details
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
                defaultValue="Tallinn Port Authority" 
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
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600">
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
              { label: "Booking confirmations", description: "Get notified when a booking is confirmed", checked: true },
              { label: "Vessel arrivals", description: "Receive alerts when vessels arrive at port", checked: true },
              { label: "Maintenance alerts", description: "Be notified about scheduled maintenance", checked: false },
              { label: "Weekly reports", description: "Receive a weekly summary of port activities", checked: true },
            ].map((item) => (
              <div 
                key={item.label}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
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
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-rose-500/10 text-rose-600">
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
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="text-sm font-medium text-foreground">Change Password</p>
                <p className="text-xs text-muted-foreground">Update your password regularly for security</p>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
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
      <Card className="border-rose-200">
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
