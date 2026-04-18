"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useMenuStore } from "@/store/menu"
import { useCursorStore } from "@/store/cursor"

const NAV_LINKS = [
  { label: "Work",     href: "/work",     num: "01" },
  { label: "Services", href: "/services", num: "02" },
  { label: "About",    href: "/#about",   num: "03" },
  { label: "Contact",  href: "/contact",  num: "04" },
]

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const { isOpen, toggle, close } = useMenuStore()
  const { setVariant } = useCursorStore()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { close() }, [pathname, close])

  return (
    <>
      {/* ─── Always-visible hamburger / X ─── */}
      <div
        style={{
          position: "fixed",
          top:      "clamp(1.25rem, 3vw, 2rem)",
          right:    "clamp(1.25rem, 5vw, 4rem)",
          zIndex:   9500,
        }}
      >
        <button
          onClick={toggle}
          onMouseEnter={() => setVariant("hover")}
          onMouseLeave={() => setVariant("default")}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          style={{
            background:  "none",
            border:      "none",
            cursor:      "none",
            padding:     "0.5rem",
            display:     "flex",
            flexDirection: "column",
            gap:         "6px",
            alignItems:  "flex-end",
          }}
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0, background: isOpen ? "#FF5500" : "#F5F4EE", width: isOpen ? 24 : 24 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ display: "block", width: 24, height: 1.5, background: "#F5F4EE", borderRadius: 2 }}
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1, width: isOpen ? 0 : 16 }}
            transition={{ duration: 0.2 }}
            style={{ display: "block", width: 16, height: 1.5, background: "#F5F4EE", borderRadius: 2 }}
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0, background: isOpen ? "#FF5500" : "#F5F4EE", width: isOpen ? 24 : 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ display: "block", width: 20, height: 1.5, background: "#F5F4EE", borderRadius: 2 }}
          />
        </button>
      </div>

      {/* ─── Full header (top of page, !scrolled, !isOpen) ─── */}
      <AnimatePresence>
        {!scrolled && !isOpen && (
          <motion.header
            key="full-header"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.25, ease: EASE } }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              position:       "fixed",
              top:            0,
              left:           0,
              right:          0,
              zIndex:         9000,
              height:         80,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              padding:        "0 clamp(1.25rem, 5vw, 4rem)",
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              onMouseEnter={() => setVariant("hover")}
              onMouseLeave={() => setVariant("default")}
              style={{ textDecoration: "none" }}
            >
              <span
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "1.375rem",
                  fontWeight:    700,
                  color:         "#F5F4EE",
                  letterSpacing: "-0.02em",
                }}
              >
                SOYL
              </span>
            </Link>

            {/* Desktop nav links with numbered index */}
            <nav
              className="hidden md:flex"
              style={{ gap: "2.75rem", alignItems: "center" }}
            >
              {NAV_LINKS.map((link) => (
                <IndexedNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  num={link.num}
                  active={pathname === link.href}
                />
              ))}
            </nav>

            {/* CTA pill */}
            <Link
              href="/contact"
              className="hidden md:inline-flex"
              onMouseEnter={() => setVariant("cta")}
              onMouseLeave={() => setVariant("default")}
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "0.4rem",
                fontFamily:    "var(--font-display)",
                fontSize:      "0.8rem",
                fontWeight:    600,
                letterSpacing: "0.02em",
                color:         "#080808",
                background:    "#FF5500",
                padding:       "0.55rem 1.35rem",
                borderRadius:  9999,
                textDecoration: "none",
                marginRight:   "3.5rem",
                transition:    "transform 0.2s, box-shadow 0.2s",
              }}
            >
              Let&apos;s Talk <span style={{ marginLeft: 2 }}>→</span>
            </Link>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ─── Floating pill (scrolled, !isOpen) ─── */}
      <AnimatePresence>
        {scrolled && !isOpen && (
          <motion.div
            key="pill-nav"
            initial={{ opacity: 0, y: -32, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96, transition: { duration: 0.22 } }}
            transition={{ duration: 0.42, ease: EASE }}
            style={{
              position:           "fixed",
              top:                18,
              left:               "50%",
              transform:          "translateX(-50%)",
              zIndex:             9000,
              display:            "flex",
              alignItems:         "center",
              background:         "rgba(8,8,8,0.9)",
              border:             "1px solid rgba(255,255,255,0.09)",
              borderRadius:       9999,
              padding:            "5px 5px 5px 20px",
              backdropFilter:     "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow:          "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
            }}
          >
            {/* Brand */}
            <Link
              href="/"
              onMouseEnter={() => setVariant("hover")}
              onMouseLeave={() => setVariant("default")}
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "0.95rem",
                fontWeight:    700,
                color:         "#F5F4EE",
                letterSpacing: "-0.02em",
                textDecoration: "none",
                marginRight:   "1.75rem",
                flexShrink:    0,
              }}
            >
              SOYL
            </Link>

            {/* Divider */}
            <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)", marginRight: "1.75rem", flexShrink: 0 }} />

            {/* Links */}
            <nav
              className="hidden md:flex"
              style={{ gap: "1.5rem", alignItems: "center", marginRight: "1.5rem" }}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setVariant("link")}
                  onMouseLeave={() => setVariant("default")}
                  style={{
                    fontFamily:     "var(--font-body)",
                    fontSize:       "0.8rem",
                    fontWeight:     500,
                    color:          pathname === link.href ? "#FF5500" : "rgba(245,244,238,0.6)",
                    textDecoration: "none",
                    letterSpacing:  "0.01em",
                    transition:     "color 0.2s",
                    whiteSpace:     "nowrap",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA inside pill */}
            <Link
              href="/contact"
              onMouseEnter={() => setVariant("cta")}
              onMouseLeave={() => setVariant("default")}
              style={{
                fontFamily:     "var(--font-display)",
                fontSize:       "0.75rem",
                fontWeight:     700,
                color:          "#080808",
                background:     "#FF5500",
                padding:        "0.5rem 1.1rem",
                borderRadius:   9999,
                textDecoration: "none",
                whiteSpace:     "nowrap",
                marginRight:    "2.75rem",
              }}
            >
              Talk →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Split-screen menu overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.35 } }}
            style={{
              position: "fixed",
              inset:    0,
              zIndex:   9100,
              display:  "flex",
            }}
          >
            {/* Left — dark panel, nav links */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0, transition: { duration: 0.65, ease: EASE } }}
              exit={{ x: "-100%", transition: { duration: 0.52, ease: EASE } }}
              style={{
                flex:          "0 0 58%",
                background:    "#0A0A0A",
                display:       "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding:       "clamp(2rem,6vw,5rem)",
                paddingBottom: "clamp(3rem,8vw,6rem)",
                position:      "relative",
                overflow:      "hidden",
              }}
            >
              {/* SOYL wordmark top-left */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                exit={{ opacity: 0 }}
                style={{
                  position:   "absolute",
                  top:        "clamp(1.5rem,4vh,2.5rem)",
                  left:       "clamp(2rem,6vw,5rem)",
                  fontFamily: "var(--font-display)",
                  fontSize:   "1.1rem",
                  fontWeight: 700,
                  color:      "#FF5500",
                  letterSpacing: "-0.02em",
                }}
              >
                SOYL
              </motion.div>

              {/* Huge nav links */}
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -48 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.28 + i * 0.09, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                    }}
                    exit={{ opacity: 0, x: -24, transition: { delay: i * 0.04, duration: 0.3 } }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      onMouseEnter={() => setVariant("hover")}
                      onMouseLeave={() => setVariant("default")}
                      style={{
                        display:        "flex",
                        alignItems:     "baseline",
                        gap:            "1rem",
                        textDecoration: "none",
                        padding:        "0.2rem 0",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:    "var(--font-mono)",
                          fontSize:      "0.65rem",
                          color:         "rgba(245,244,238,0.2)",
                          letterSpacing: "0.08em",
                          marginBottom:  "0.1rem",
                          lineHeight:    1,
                        }}
                      >
                        {link.num}
                      </span>
                      <span
                        style={{
                          fontFamily:    "var(--font-display)",
                          fontSize:      "clamp(2.75rem, 6.5vw, 5.5rem)",
                          fontWeight:    700,
                          color:         pathname === link.href ? "#FF5500" : "#F5F4EE",
                          letterSpacing: "-0.035em",
                          lineHeight:    1.0,
                          transition:    "color 0.2s",
                        }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom meta */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3, transition: { delay: 0.8 } }}
                exit={{ opacity: 0 }}
                style={{
                  position:      "absolute",
                  bottom:        "clamp(1.5rem,4vh,2.5rem)",
                  left:          "clamp(2rem,6vw,5rem)",
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.6rem",
                  letterSpacing: "0.12em",
                  color:         "#F5F4EE",
                  textTransform: "uppercase",
                }}
              >
                Bengaluru, India · Est. 2024
              </motion.p>
            </motion.div>

            {/* Right — orange panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0, transition: { duration: 0.65, ease: EASE, delay: 0.06 } }}
              exit={{ x: "100%", transition: { duration: 0.52, ease: EASE, delay: 0.04 } }}
              style={{
                flex:          "0 0 42%",
                background:    "#FF5500",
                display:       "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding:       "clamp(2rem,6vw,5rem)",
                paddingBottom: "clamp(3rem,8vw,6rem)",
                position:      "relative",
                overflow:      "hidden",
              }}
            >
              {/* Large ambient S letterform */}
              <div
                aria-hidden="true"
                style={{
                  position:      "absolute",
                  top:           "-5%",
                  right:         "-5%",
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(12rem, 28vw, 22rem)",
                  fontWeight:    700,
                  color:         "rgba(255,255,255,0.06)",
                  lineHeight:    1,
                  letterSpacing: "-0.05em",
                  userSelect:    "none",
                  pointerEvents: "none",
                }}
              >
                S
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, y: 16, transition: { duration: 0.25 } }}
                style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <p
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontSize:      "clamp(1.5rem, 3vw, 2.25rem)",
                    fontWeight:    700,
                    color:         "#080808",
                    letterSpacing: "-0.025em",
                    lineHeight:    1.1,
                  }}
                >
                  Story Of<br />Your Life.
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize:   "0.9rem",
                    color:      "rgba(8,8,8,0.6)",
                    lineHeight: 1.65,
                    maxWidth:   "28ch",
                  }}
                >
                  AI-native digital partner for businesses that refuse to stay small.
                </p>

                <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                  {["LinkedIn", "Instagram", "GitHub"].map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily:    "var(--font-label)",
                        fontSize:      "0.65rem",
                        letterSpacing: "0.15em",
                        color:         "rgba(8,8,8,0.45)",
                        textTransform: "uppercase",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function IndexedNavLink({ href, label, num, active }: { href: string; label: string; num: string; active: boolean }) {
  const { setVariant } = useCursorStore()

  return (
    <Link
      href={href}
      onMouseEnter={() => setVariant("link")}
      onMouseLeave={() => setVariant("default")}
      style={{
        fontFamily:     "var(--font-body)",
        fontSize:       "0.875rem",
        fontWeight:     500,
        color:          active ? "#FF5500" : "rgba(245,244,238,0.75)",
        textDecoration: "none",
        letterSpacing:  "0.01em",
        position:       "relative",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "flex-start",
        gap:            "2px",
        transition:     "color 0.2s",
      }}
    >
      <span
        style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.5rem",
          letterSpacing: "0.08em",
          color:         active ? "rgba(255,85,0,0.6)" : "rgba(245,244,238,0.25)",
          transition:    "color 0.2s",
        }}
      >
        {num}
      </span>
      <motion.span
        whileHover={{ color: "#FF5500" }}
        transition={{ duration: 0.2 }}
        style={{ display: "inline-block" }}
      >
        {label}
      </motion.span>
    </Link>
  )
}
