"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"

const cases = [
  {
    id: "urbanroots",
    label: "D2C Brand",
    company: "UrbanRoots",
    tagline: "Skincare D2C — Instagram-first, zero website",
    result: "₹25L/month revenue in 13 months",
    ltv: "₹9.7L total 24-month LTV",
    color: "amber",
    metrics: [
      { label: "Revenue growth", value: "8x", sub: "₹3L → ₹25L/month" },
      { label: "Email share", value: "25%", sub: "of total revenue" },
      { label: "Support tickets", value: "–65%", sub: "after WhatsApp AI bot" },
      { label: "AOV increase", value: "+22%", sub: "via product recommendation AI" },
    ],
    timeline: [
      { month: "Month 1", plan: "Growth ₹12,999", event: "Shopify + brand identity + GA4 + 2 email flows", outcome: "First ₹50K online" },
      { month: "Month 2–3", plan: "Growth + Add-on", event: "Meta Ads, WhatsApp broadcasts, AI product photos, SEO setup", outcome: "ROAS 3.2x, 18% WhatsApp conversion" },
      { month: "Month 4–5", plan: "Scale ₹29,999", event: "7 Klaviyo flows, AI chatbot, CRM for wholesale, BI dashboard", outcome: "Email = 25% of revenue" },
      { month: "Month 6–8", plan: "Scale", event: "Google Shopping, influencer automation, blog content, inventory alerts", outcome: "Organic traffic 3x, ₹8L/month" },
      { month: "Month 9–12", plan: "Scale + Add-ons", event: "Voice AI for support, product recommendation AI, WhatsApp order tracking bot", outcome: "Support tickets –65%, AOV +22%" },
      { month: "Month 13+", plan: "Enterprise ₹74,999", event: "Dedicated AI engineer, multi-SKU inventory, demand forecasting, D2C analytics", outcome: "₹25L/month, team of 8, AI-run ops" },
    ],
    image: "/images/case_urban_roots_1776115302482.png",
  },
  {
    id: "smilecare",
    label: "Local Clinic",
    company: "SmileCare Dental",
    tagline: "Single dental clinic, Bengaluru — zero online presence",
    result: "200 → 320 patients/month",
    ltv: "₹2.28L total 12-month LTV",
    color: "teal",
    metrics: [
      { label: "Patients/month", value: "+60%", sub: "200 → 320 patients" },
      { label: "Inbound calls", value: "100%", sub: "handled by AI after hours" },
      { label: "WhatsApp bookings", value: "40%", sub: "of new appointments" },
      { label: "Google Maps rank", value: "Top 3", sub: "for 'dental clinic Bengaluru'" },
    ],
    timeline: [
      { month: "Month 1", plan: "Starter ₹4,999", event: "5-page website, Google Business Profile, WhatsApp Business, brand kit", outcome: "First online appointments in week 2" },
      { month: "Month 2–3", plan: "Starter + Add-on", event: "Google Maps local SEO, 8 Instagram posts/month, review request automation", outcome: "Google Maps position 3" },
      { month: "Month 4–5", plan: "Growth ₹12,999", event: "AI chatbot for 24/7 booking, WhatsApp bot for reminders + FAQ, Google Ads", outcome: "40% of bookings via WhatsApp bot" },
      { month: "Month 6–9", plan: "Growth", event: "Patient newsletter, review management (40+ new reviews), re-engagement campaign", outcome: "200 → 320 patients/month" },
      { month: "Month 10–12", plan: "Growth + Add-ons", event: "AI Voice Agent for inbound calls, second location website, patient CRM", outcome: "100% after-hours calls handled by AI" },
    ],
    image: "/images/case_smile_care_1776115315626.png",
  },
]

