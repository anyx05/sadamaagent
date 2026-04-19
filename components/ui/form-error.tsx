"use client"

import { cn } from "@/lib/utils"

interface FormErrorProps {
  message?: string | null;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <p
      className={cn(
        "text-xs text-rose-400 mt-1.5 pl-0.5 animate-in fade-in slide-in-from-top-1 duration-200",
        className
      )}
      role="alert"
    >
      {message}
    </p>
  )
}
