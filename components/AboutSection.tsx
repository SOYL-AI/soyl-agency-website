"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import AnimatedCounter from "@/components/ui/AnimatedCounter"

const phases = [
  { name: "Foundation", timeline: "Months 1–6", milestone: "25 clients, core templates, SOPs locked", mrr: "₹5–8L MRR" },
  { name: "Growth", timeline: "Months 7–12", milestone: "75 clients, full suite, 5 Enterprise clients", mrr: "₹20–35L MRR" },
  { name: "Scale", timeline: "Year 2", milestone: "200+ clients, vertical packages, white-label", mrr: "₹60–80L MRR" },
  { name: "Productize", timeline: "Year 3", milestone: "Proprietary client portal, first SaaS product", mrr: "₹1–1.5Cr MRR" },
  { name: "Platform", timeline: "Year 4–5", milestone: "Full SaaS platform, Series A, regional expansion", mrr: "₹5Cr+ MRR" },
]

const teamStats = [
  { value: 12, suffix: "", label: "Lean team", sub: "8–12 people + AI agents" },
  { value: 70, suffix: "%", label: "AI-delivered", sub: "Every service, every time" },
  { value: 65, suffix: "%", label: "Gross margin", sub: "Structurally superior economics" },
]

export default function AboutSection() {
  return (
    <section className="section-pad border-t border-white/5" id="about">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-chip mb-4 inline-flex">Our Mission</span>
          <h2 className="font-heading font-bold text-3xl md:text-display-md text-soyl-white max-w-3xl">
            We are not an agency. We are your{" "}
            <span className="text-gradient-amber">AI-powered operations partner.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — philosophy + stats */}
          <div className="flex flex-col gap-8">
            {/* Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-8 border-soyl-amber/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-lighten mask-image-radial">
                <Image src="/images/about_team_1776115329033.png" fill className="object-cover" alt="Node Network" />
              </div>
              <div className="relative z-10 w-8 h-8 rounded-full bg-soyl-amber/10 flex items-center justify-center mb-4">
                <span className="text-soyl-amber text-sm font-heading font-bold">S</span>
              </div>
              <blockquote className="font-heading font-medium text-xl text-soyl-white leading-relaxed mb-4">
                &ldquo;SOYL stands for Story Of Your Life. We believe every business has a story
                worth telling, and AI should be the tool that helps you tell it louder.&rdquo;
              </blockquote>
              <p className="font-body text-sm text-soyl-gray">
                We&apos;re democratising the technology that Fortune 500 companies use — one SMB at
                a time. Our edge isn&apos;t our tools. Tools are commodities. Our edge is our systems,
                our AI-augmented delivery, our subscription model, and the trust we build with every
                client who sees their business transformed.
              </p>
            </motion.div>

            {/* Mission stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center glass-card rounded-2xl p-8"
            >
              <p className="font-heading font-bold text-5xl text-gradient-amber mb-2">10,000+</p>
              <p className="font-heading font-semibold text-lg text-soyl-white mb-1">SMBs.</p>
              <p className="font-body text-sm text-soyl-gray">
                That&apos;s our north star — 10,000+ businesses running on the SOYL AI backbone.
                India alone has 63 million SMBs. We need to capture{" "}
                <span className="text-soyl-white">0.01%</span> to build a ₹100Cr company.
              </p>
            </motion.div>

            {/* Team stats */}
            <div className="grid grid-cols-3 gap-3">
              {teamStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <p className="font-heading font-bold text-2xl text-gradient-teal">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs font-heading font-semibold text-soyl-white mt-1">{stat.label}</p>
                  <p className="text-[10px] font-body text-soyl-gray mt-0.5">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — roadmap */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none mix-blend-screen -ml-12 scale-110">
              <Image src="/images/about_roadmap_1776115347428.png" fill className="object-cover" alt="Roadmap Beam" />
              <div className="absolute inset-0 bg-gradient-to-b from-soyl-bg via-transparent to-soyl-bg" />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-heading font-semibold tracking-widest uppercase text-soyl-gray mb-6">
                5-Phase Growth Roadmap
              </p>
              <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/6" />

              <div className="flex flex-col gap-0">
                {phases.map((phase, i) => (
                  <motion.div
                    key={phase.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-12 pb-8 last:pb-0 group"
                  >
                    {/* Node */}
                    <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full border-2 border-soyl-amber/30 bg-soyl-bg flex items-center justify-center text-xs font-heading font-bold text-soyl-amber group-hover:border-soyl-amber group-hover:bg-soyl-amber/10 transition-all duration-300">
                      {i + 1}
                    </div>

                    {/* Content */}
                    <div className="glass-card rounded-xl p-4 hover:border-soyl-amber/20 transition-colors duration-200">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-heading font-bold text-soyl-white">Phase {i + 1}: {phase.name}</span>
                        <span className="text-xs font-heading font-medium text-soyl-amber bg-soyl-amber/10 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                          {phase.timeline}
                        </span>
                      </div>
                      <p className="text-xs font-body text-soyl-gray mb-2">{phase.milestone}</p>
                      <p className="text-sm font-heading font-semibold text-gradient-amber">{phase.mrr}</p>
                    </div>
                  </motion.div>
                ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5"
        >
          {[
            { label: "Move Fast", text: "Ship imperfect. Improve fast. First 10 clients teach you more than any plan." },
            { label: "Stay Lean", text: "Every hire, every tool, every expense — justify it against MRR impact." },
            { label: "Scale Smart", text: "Systems before headcount. Templates before custom. Automate before hiring." },
          ].map((item, i) => (
            <div key={i} className="bg-soyl-bg p-8 text-center">
              <p className="font-heading font-bold text-lg text-soyl-amber mb-2">{item.label}</p>
              <p className="font-body text-sm text-soyl-gray leading-relaxed">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
