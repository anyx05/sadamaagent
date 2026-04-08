"use client"

import { MessageSquare, Anchor, MailCheck } from "lucide-react"
import { useTranslations } from "next-intl"

export function HowItWorks() {
  const t = useTranslations("HowItWorks")

  const steps = [
    {
      icon: Anchor,
      title: t("step1"),
      description: t("step1Desc")
    },
    {
      icon: MessageSquare,
      title: t("step2"),
      description: t("step2Desc")
    },
    {
      icon: MailCheck,
      title: t("step3"),
      description: t("step3Desc")
    }
  ]

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-amber/20 text-amber flex items-center justify-center mb-6">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
