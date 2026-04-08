"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Globe } from "lucide-react"
import { useTransition } from "react"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLanguageChange = (nextLocale: string) => {
    startTransition(() => {
      // Replace the current pathname with the new locale
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <Select value={locale} onValueChange={handleLanguageChange} disabled={isPending}>
      <SelectTrigger className="w-[120px] h-9 bg-background border border-border text-foreground focus:ring-cyan/20">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan/70" />
          <SelectValue placeholder="Language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="et">Eesti</SelectItem>
      </SelectContent>
    </Select>
  )
}
