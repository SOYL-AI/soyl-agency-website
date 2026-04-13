"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { IconArrow } from "@/components/icons/Icons"

const values = [
  {
    label: "Move Fast",
    text: "Ship imperfect. Improve fast. The first 10 clients teach more than any plan.",
    accent: "amber",
  },
  {
    label: "Stay Lean",
    text: "Every hire, every tool, every expense — justified against MRR impact.",
    accent: "teal",
  },
  {
    label: "Scale Smart",
    text: "Systems before headcount. Templates before custom. Automate before hiring.",
    accent: "amber",
  },
  {
    label: "AI-First",
    text: "Every service is 70% AI. Not AI-assisted — AI-led, with human oversight.",
    accent: "teal",
  },
]

const phases = [
  { name: "Foundation", timeline: "Months 1–6",  milestone: "25 clients, core templates, SOPs locked",          mrr: "₹5–8L MRR" },
  { name: "Growth",     timeline: "Months 7–12", milestone: "75 clients, full suite, 5 Enterprise clients",     mrr: "₹20–35L MRR" },
  { name: "Scale",      timeline: "Year 2",      milestone: "200+ clients, vertical packages, white-label",     mrr: "₹60–80L MRR" },
  { name: "Productize", timeline: "Year 3",      milestone: "Proprietary client portal, first SaaS product",    mrr: "₹1–1.5Cr MRR" },
  { name: "Platform",   timeline: "Year 4–5",    milestone: "Full SaaS platform, Series A, regional expansion", mrr: "₹5Cr+ MRR" },
]

const stats = [
  { value: "8–12",  suffix: "",   label: "Team size",       sub: "People + AI agents" },
  { value: "70",    suffix: "%",  label: "AI-delivered",    sub: "Every service, every time" },
  { value: "65",    suffix: "%+", label: "Gross margin",    sub: "Structurally superior" },
  { value: "14",    suffix: "d",  label: "Avg delivery",    sub: "From brief to live" },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Hero */}
        <section className="page-hero border-b border-white/[0.06] relative overflow-hidden">
          <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-soyl-teal/[0.03] blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <span className="section-chip mb-6 inline-flex">Our Mission</span>
              <h1 className="font-heading font-bold text-display-lg text-soyl-white mb-6 leading-none">
                We are not an agency.
                <br />
                <span className="text-gradient-teal">We are your AI operations partner.</span>
              </h1>
              <p className="font-body text-lg text-soyl-gray max-w-2xl leading-relaxed text-balance">
                SOYL stands for <span className="text-soyl-white">Story Of Your Life.</span> We believe
                every business has a story worth telling — and AI should be the tool that helps you
                tell it louder. We&apos;re democratising Fortune 500-grade operations for India&apos;s
                63 million SMBs, one subscription at a time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-soyl-bg px-8 py-10"
                >
                  <p className="font-heading font-bold text-4xl text-gradient-amber mb-1.5">
                    {s.value}{s.suffix}
                  </p>
                  <p className="font-heading font-semibold text-soyl-white text-sm">{s.label}</p>
                  <p className="font-body text-xs text-soyl-gray mt-0.5">{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Manifesto + Philosophy */}
        <section className="py-24 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left — philosophy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-mono text-soyl-gray/40 tracking-widest uppercase mb-6">Philosophy</p>
                <blockquote className="font-heading font-medium text-2xl text-soyl-white leading-relaxed mb-6 border-l-2 border-soyl-amber/40 pl-6">
                  &ldquo;SOYL stands for Story Of Your Life. We believe every business has a story
                  worth telling, and AI should be the tool that helps you tell it louder.&rdquo;
                </blockquote>
                <p className="font-body text-sm text-soyl-gray leading-relaxed">
                  We&apos;re not just another digital agency. Our edge isn&apos;t our tools — tools
                  are commodities. Our edge is our systems, our AI-augmented delivery, our
                  subscription model, and the trust we build with every client who sees their
                  business transformed. We operate as a technology-powered service firm: 70% AI
                  and templates, 30% human expertise. This gives us structurally better economics
                  and structurally faster delivery than any traditional agency.
                </p>

                {/* North star */}
                <div className="mt-8 p-6 rounded-2xl border border-soyl-amber/15 bg-soyl-amber/[0.03]">
                  <p className="font-heading font-bold text-4xl text-gradient-amber mb-2">10,000+</p>
                  <p className="font-heading font-semibold text-lg text-soyl-white mb-2">
                    SMBs on the SOYL backbone.
                  </p>
                  <p className="font-body text-sm text-soyl-gray">
                    India has 63 million SMBs. We need 0.01% to build a ₹100Cr company.
                    Every client is a step toward that north star.
                  </p>
                </div>
              </motion.div>

              {/* Right — values */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-xs font-mono text-soyl-gray/40 tracking-widest uppercase mb-6">Core Values</p>
                <div className="flex flex-col gap-4">
                  {values.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="glass-card rounded-xl p-5 hover:border-soyl-amber/20 transition-colors duration-200 group"
                    >
                      <p className={`font-heading font-bold text-base mb-1.5 ${v.accent === "amber" ? "text-soyl-amber" : "text-soyl-teal"}`}>
                        {v.label}
                      </p>
                      <p className="font-body text-sm text-soyl-gray">{v.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5-Phase Roadmap */}
        <section className="py-24 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <span className="section-chip mb-4 inline-flex">Roadmap</span>
              <h2 className="font-heading font-bold text-display-sm text-soyl-white mb-3">
                5-Phase Growth Roadmap
              </h2>
              <p className="font-body text-soyl-gray max-w-md text-balance">
                Where we are, where we&apos;re going, and what each milestone means.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-px bg-white/[0.06]" />
              <div className="flex flex-col gap-4">
                {phases.map((phase, i) => (
                  <motion.div
                    key={phase.name}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-0 top-4 w-12 h-12 rounded-full border-2 border-soyl-amber/30 bg-soyl-bg flex items-center justify-center text-sm font-heading font-bold text-soyl-amber hover:border-soyl-amber hover:bg-soyl-amber/10 transition-all duration-300 cursor-default">
                      {i + 1}
                    </div>
                    <div className="glass-card rounded-xl p-5 hover:border-soyl-amber/20 transition-colors duration-200">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-heading font-bold text-soyl-white">Phase {i + 1}: {phase.name}</p>
                          <p className="text-xs font-body text-soyl-gray mt-0.5">{phase.milestone}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-mono text-soyl-gray/50">{phase.timeline}</p>
                          <p className="font-heading font-semibold text-sm text-gradient-amber mt-0.5">{phase.mrr}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading font-bold text-display-sm text-soyl-white mb-4">
                Want to be part of the story?
              </h2>
              <p className="font-body text-soyl-gray mb-8 max-w-md mx-auto text-balance">
                Whether you&apos;re a business ready to grow or a specialist who wants to build
                AI-powered systems — we&apos;d love to talk.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="btn-amber">
                  Work With Us <IconArrow size={14} />
                </Link>
                <Link href="/pricing" className="btn-ghost">
                  View Pricing
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
