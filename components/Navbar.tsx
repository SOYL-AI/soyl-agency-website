"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "Services",     href: "/services"      },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing",      href: "/pricing"       },
  { label: "Case Studies", href: "/case-studies"  },
  { label: "About",        href: "/about"         },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen,     setIsOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  const isActive = (href: string) => {
    const path = href.startsWith("/#") ? "/" : href
    return pathname === path
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-soyl-bg/85 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="SOYL Logo" className="w-10 h-10 object-contain rounded-full border border-white/5 bg-white/5" />
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-xl text-soyl-white tracking-tight group-hover:text-soyl-amber transition-colors duration-200">
                SOYL
              </span>
              <span className="text-[8px] font-body tracking-[0.3em] uppercase text-soyl-gray/60 group-hover:text-soyl-teal transition-colors duration-200">
                Story Of Your Life
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-body transition-all duration-200 relative
                  ${isActive(link.href)
                    ? "text-soyl-white bg-white/[0.05]"
                    : "text-soyl-gray hover:text-soyl-white hover:bg-white/[0.04]"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-amber text-xs px-5 py-2.5 inline-flex items-center gap-1.5"
            >
              Start Growing
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6h7M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-px bg-soyl-white origin-center"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px bg-soyl-gray w-3"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-px bg-soyl-white origin-center"
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-soyl-bg/96 backdrop-blur-2xl" onClick={() => setIsOpen(false)} />
            <motion.nav
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="relative flex flex-col items-center justify-center h-full gap-7"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className="font-heading font-semibold text-3xl text-soyl-white hover:text-soyl-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + navLinks.length * 0.06 }}
              >
                <Link href="/contact" className="btn-amber mt-2">
                  Start Growing
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
