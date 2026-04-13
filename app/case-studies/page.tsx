"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { IconArrow } from "@/components/icons/Icons"

const cases = [
  {
    id: "urbanroots",
    label: "D2C Skincare",
    company: "UrbanRoots",
    location: "Mumbai, Maharashtra",
    tagline: "Instagram-first skincare brand with zero website, zero automation",
    challenge: "UrbanRoots had a passionate Instagram following but no website, no email list, and no system for retaining customers. Every order was manually processed over DM. Customer support was eating 3 hours/day of the founder's time. They were doing ₹3L/month and had hit a ceiling.",
    result: "₹25L/month revenue in 13 months",
    ltv: "₹9.7L total 24-month LTV",
    color: "amber",
    metrics: [
      { label: "Revenue growth",   value: "8×",   sub: "₹3L → ₹25L/month" },
      { label: "Email share",      value: "25%",  sub: "of total revenue" },
      { label: "Support tickets",  value: "–65%", sub: "after WhatsApp AI" },
      { label: "AOV increase",     value: "+22%", sub: "via recommendation AI" },
    ],
    timeline: [
      { month: "Month 1",    plan: "Growth ₹12,999",    event: "Shopify store, brand identity, GA4, 2 email welcome flows",          outcome: "First ₹50K online in week 3" },
      { month: "Month 2–3",  plan: "Growth + Add-on",   event: "Meta Ads, WhatsApp broadcast sequences, AI product photos, SEO setup", outcome: "ROAS 3.2×, 18% WhatsApp conversion" },
      { month: "Month 4–5",  plan: "Scale ₹29,999",     event: "7 Klaviyo flows, AI chatbot, wholesale CRM, BI dashboard",           outcome: "Email = 25% of total revenue" },
      { month: "Month 6–8",  plan: "Scale",              event: "Google Shopping, influencer automation, blog content, inventory alerts", outcome: "Organic traffic 3×, ₹8L/month" },
      { month: "Month 9–12", plan: "Scale + Add-ons",   event: "AI Voice for support, product recommendation engine, WhatsApp tracking bot", outcome: "Support tickets –65%, AOV +22%" },
      { month: "Month 13+",  plan: "Enterprise ₹74,999", event: "Dedicated AI engineer, multi-SKU inventory, demand forecasting",    outcome: "₹25L/month, team of 8, AI-run ops" },
    ],
  },
  {
    id: "smilecare",
    label: "Healthcare Clinic",
    company: "SmileCare Dental",
    location: "Bengaluru, Karnataka",
    tagline: "Single dental clinic with zero online presence, manually booking every appointment",
    challenge: "SmileCare was running entirely on word-of-mouth and a basic Google listing. Appointment bookings happened via phone — and the phone wasn't being answered after 6pm. They were losing 20–30% of inbound leads to competitors who had online booking. No reviews, no website, no automation.",
    result: "200 → 320 patients/month in 12 months",
    ltv: "₹2.28L total 12-month LTV",
    color: "teal",
    metrics: [
      { label: "Patients/month",    value: "+60%",  sub: "200 → 320 patients" },
      { label: "After-hours calls", value: "100%",  sub: "handled by AI Voice" },
      { label: "WhatsApp bookings", value: "40%",   sub: "of new appointments" },
      { label: "Google Maps rank",  value: "Top 3", sub: "for 'dental Bengaluru'" },
    ],
    timeline: [
      { month: "Month 1",    plan: "Starter ₹4,999",    event: "5-page website, Google Business Profile, WhatsApp Business, brand kit", outcome: "First online appointments in week 2" },
      { month: "Month 2–3",  plan: "Starter + Add-on",  event: "Google Maps local SEO, 8 Instagram posts/month, review request automation", outcome: "Google Maps position 3" },
      { month: "Month 4–5",  plan: "Growth ₹12,999",    event: "AI chatbot for 24/7 booking, WhatsApp reminder + FAQ bot, Google Ads", outcome: "40% of bookings via WhatsApp bot" },
      { month: "Month 6–9",  plan: "Growth",             event: "Patient newsletter, 40+ new reviews, re-engagement campaign",           outcome: "200 → 320 patients/month" },
      { month: "Month 10–12", plan: "Growth + Add-ons", event: "AI Voice Agent for inbound calls, second location site, patient CRM",    outcome: "100% after-hours calls handled by AI" },
    ],
  },
]

