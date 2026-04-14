"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Hero3D from "@/components/3d/Hero3D"

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

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" id="hero">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-soyl-amber/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-soyl-teal/5 blur-[100px] pointer-events-none" />

      {/* Main content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-8 items-center pt-24 pb-12">
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

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="font-body text-lg text-soyl-gray leading-relaxed max-w-md"
          >
            SOYL Agency gives SMBs the same AI-powered operations that Fortune 500
            companies use — at a price that makes sense. Starting at{" "}
            <span className="text-soyl-white font-medium">₹4,999/month</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
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
            <button
              onClick={() => {
                document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="btn-ghost"
            >
              How It Works
            </button>
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

        {/* Right — 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[320px] md:h-[480px] lg:h-[640px] w-full"
        >
          <div className="absolute inset-0 pointer-events-none -scale-x-100 opacity-60 mix-blend-screen mask-image-radial z-0">
            <Image src="/images/hero_3d_primary_1776115228562.png" fill className="object-contain" alt="Hero 3D Visual" priority />
          </div>
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center relative z-10">
              <div className="w-24 h-24 rounded-full border border-soyl-amber/20 animate-pulse" />
            </div>
          }>
            <div className="relative w-full h-full z-10">
              <Hero3D />
            </div>
          </Suspense>
        </motion.div>
      </div>

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
