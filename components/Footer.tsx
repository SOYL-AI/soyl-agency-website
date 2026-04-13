"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const serviceLinks = [
  { label: "Website & E-Commerce", href: "/services" },
  { label: "AI Automation",         href: "/services" },
  { label: "Branding & Identity",   href: "/services" },
  { label: "Performance Marketing", href: "/services" },
  { label: "CRM & Sales",           href: "/services" },
  { label: "Customer Support AI",   href: "/services" },
  { label: "SEO & Growth",          href: "/services" },
  { label: "Custom AI Agents",      href: "/services" },
]

const companyLinks = [
  { label: "About",           href: "/about" },
  { label: "Case Studies",    href: "/case-studies" },
  { label: "How It Works",    href: "/#how-it-works" },
  { label: "Pricing",         href: "/pricing" },
  { label: "Contact",         href: "/contact" },
  { label: "Privacy Policy",  href: "#" },
  { label: "Terms of Service", href: "#" },
]

function SocialButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-soyl-gray
        hover:text-soyl-amber hover:border-soyl-amber/30 transition-all duration-200"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-soyl-bg">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <div>
              <Link href="/" className="block">
                <p className="font-heading font-bold text-2xl text-soyl-white hover:text-soyl-amber transition-colors">
                  SOYL
                </p>
                <p className="text-xs font-body tracking-[0.22em] uppercase text-soyl-gray mt-0.5">
                  Story Of Your Life
                </p>
              </Link>
            </div>
            <p className="font-body text-sm text-soyl-gray leading-relaxed">
              India&apos;s first AI-native digital operations partner for SMBs.
              Making enterprise-grade AI accessible to every small business.
            </p>
            <div className="flex gap-3">
              <SocialButton href="https://linkedin.com" label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </SocialButton>
              <SocialButton href="https://twitter.com" label="X / Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialButton>
              <SocialButton href="https://instagram.com" label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialButton>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-heading font-bold tracking-[0.14em] uppercase text-soyl-gray-light">
              Services
            </p>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm font-body text-soyl-gray hover:text-soyl-white transition-colors duration-150"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-heading font-bold tracking-[0.14em] uppercase text-soyl-gray-light">
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-body text-soyl-gray hover:text-soyl-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-heading font-bold tracking-[0.14em] uppercase text-soyl-gray-light">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@soyl.in" className="text-sm font-body text-soyl-gray hover:text-soyl-amber transition-colors">
                hello@soyl.in
              </a>
              <Link href="/contact" className="text-sm font-body text-soyl-gray hover:text-soyl-amber transition-colors">
                Book a Strategy Call →
              </Link>
              <div className="mt-1 pt-3 border-t border-white/[0.06]">
                <p className="text-xs font-body text-soyl-gray mb-0.5">Registered in India</p>
                <p className="text-sm font-body text-soyl-gray">SOYL AI Private Limited</p>
              </div>
            </div>
            <Link href="/contact" className="btn-amber text-xs px-4 py-2.5 self-start">
              Start for ₹4,999 →
            </Link>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="divider-amber mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-soyl-gray">
          <p>© 2025 SOYL AI Private Limited · Made in India</p>
          <p className="text-soyl-gray">Built with AI. Delivered with care.</p>
        </div>
      </div>
    </footer>
  )
}
