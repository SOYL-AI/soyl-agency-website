"use client"

import { useState, useRef } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { useCursorStore } from "@/store/cursor"

const ContactScene = dynamic(() => import("@/components/three/ContactScene"), { ssr: false })

const SOCIAL_LINKS = [
  { label: "LinkedIn",  href: "https://linkedin.com/company/soyl-ai", icon: "in" },
  { label: "Instagram", href: "https://instagram.com/soyl.agency",    icon: "ig" },
  { label: "GitHub",    href: "https://github.com/soyl-ai",            icon: "gh" },
]

interface FormData {
  name:    string
  email:   string
  company: string
  message: string
}

export default function Contact() {
  const [form,      setForm]      = useState<FormData>({ name: "", email: "", company: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [sending,   setSending]   = useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const { setVariant } = useCursorStore()
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.")
      return
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(form.email)) {
      setError("Please enter a valid email address.")
      return
    }
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setSubmitted(true)
  }

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn  = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    btn.style.setProperty("--ripple-x", `${e.clientX - rect.left}px`)
    btn.style.setProperty("--ripple-y", `${e.clientY - rect.top}px`)
  }

  return (
    <section
      id="contact"
      style={{
        position:            "relative",
        minHeight:           "100svh",
        display:             "grid",
        gridTemplateColumns: "1fr 1fr",
        padding:             "clamp(5rem,10vw,8rem) clamp(1.25rem,5vw,4rem)",
        gap:                 "clamp(3rem,6vw,6rem)",
        background:          "#080808",
        overflow:            "hidden",
      }}
    >
      {/* R3F background */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.35 }}
      >
        <ContactScene />
      </div>

      {/* Left — copy */}
      <div
        style={{
          position:       "relative",
          zIndex:         1,
          display:        "flex",
          flexDirection:  "column",
          justifyContent: "center",
          gap:            "2rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.7rem",
              letterSpacing: "0.15em",
              color:         "rgba(255,85,0,0.7)",
              marginBottom:  "1rem",
            }}
          >
            [ GET IN TOUCH ]
          </p>
          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight:    700,
              letterSpacing: "-0.03em",
              lineHeight:    0.95,
              color:         "#F5F4EE",
            }}
          >
            Let&rsquo;s build<br />your story.
          </h2>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize:   "1.0625rem",
            color:      "rgba(245,244,238,0.6)",
            lineHeight: 1.6,
            maxWidth:   "36ch",
          }}
        >
          We respond within 24 hours. Always.
        </p>

        {/* Social links */}
        <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.5rem" }}>
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setVariant("link")}
              onMouseLeave={() => setVariant("default")}
              whileHover={{ color: "#FF5500", filter: "drop-shadow(0 0 8px rgba(255,85,0,0.4))" }}
              style={{
                fontFamily:     "var(--font-label)",
                fontSize:       "0.75rem",
                letterSpacing:  "0.15em",
                color:          "rgba(245,244,238,0.45)",
                textDecoration: "none",
                textTransform:  "uppercase",
                transition:     "color 0.2s",
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div
        style={{
          position:       "relative",
          zIndex:         1,
          display:        "flex",
          flexDirection:  "column",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {(["name", "email"] as const).map((field) => (
                  <div key={field} style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    <label
                      htmlFor={field}
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(245,244,238,0.4)" }}
                    >
                      {field === "name" ? "NAME *" : "EMAIL *"}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      placeholder={field === "name" ? "Ryan Gomez" : "ryan@company.in"}
                      value={form[field]}
                      onChange={handleChange}
                      className="input-field"
                      onMouseEnter={() => setVariant("text")}
                      onMouseLeave={() => setVariant("default")}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <label
                  htmlFor="company"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(245,244,238,0.4)" }}
                >
                  COMPANY
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your company name"
                  value={form.company}
                  onChange={handleChange}
                  className="input-field"
                  onMouseEnter={() => setVariant("text")}
                  onMouseLeave={() => setVariant("default")}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                <label
                  htmlFor="message"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(245,244,238,0.4)" }}
                >
                  WHAT DO YOU NEED? *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project, timeline, and budget…"
                  value={form.message}
                  onChange={handleChange}
                  className="input-field"
                  onMouseEnter={() => setVariant("text")}
                  onMouseLeave={() => setVariant("default")}
                  style={{ resize: "none" }}
                />
              </div>

              {error && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#FF4545" }}>
                  {error}
                </p>
              )}

              <button
                ref={btnRef}
                type="submit"
                disabled={sending}
                onMouseEnter={() => setVariant("cta")}
                onMouseLeave={() => setVariant("default")}
                onMouseMove={handleBtnMouseMove}
                style={{
                  width:         "100%",
                  padding:       "1rem",
                  background:    "#FF5500",
                  color:         "#F5F4EE",
                  fontFamily:    "var(--font-display)",
                  fontSize:      "1rem",
                  fontWeight:    700,
                  letterSpacing: "-0.01em",
                  border:        "none",
                  borderRadius:  "0.75rem",
                  cursor:        "none",
                  transition:    "background 0.2s, transform 0.15s",
                  opacity:       sending ? 0.7 : 1,
                  position:      "relative",
                  overflow:      "hidden",
                }}
              >
                {sending ? "Sending…" : "Send Message"}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
              style={{
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "center",
                justifyContent: "center",
                gap:            "1.5rem",
                textAlign:      "center",
                padding:        "3rem",
              }}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] } }}
                style={{
                  width:          80,
                  height:         80,
                  borderRadius:   "50%",
                  border:         "1.5px solid #FF5500",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontFamily:     "var(--font-display)",
                  fontSize:       "1.5rem",
                  fontWeight:     700,
                  color:          "#FF5500",
                }}
              >
                S
              </motion.div>

              <div>
                <h3
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontSize:      "1.75rem",
                    fontWeight:    700,
                    color:         "#F5F4EE",
                    letterSpacing: "-0.02em",
                    marginBottom:  "0.5rem",
                  }}
                >
                  Message received.
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "rgba(245,244,238,0.5)", fontSize: "0.95rem" }}>
                  We&rsquo;ll be in touch within 24 hours.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
