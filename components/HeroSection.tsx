"use client"

import { Suspense, useRef, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Hero3D from "@/components/3d/Hero3D"
import MagneticButton from "@/components/ui/MagneticButton"
import TypingText from "@/components/ui/TypingText"

const ticker = [
  "3x ROAS",
  "65% fewer support tickets",
  "40% faster hiring",
  "25% faster project delivery",
  "70% open rates on WhatsApp",
  "₹9.7L LTV from a single D2C client",
  "14-day avg delivery",
  "60-80% cost reduction via AI",
  "5-14 day website launch",
  "30-40% email-driven D2C revenue",
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.4 + i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const headline = "Your business,\npowered by AI.\nFinally."

export default function HeroSection() {
  const words = headline.split(/\s+/)
  const sectionRef = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  // Parallax layers (#3)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -140])
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const heroScale  = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Cursor spotlight handler (#12)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!spotlightRef.current) return
    const rect = spotlightRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spotlightRef.current.style.setProperty("--cursor-x", `${x}px`)
    spotlightRef.current.style.setProperty("--cursor-y", `${y}px`)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden" id="hero">
      {/* Cursor Spotlight Layer (#12) */}
      <div
        ref={spotlightRef}
        onMouseMove={handleMouseMove}
        className="absolute inset-0 cursor-spotlight pointer-events-auto z-0"
      />

      {/* Parallax Depth Layers (#3) */}
      <motion.div
        style={{ y: parallaxY1 }}
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-soyl-amber/5 blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: parallaxY2 }}
        className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-soyl-teal/5 blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ y: parallaxY3 }}
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-soyl-amber/3 blur-[160px] pointer-events-none"
      />
      {/* Extra parallax grid layer */}
      <motion.div
        style={{ y: parallaxY1 }}
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
      >
        <div className="w-full h-full" style={{
          backgroundImage: "linear-gradient(rgba(245,166,35,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="flex-1 max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-8 items-center pt-24 pb-12"
      >
        {/* Left — Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 lg:gap-8 z-10"
        >
          {/* Tag chip */}
          <motion.div variants={itemVariants}>
            <span className="section-chip">
              <span className="w-1.5 h-1.5 rounded-full bg-soyl-amber animate-pulse" />
              India&apos;s First AI-Native Digital Operations Partner
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-heading font-bold text-5xl md:text-display-xl text-soyl-white leading-tight md:leading-none">
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block mr-[0.2em] ${
                  word === "AI." || word === "Finally." ? "text-gradient-amber" : ""
                }`}
              >
                {word === "\n" ? <br /> : word}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline — Typing Effect (#17) */}
          <motion.div variants={itemVariants}>
            <p className="font-body text-lg text-soyl-gray leading-relaxed max-w-md">
              <TypingText
                text="SOYL Agency gives SMBs the same AI-powered operations that Fortune 500 companies use — at a price that makes sense."
                speed={20}
                delay={1200}
              />
              {" "}
              <span className="text-soyl-white font-medium">Starting at ₹4,999/month</span>.
            </p>
          </motion.div>

          {/* CTAs — Magnetic Buttons (#8) */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <MagneticButton strength={0.35} radius={80}>
              <button
                onClick={() => {
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="btn-amber"
              >
                See Our Services
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </MagneticButton>
            <MagneticButton strength={0.3} radius={70}>
              <button
                onClick={() => {
                  document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="btn-ghost"
              >
                How It Works
              </button>
            </MagneticButton>
          </motion.div>

          {/* Social proof nudge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 pt-2"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-soyl-bg bg-gradient-to-br from-soyl-amber/30 to-soyl-teal/30"
                  style={{ backgroundImage: `hue-rotate(${i * 40}deg)` }}
                />
              ))}
            </div>
            <p className="text-sm font-body text-soyl-gray">
              <span className="text-soyl-white font-medium">200+ SMBs</span> already growing with AI
            </p>
          </motion.div>
        </motion.div>

        {/* Right — 3D Scene (touch-responsive, no static image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[320px] md:h-[480px] lg:h-[640px] w-full"
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-soyl-amber/20 animate-pulse" />
            </div>
          }>
            <div className="relative w-full h-full touch-none">
              <Hero3D />
            </div>
          </Suspense>
        </motion.div>
      </motion.div>

      {/* Outcome ticker */}
      <div className="border-t border-white/5 py-4 overflow-hidden">
        <div
          className="flex gap-8 animate-marquee-left whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-body text-soyl-gray flex-shrink-0">
              <span className="w-1 h-1 rounded-full bg-soyl-amber inline-block" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
