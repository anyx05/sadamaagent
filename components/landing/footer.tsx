import Link from "next/link"
import { Anchor, Sailboat, Ship, Waves } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Marina Berths", href: "#" },
    { label: "Yacht Moorings", href: "#" },
    { label: "Boat Storage", href: "#" },
    { label: "Vessel Support", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-navy to-navy-dark text-white overflow-hidden">
      {/* Subtle wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-4 group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber text-navy transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-amber/30">
                <Anchor className="w-4 h-4" />
              </div>
              <span className="font-semibold text-lg tracking-tight">
                SadamaAgent
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Estonia&apos;s premier marina and harbour booking platform for
              boat owners, yachts, and commercial vessels.
            </p>
            {/* Vessel type icons */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <Sailboat className="w-4 h-4 text-white/50" />
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <Ship className="w-4 h-4 text-white/50" />
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <Waves className="w-4 h-4 text-white/50" />
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-amber tracking-wide uppercase">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-amber tracking-wide uppercase">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-amber tracking-wide uppercase">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-white/40">
              &copy; {new Date().getFullYear()} SadamaAgent. All rights
              reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Proudly serving Estonian harbours
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
