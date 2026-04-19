"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Ship, Plus, Pencil, Trash2, Check, X } from "lucide-react"
import { useBerths, useAddBerth, useUpdateBerth, useDeleteBerth, type Berth, type BerthStatus } from "@/lib/queries/berths"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { validateBerthForm } from "@/lib/validations"

export default function BerthsPage() {
  const { data: berths = [], isLoading } = useBerths()
  const { mutate: addBerthMutation, isPending: isAdding } = useAddBerth()
  const { mutate: updateBerthMutation } = useUpdateBerth()
  const { mutate: deleteBerthMutation } = useDeleteBerth()
  const t = useTranslations("BerthManager")

  const statusConfig: Record<BerthStatus, { label: string, className: string }> = {
    available: {
      label: t("available"),
      className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    occupied: {
      label: t("occupied"),
      className: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    },
    maintenance: {
      label: t("maintenance"),
      className: "bg-amber/10 text-amber border-amber/20",
    },
  }

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Berth | null>(null)

  const startEdit = (berth: Berth) => {
    setEditingId(berth.id)
    setEditForm({ ...berth })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const saveEdit = () => {
    if (!editForm) return
    
    // Validate form before saving
    const validation = validateBerthForm(
      editForm.name,
      editForm.length,
      editForm.draft,
      editForm.price,
      t
    )
    
    if (!validation.valid) {
      // Display the first validation error as a toast
      const firstError = Object.values(validation.errors)[0]
      toast.error(firstError)
      return
    }
    
    updateBerthMutation(editForm, {
      onSuccess: () => toast.success(t("berthUpdated")),
      onError: (err) => toast.error(err.message),
    })
    setEditingId(null)
    setEditForm(null)
  }

  const deleteBerth = (id: string) => {
    if (!confirm(t("deleteConfirm"))) return
    deleteBerthMutation(id, {
      onSuccess: () => toast.success(t("berthDeleted")),
      onError: (err) => toast.error(err.message),
    })
  }

  const addBerth = () => {
    addBerthMutation({
      name: t("newBerthName"),
      length: 10,
      draft: 2.0,
      price: 50,
      status: "available",
    }, {
      onSuccess: () => toast.success(t("berthAdded")),
      onError: (err) => toast.error(err.message),
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("subtitle")}
          </p>
        </div>
        <Button 
          onClick={addBerth}
          className="bg-navy hover:bg-navy-light text-white shadow-md shadow-navy/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("addNew")}
        </Button>
      </div>

      {/* Data Table Card */}
      <Card className="border-border/40 bg-card/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan/10 text-cyan">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{t("allBerths")}</CardTitle>
              <CardDescription>
                {berths.length} {t("description")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="pl-6 min-w-[180px]">{t("name")}</TableHead>
                  <TableHead className="text-right min-w-[100px]">{t("length")}</TableHead>
                  <TableHead className="text-right min-w-[100px]">{t("draft")}</TableHead>
                  <TableHead className="text-right min-w-[120px]">{t("priceNight")}</TableHead>
                  <TableHead className="min-w-[130px]">{t("status")}</TableHead>
                  <TableHead className="pr-6 text-right min-w-[120px]">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {berths.map((berth) => {
                  const isEditing = editingId === berth.id
                  const status = statusConfig[berth.status]
                  
                  return (
                    <TableRow
                      key={berth.id}
                      className="group hover:bg-muted/30 transition-colors border-border/30"
                    >
                      <TableCell className="pl-6">
                        {isEditing ? (
                          <Input
                            value={editForm?.name || ""}
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, name: e.target.value } : null)}
                            className="h-8 w-full bg-background/50"
                          />
                        ) : (
                          <span className="font-medium text-foreground">{berth.name}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editForm?.length || 0}
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, length: parseFloat(e.target.value) || 0 } : null)}
                            className="h-8 w-20 ml-auto bg-background/50 text-right"
                          />
                        ) : (
                          <span className="tabular-nums">{berth.length}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {isEditing ? (
                          <Input
                            type="number"
                            step="0.1"
                            value={editForm?.draft || 0}
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, draft: parseFloat(e.target.value) || 0 } : null)}
                            className="h-8 w-20 ml-auto bg-background/50 text-right"
                          />
                        ) : (
                          <span className="tabular-nums">{berth.draft}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editForm?.price || 0}
                            onChange={(e) => setEditForm(prev => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : null)}
                            className="h-8 w-24 ml-auto bg-background/50 text-right"
                          />
                        ) : (
                          <span className="tabular-nums font-medium">&euro;{berth.price}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Select
                            value={editForm?.status}
                            onValueChange={(value: BerthStatus) => setEditForm(prev => prev ? { ...prev, status: value } : null)}
                          >
                            <SelectTrigger className="h-8 w-[120px] bg-background/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="available">{t("available")}</SelectItem>
                              <SelectItem value="occupied">{t("occupied")}</SelectItem>
                              <SelectItem value="maintenance">{t("maintenance")}</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant="outline" className={status.className}>
                            {status.label}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={saveEdit}
                              className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={cancelEdit}
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => startEdit(berth)}
                              className="h-8 w-8 text-muted-foreground hover:text-cyan"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteBerth(berth.id)}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-border/30">
            {berths.map((berth) => {
              const status = statusConfig[berth.status]
              return (
                <div key={berth.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{berth.name}</p>
                      <Badge variant="outline" className={`${status.className} mt-1`}>
                        {status.label}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEdit(berth)}
                        className="h-8 w-8"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteBerth(berth.id)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">{t("lengthLabel")}</p>
                      <p className="font-medium tabular-nums">{berth.length}m</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{t("draftLabel")}</p>
                      <p className="font-medium tabular-nums">{berth.draft}m</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{t("priceLabel")}</p>
                      <p className="font-medium tabular-nums">&euro;{berth.price}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Table Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-border/30 bg-muted/20">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{berths.length}</span> {t("berthsTotal")}
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {berths.filter((b) => b.status === "available").length} {t("available")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                {berths.filter((b) => b.status === "occupied").length} {t("occupied")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-amber" />
                {berths.filter((b) => b.status === "maintenance").length} {t("maintenance")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
