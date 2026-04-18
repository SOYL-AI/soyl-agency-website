"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useCursorStore } from "@/store/cursor"

const NAV_LINKS = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/#about" },
  { label: "Contact",  href: "/contact" },
]

export default function Footer() {
  const { setVariant } = useCursorStore()
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background:     "#080808",
        borderTop:      "1px solid rgba(255,85,0,0.2)",
        padding:        "2.5rem clamp(1.25rem, 5vw, 4rem)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        flexWrap:       "wrap",
        gap:            "1.5rem",
      }}
    >
      {/* Left — wordmark + copyright */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <motion.span
          onMouseEnter={() => setVariant("hover")}
          onMouseLeave={() => setVariant("default")}
          whileHover={{ filter: "drop-shadow(0 0 10px rgba(255,85,0,0.5))" }}
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "1.25rem",
            fontWeight:    700,
            color:         "#FF5500",
            letterSpacing: "-0.02em",
            cursor:        "none",
          }}
        >
          SOYL
        </motion.span>
        <span
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.65rem",
            color:         "rgba(245,244,238,0.35)",
            letterSpacing: "0.06em",
          }}
        >
          © {year} SOYL Agency. All rights reserved.
        </span>
      </div>

      {/* Center — nav links */}
      <nav style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onMouseEnter={() => setVariant("link")}
            onMouseLeave={() => setVariant("default")}
            style={{
              fontFamily:     "var(--font-body)",
              fontSize:       "0.8rem",
              color:          "rgba(245,244,238,0.5)",
              textDecoration: "none",
              transition:     "color 0.2s",
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right — tagline */}
      <span
        style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.65rem",
          color:         "rgba(245,244,238,0.3)",
          letterSpacing: "0.06em",
        }}
      >
        Crafted in Bengaluru · Powered by AI
      </span>
    </footer>
  )
}
