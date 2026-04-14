"use client"

import { useState, useRef, useCallback, Suspense } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import MagneticButton from "@/components/ui/MagneticButton"
import TextScramble from "@/components/ui/TextScramble"

// Lazy-load the 3D orb (#15)
const FloatingOrb = dynamic(() => import("@/components/3d/FloatingOrb"), { ssr: false })

type FormState = "idle" | "loading" | "success" | "error"

export default function FooterCTA() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<FormState>("idle")
  const spotlightRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || state === "loading") return
    setState("loading")
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200))
    setState("success")
  }

  // Cursor spotlight for CTA section
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!spotlightRef.current) return
    const rect = spotlightRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spotlightRef.current.style.setProperty("--cursor-x", `${x}px`)
    spotlightRef.current.style.setProperty("--cursor-y", `${y}px`)
  }, [])

  return (
    <section className="section-pad border-t border-white/5 relative overflow-hidden" id="footer-cta">
      {/* Floating Orb 3D Background (#15) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] opacity-60">
          <Suspense fallback={null}>
            <FloatingOrb />
          </Suspense>
        </div>
      </div>

      {/* Cursor Spotlight Layer */}
      <div
        ref={spotlightRef}
        onMouseMove={handleMouseMove}
        className="absolute inset-0 cursor-spotlight pointer-events-auto z-[1]"
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Chip */}
          <span className="section-chip">Start Today</span>

          {/* Headline with text scramble (#10) */}
          <h2 className="font-heading font-bold text-display-lg text-soyl-white leading-none">
            <TextScramble text="Ready to run your" speed={30} />{" "}
            <span className="text-gradient-amber">
              <TextScramble text="business on AI?" speed={30} delay={300} />
            </span>
          </h2>

          {/* Sub */}
          <p className="font-body text-lg text-soyl-gray max-w-xl">
            Join 200+ Indian SMBs already automating their operations with SOYL.
            Start at ₹4,999/month — no lock-in until you see results.
          </p>

          {/* CTAs — Magnetic (#8) */}
          <div className="flex flex-wrap gap-3 justify-center">
            <MagneticButton strength={0.4} radius={90}>
              <button
                onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-amber text-base px-8 py-4"
              >
                Start with Starter — ₹4,999/mo
              </button>
            </MagneticButton>
            <MagneticButton strength={0.3} radius={70}>
              <button className="btn-ghost text-base px-8 py-4">
                Book a Strategy Call
              </button>
            </MagneticButton>
          </div>

          {/* Email capture */}
          <div className="w-full max-w-md">
            <p className="text-xs font-body text-soyl-gray mb-3 text-center">
              Or get our free <span className="text-soyl-white">SMB AI Readiness Audit</span> →
            </p>
            <AnimatePresence mode="wait">
              {state !== "success" ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-soyl-white placeholder-soyl-gray text-sm font-body outline-none focus:border-soyl-amber/40 transition-colors"
                  />
                  <MagneticButton strength={0.2} radius={40}>
                    <button
                      type="submit"
                      disabled={state === "loading"}
                      className="btn-amber px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state === "loading" ? (
                        <div className="w-4 h-4 rounded-full border-2 border-soyl-black/30 border-t-soyl-black animate-spin" />
                      ) : (
                        "Get Audit →"
                      )}
                    </button>
                  </MagneticButton>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-soyl-teal/10 border border-soyl-teal/20"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
                    className="text-soyl-teal text-lg"
                  >
                    ✓
                  </motion.span>
                  <p className="text-sm font-body text-soyl-teal">
                    Got it! We&apos;ll send your AI Readiness Audit within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-body text-soyl-gray pt-2">
            {[
              "No credit card required",
              "Cancel anytime",
              "Results in 14 days guaranteed",
            ].map((text, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-soyl-teal" />
                {text}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
