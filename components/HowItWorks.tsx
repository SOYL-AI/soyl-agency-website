"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { IconBrief, IconBuild, IconDeploy, IconMonitor, IconExpand } from "@/components/icons/Icons"

const steps = [
  {
    number: "01",
    name: "Brief",
    tagline: "Day 1–2",
    description:
      "You fill our onboarding form. Our AI analyses your business, builds a strategy doc, and creates your Notion workspace — ready for approval in 24 hours.",
    Icon: IconBrief,
    team: "Strategist + PM",
    tools: "Notion, Typeform, Claude",
    color: "amber",
  },
  {
    number: "02",
    name: "Build",
    tagline: "Day 2–14",
    description:
      "We pull from our library of 25+ website templates, 40+ automation blueprints, and 200+ AI prompts. Customisation layered on top — not built from scratch.",
    Icon: IconBuild,
    team: "All specialists",
    tools: "Figma, Webflow, n8n, Canva",
    color: "teal",
  },
  {
    number: "03",
    name: "Deploy",
    tagline: "Day 10–14",
    description:
      "We deploy, test, and hand over with a Loom walkthrough video and full documentation. You go live with a fully operational system.",
    Icon: IconDeploy,
    team: "Engineer + PM",
    tools: "Loom, Notion, Slack",
    color: "amber",
  },
  {
    number: "04",
    name: "Monitor",
    tagline: "Ongoing",
    description:
      "Weekly automated reports land in your inbox. KPI anomaly alerts, monthly strategy reviews, and continuous optimisation — all included.",
    Icon: IconMonitor,
    team: "Strategist + PM",
    tools: "Looker Studio, GA4, Slack",
    color: "teal",
  },
  {
    number: "05",
    name: "Expand",
    tagline: "Month 3+",
    description:
      "At each growth milestone, we identify the next layer — new automations, upgraded plans, or custom AI projects tailored to what you've learned.",
    Icon: IconExpand,
    team: "Strategist + Founder",
    tools: "HubSpot, Notion, Loom",
    color: "amber",
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const isAmber = step.color === "amber"
  const { Icon } = step

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col gap-4 group"
    >
      {/* Number + connector */}
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center
          font-mono text-xs font-bold border transition-all duration-300
          ${isAmber
            ? "border-soyl-amber/40 text-soyl-amber group-hover:bg-soyl-amber group-hover:text-black group-hover:border-soyl-amber"
            : "border-soyl-teal/40 text-soyl-teal group-hover:bg-soyl-teal group-hover:text-black group-hover:border-soyl-teal"
          }`}>
          {step.number}
        </div>
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: index * 0.1 + 0.3 }}
            className="hidden lg:block flex-1 h-px bg-gradient-to-r from-white/10 to-transparent origin-left"
          />
        )}
      </div>

      {/* Card */}
      <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 h-full">
        {/* Icon + title row */}
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5
            ${isAmber ? "bg-soyl-amber/8 text-soyl-amber" : "bg-soyl-teal/8 text-soyl-teal"}`}>
            <Icon size={15} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-heading font-bold text-base text-soyl-white">{step.name}</h3>
              <span className={`flex-shrink-0 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full
                ${isAmber ? "bg-soyl-amber/8 text-soyl-amber" : "bg-soyl-teal/8 text-soyl-teal"}`}>
                {step.tagline}
              </span>
            </div>
          </div>
        </div>

        <p className="font-body text-sm text-soyl-gray leading-relaxed">{step.description}</p>

        <div className="pt-3 border-t border-white/[0.05] flex flex-col gap-1.5">
          <div className="flex gap-2 text-xs">
            <span className="text-soyl-gray/40 font-mono">TEAM</span>
            <span className="text-soyl-gray">{step.team}</span>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="text-soyl-gray/40 font-mono">TOOLS</span>
            <span className="text-soyl-gray">{step.tools}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const lineRef    = useRef<HTMLDivElement>(null)
  const sectionInView = useInView(lineRef, { once: true })

  return (
    <section className="section-pad border-t border-white/[0.06]" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-chip mb-4 inline-flex">The Process</span>
          <h2 className="font-heading font-bold text-display-md text-soyl-white mb-4">
            Brief → Build → Deploy → Monitor → Expand
          </h2>
          <p className="font-body text-soyl-gray max-w-lg mx-auto text-balance">
            Every service runs through the same battle-tested framework.
            70% AI + templates, 30% human expertise.
          </p>
        </motion.div>

        {/* Progress bar */}
        <div ref={lineRef} className="relative mb-12 h-px bg-white/[0.05] overflow-hidden rounded-full">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={sectionInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-soyl-amber via-soyl-teal to-soyl-amber origin-left"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.name} step={step} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-sm text-soyl-gray">
            Operating principle:{" "}
            <span className="text-soyl-white font-medium">
              70% AI + templates, 30% human expertise.
            </span>{" "}
            A technology-powered service firm — not a labour-heavy agency.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
