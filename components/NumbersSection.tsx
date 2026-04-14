"use client"

import { motion } from "framer-motion"
import ProgressRing from "@/components/ui/ProgressRing"
import TextScramble from "@/components/ui/TextScramble"
import CardSpotlight from "@/components/ui/CardSpotlight"

const stats = [
  {
    value: 63,
    suffix: "M+",
    label: "Indian SMBs",
    sub: "All underserved by enterprise-grade AI — until now",
    color: "amber",
    max: 100,
  },
  {
    value: 70,
    suffix: "%",
    label: "AI-Driven Delivery",
    sub: "Every service is 70% AI + templates, 30% human expertise",
    color: "teal",
    max: 100,
  },
  {
    value: 14,
    suffix: " days",
    label: "Average Delivery",
    sub: "From brief to live — using AI + pre-built systems",
    color: "amber",
    max: 30,
  },
  {
    value: 65,
    suffix: "%+",
    label: "Gross Margin",
    sub: "Structurally higher margins than any traditional agency",
    color: "teal",
    max: 100,
  },
]

// Stats ticker data (#22)
const tickerItems = [
  "3 new clients this week",
  "147 automations running",
  "12 AI agents deployed",
  "₹2.3Cr revenue generated",
  "3,400+ support tickets handled by AI",
  "98.7% uptime across all systems",
  "42 websites launched this quarter",
  "8 enterprise clients onboarded",
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function NumbersSection() {
  return (
    <section className="section-pad border-t border-white/5" id="numbers">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-chip mb-4 inline-flex">The Opportunity</span>
          <h2 className="font-heading font-bold text-display-md text-soyl-white">
            <TextScramble text="The numbers don't lie." speed={35} />
          </h2>
        </motion.div>

        {/* Stats grid with Progress Rings (#2) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5"
        >
          {stats.map((stat, i) => (
            <CardSpotlight key={i} teal={stat.color === "teal"}>
              <motion.div
                variants={cardVariants}
                className="glass-card bg-soyl-bg p-8 lg:p-10 flex flex-col items-center gap-4 group hover:bg-white/[0.04] transition-colors duration-300"
              >
                {/* Progress Ring (#2) */}
                <ProgressRing
                  value={stat.value}
                  max={stat.max}
                  size={100}
                  strokeWidth={2.5}
                  color={stat.color === "amber" ? "#F5A623" : "#AFD0CC"}
                >
                  <div
                    className={`font-heading font-bold text-2xl leading-none ${
                      stat.color === "amber" ? "text-gradient-amber" : "text-gradient-teal"
                    }`}
                  >
                    {stat.value}{stat.suffix}
                  </div>
                </ProgressRing>

                {/* Label */}
                <p className="font-heading font-semibold text-lg text-soyl-white text-center">
                  {stat.label}
                </p>

                {/* Sub text */}
                <p className="font-body text-sm text-soyl-gray leading-relaxed text-center">
                  {stat.sub}
                </p>

                {/* Decorative line */}
                <div
                  className={`mt-auto h-px w-0 group-hover:w-full transition-all duration-500 ${
                    stat.color === "amber"
                      ? "bg-gradient-to-r from-soyl-amber/60 to-transparent"
                      : "bg-gradient-to-r from-soyl-teal/60 to-transparent"
                  }`}
                />
              </motion.div>
            </CardSpotlight>
          ))}
        </motion.div>

        {/* Live Stats Ticker (#22) */}
        <div className="mt-10 border border-white/[0.06] rounded-full overflow-hidden py-3">
          <div
            className="flex gap-10 animate-marquee-left whitespace-nowrap"
            style={{ width: "max-content" }}
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-xs font-body text-soyl-gray/80 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-soyl-teal animate-pulse" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