function TimelineItem({ item, i, color }: { item: typeof cases[0]["timeline"][0]; i: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const isAmber = color === "amber"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="relative pl-8 pb-6 last:pb-0"
    >
      {/* Vertical line */}
      {i < 5 && (
        <div className="absolute left-3 top-4 bottom-0 w-px bg-white/8" />
      )}

      {/* Dot */}
      <div
        className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[9px] font-bold
          ${isAmber ? "border-soyl-amber bg-soyl-amber/10 text-soyl-amber" : "border-soyl-teal bg-soyl-teal/10 text-soyl-teal"}`}
      >
        {i + 1}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-heading font-semibold text-soyl-white">{item.month}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-heading font-medium
            ${isAmber ? "bg-soyl-amber/10 text-soyl-amber" : "bg-soyl-teal/10 text-soyl-teal"}`}>
            {item.plan}
          </span>
        </div>
        <p className="text-xs font-body text-soyl-gray">{item.event}</p>
        <p className={`text-xs font-heading font-semibold ${isAmber ? "text-soyl-amber" : "text-soyl-teal"}`}>
          → {item.outcome}
        </p>
      </div>
    </motion.div>
  )
}

export default function CaseStudies() {
  const [active, setActive] = useState(0)
  const current = cases[active]
  const isAmber = current.color === "amber"

  return (
    <section className="section-pad border-t border-white/5" id="case-studies">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-chip mb-4 inline-flex">Real Results</span>
          <h2 className="font-heading font-bold text-3xl md:text-display-md text-soyl-white mb-4">
            Real businesses.{" "}
            <span className="text-gradient-amber">Real results.</span>
          </h2>
          <p className="font-body text-soyl-gray max-w-lg mx-auto">
            These aren&apos;t projections. They&apos;re documented month-by-month outcomes from
            real SOYL clients.
          </p>
        </motion.div>

        {/* Case selector tabs */}
        <div className="flex gap-3 mb-10 justify-center flex-wrap">
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full font-heading font-medium text-sm transition-all duration-200 border
                ${active === i
                  ? c.color === "amber"
                    ? "bg-soyl-amber/10 border-soyl-amber/40 text-soyl-amber"
                    : "bg-soyl-teal/10 border-soyl-teal/40 text-soyl-teal"
                  : "border-white/10 text-soyl-gray hover:border-white/20 hover:text-soyl-white"
                }`}
            >
              <span className="mr-2 text-[10px] md:text-xs font-body opacity-60">{c.label}</span>
              {c.company}
            </button>
          ))}
        </div>

        {/* Case content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-5 gap-6"
          >
            {/* Left — overview + metrics */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Header card */}
              <div className={`glass-card rounded-2xl p-6 border ${isAmber ? "border-soyl-amber/20" : "border-soyl-teal/20"}`}>
                <p className={`text-xs font-heading font-semibold tracking-widest uppercase mb-1
                  ${isAmber ? "text-soyl-amber" : "text-soyl-teal"}`}>
                  {current.label}
                </p>
                <h3 className="font-heading font-bold text-2xl text-soyl-white mb-1">{current.company}</h3>
                <p className="text-sm font-body text-soyl-gray mb-4">{current.tagline}</p>
                <div className={`h-px w-full mb-4 ${isAmber ? "bg-soyl-amber/20" : "bg-soyl-teal/20"}`} />
                <p className={`font-heading font-bold text-xl ${isAmber ? "text-soyl-amber" : "text-soyl-teal"}`}>
                  {current.result}
                </p>
                <p className="text-xs font-body text-soyl-gray mt-1">{current.ltv}</p>
              </div>

              {/* Case Image */}
              <div className={`relative w-full aspect-video rounded-2xl overflow-hidden glass-card border ${isAmber ? "border-soyl-amber/20" : "border-soyl-teal/20"}`}>
                <Image src={current.image} fill className="object-cover hover:scale-105 transition-transform duration-700" alt={current.company} />
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-3">
                {current.metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
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

            {/* Right — timeline */}
            <div className="lg:col-span-3 glass-card rounded-2xl p-6">
              <p className="text-xs font-heading font-semibold tracking-widest uppercase text-soyl-gray mb-6">
                Month-by-Month Journey
              </p>
              {current.timeline.map((item, i) => (
                <TimelineItem key={i} item={item} i={i} color={current.color} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
