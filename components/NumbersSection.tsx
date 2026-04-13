"use client"

import { motion } from "framer-motion"
import AnimatedCounter from "@/components/ui/AnimatedCounter"

const stats = [
  {
    value: 63,
    suffix: "M+",
    label: "Indian SMBs",
    sub: "All underserved by enterprise-grade AI — until now",
    color: "amber",
  },
  {
    value: 70,
    suffix: "%",
    label: "AI-Driven Delivery",
    sub: "Every service is 70% AI + templates, 30% human expertise",
    color: "teal",
  },
  {
    value: 14,
    suffix: " days",
    label: "Average Delivery",
    sub: "From brief to live — using AI + pre-built systems",
    color: "amber",
  },
  {
    value: 65,
    suffix: "%+",
    label: "Gross Margin",
    sub: "Structurally higher margins than any traditional agency",
    color: "teal",
  },
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
            The numbers don&apos;t lie.
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="glass-card bg-soyl-bg p-8 lg:p-10 flex flex-col gap-3 group hover:bg-white/[0.04] transition-colors duration-300"
            >
              {/* Big number */}
              <div
                className={`font-heading font-bold text-5xl lg:text-6xl leading-none ${
                  stat.color === "amber" ? "text-gradient-amber" : "text-gradient-teal"
                }`}
              >
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2000}
                />
              </div>

              {/* Label */}
              <p className="font-heading font-semibold text-lg text-soyl-white">
                {stat.label}
              </p>

              {/* Sub text */}
              <p className="font-body text-sm text-soyl-gray leading-relaxed">
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
          ))}
        </motion.div>
      </div>
    </section>
  )
}