function TimelineRow({ item, i, color }: { item: typeof cases[0]["timeline"][0]; i: number; color: string }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-30px" })
  const isAmber = color === "amber"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      className="grid grid-cols-[auto_1fr] gap-6 group"
    >
      {/* Left: dot + line */}
      <div className="flex flex-col items-center gap-0">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-mono font-bold flex-shrink-0
          ${isAmber ? "border-soyl-amber/50 text-soyl-amber bg-soyl-amber/5" : "border-soyl-teal/50 text-soyl-teal bg-soyl-teal/5"}`}>
          {i + 1}
        </div>
        {i < 5 && <div className="w-px flex-1 min-h-[24px] bg-white/[0.07] mt-1" />}
      </div>

      {/* Right: content */}
      <div className="pb-7 last:pb-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-sm font-heading font-semibold text-soyl-white">{item.month}</span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full
            ${isAmber ? "bg-soyl-amber/8 text-soyl-amber" : "bg-soyl-teal/8 text-soyl-teal"}`}>
            {item.plan}
          </span>
        </div>
        <p className="text-sm font-body text-soyl-gray mb-1.5">{item.event}</p>
        <p className={`text-sm font-heading font-medium
          ${isAmber ? "text-soyl-amber" : "text-soyl-teal"}`}>
          → {item.outcome}
        </p>
      </div>
    </motion.div>
  )
}

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Hero */}
        <section className="page-hero border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <span className="section-chip mb-6 inline-flex">Real Results</span>
              <h1 className="font-heading font-bold text-display-lg text-soyl-white mb-5 leading-none">
                Real businesses.{" "}
                <span className="text-gradient-amber">Real numbers.</span>
              </h1>
              <p className="font-body text-lg text-soyl-gray max-w-xl text-balance">
                These aren&apos;t projections or estimates. Every milestone below is documented,
                month-by-month, from real SOYL clients.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cases */}
        {cases.map((c, caseIdx) => {
          const isAmber = c.color === "amber"
          return (
            <section
              key={c.id}
              className={`py-24 border-b border-white/[0.06] ${caseIdx % 2 === 1 ? "bg-white/[0.01]" : ""}`}
            >
              <div className="max-w-7xl mx-auto px-6">
                {/* Case header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-14"
                >
                  <p className={`text-xs font-mono tracking-widest uppercase mb-2
                    ${isAmber ? "text-soyl-amber/70" : "text-soyl-teal/70"}`}>
                    {c.label} · {c.location}
                  </p>
                  <h2 className="font-heading font-bold text-display-sm text-soyl-white mb-2">
                    {c.company}
                  </h2>
                  <p className="font-body text-soyl-gray max-w-xl">{c.tagline}</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                  {/* Left: challenge + metrics */}
                  <div className="flex flex-col gap-8">
                    {/* Challenge */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-xs font-mono text-soyl-gray/40 tracking-widest uppercase mb-3">The Challenge</p>
                      <p className="font-body text-sm text-soyl-gray leading-relaxed">{c.challenge}</p>
                    </motion.div>

                    {/* Result banner */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className={`p-6 rounded-2xl border ${isAmber ? "border-soyl-amber/20 bg-soyl-amber/[0.03]" : "border-soyl-teal/20 bg-soyl-teal/[0.03]"}`}
                    >
                      <p className={`font-heading font-bold text-2xl mb-1 ${isAmber ? "text-soyl-amber" : "text-soyl-teal"}`}>
                        {c.result}
                      </p>
                      <p className="font-body text-xs text-soyl-gray">{c.ltv}</p>
                    </motion.div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {c.metrics.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.07 }}
                          className="glass-card rounded-xl p-4"
                        >
                          <p className={`font-heading font-bold text-2xl ${isAmber ? "text-soyl-amber" : "text-soyl-teal"}`}>
                            {m.value}
                          </p>
                          <p className="text-xs font-heading font-semibold text-soyl-white mt-0.5">{m.label}</p>
                          <p className="text-[11px] font-body text-soyl-gray">{m.sub}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: timeline */}
                  <div>
                    <p className="text-xs font-mono text-soyl-gray/40 tracking-widest uppercase mb-8">
                      Month-by-Month Journey
                    </p>
                    {c.timeline.map((item, i) => (
                      <TimelineRow key={i} item={item} i={i} color={c.color} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )
        })}

        {/* CTA */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading font-bold text-display-sm text-soyl-white mb-4">
                Your business could be our next case study.
              </h2>
              <p className="font-body text-soyl-gray mb-8 max-w-md mx-auto text-balance">
                Book a free strategy call and let&apos;s map out what your growth
                journey could look like.
              </p>
              <Link href="/contact" className="btn-amber">
                Start Your Journey
                <IconArrow size={14} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
