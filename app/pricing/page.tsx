"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { IconCheck, IconArrow } from "@/components/icons/Icons"

const plans = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Establish your digital presence",
    monthlyINR: 4999,
    monthlyUSD: 60,
    highlight: false,
    features: [
      "5-page responsive website",
      "Google Business Profile setup",
      "Basic SEO structure",
      "WhatsApp Business setup",
      "Monthly performance report",
      "2 automation workflows",
      "Email support",
    ],
    limits: "Up to 2 active projects",
    cta: "Start with Starter",
    color: "default",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "The most popular choice",
    monthlyINR: 12999,
    monthlyUSD: 156,
    highlight: true,
    features: [
      "Everything in Starter",
      "Full e-commerce store (Shopify/WooCommerce)",
      "Performance marketing (Meta + Google)",
      "AI chatbot + WhatsApp automation",
      "CRM setup + lead pipelines",
      "Klaviyo email flows (5 sequences)",
      "Weekly automated reports",
      "Real-time analytics dashboard",
      "10 automation workflows",
      "Slack + priority support",
    ],
    limits: "Up to 5 active projects",
    cta: "Start with Growth",
    color: "amber",
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For businesses ready to systemise",
    monthlyINR: 29999,
    monthlyUSD: 360,
    highlight: false,
    features: [
      "Everything in Growth",
      "Operations automation (HR, ops, finance)",
      "Custom AI chatbot with RAG",
      "Advanced BI (Looker Studio + custom views)",
      "Voice AI for inbound calls",
      "Multi-channel content production",
      "Unlimited automation workflows",
      "Dedicated account manager",
      "Monthly strategy session (60 min)",
    ],
    limits: "Up to 10 active projects",
    cta: "Start with Scale",
    color: "teal",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For high-growth SMBs",
    monthlyINR: 74999,
    monthlyUSD: 900,
    highlight: false,
    features: [
      "Everything in Scale",
      "Dedicated AI engineer (part-time)",
      "Custom AI agent development",
      "White-label reporting",
      "Multi-location support",
      "Demand forecasting models",
      "SLA-backed delivery",
      "Direct founder access",
      "Quarterly business review",
    ],
    limits: "Unlimited projects",
    cta: "Contact for Enterprise",
    color: "default",
  },
]

const addOns = [
  { name: "Branding & Identity",     price: "₹8,999",  desc: "Logo, brand guidelines, social templates" },
  { name: "AI Voice Agent",           price: "₹14,999", desc: "Inbound call handling, lead qualification" },
  { name: "Custom Tech Integration",  price: "₹12,999", desc: "API integrations, ERP / accounting sync" },
  { name: "Video Production",         price: "₹6,999",  desc: "4 short-form videos/month, scripted + edited" },
  { name: "Additional Website",       price: "₹7,999",  desc: "Each additional 5-page site" },
  { name: "Custom AI Agent",          price: "₹49,999+",desc: "LangGraph / RAG agent for your specific use case" },
]

function PlanCard({ plan, annual }: { plan: typeof plans[0]; annual: boolean }) {
  const monthly   = plan.monthlyINR
  const displayed = annual ? Math.round(monthly * 0.8) : monthly
  const usd       = annual ? Math.round(plan.monthlyUSD * 0.8) : plan.monthlyUSD
  const isAmber   = plan.color === "amber"
  const isTeal    = plan.color === "teal"

  return (
    <motion.div
      layout
      className={`relative flex flex-col rounded-2xl p-7 border transition-all duration-300
        ${plan.highlight
          ? "border-soyl-amber/40 bg-soyl-amber/[0.03] shadow-amber-md"
          : "glass-card"
        }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 rounded-full bg-soyl-amber text-soyl-black text-[10px] font-heading font-bold tracking-widest uppercase">
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="font-heading font-bold text-lg text-soyl-white mb-1">{plan.name}</h3>
        <p className="font-body text-xs text-soyl-gray">{plan.tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={annual ? "annual" : "monthly"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-baseline gap-1.5">
              <span className={`font-heading font-bold text-4xl ${
                isAmber ? "text-soyl-amber" : isTeal ? "text-soyl-teal" : "text-soyl-white"
              }`}>
                ₹{displayed.toLocaleString("en-IN")}
              </span>
              <span className="text-soyl-gray font-body text-sm">/mo</span>
            </div>
            <p className="text-xs text-soyl-gray/60 font-mono mt-1">
              ~${usd} USD{annual && " · billed annually"}
            </p>
          </motion.div>
        </AnimatePresence>
        {annual && (
          <p className="text-xs text-soyl-teal mt-2 font-body">
            Save ₹{((monthly - displayed) * 12).toLocaleString("en-IN")}/year
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2.5 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm font-body text-soyl-gray">
            <span className={`mt-0.5 flex-shrink-0 ${
              isAmber ? "text-soyl-amber" : isTeal ? "text-soyl-teal" : "text-soyl-white/50"
            }`}>
              <IconCheck size={13} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <p className="text-[11px] font-mono text-soyl-gray/40 mb-4">{plan.limits}</p>

      <Link
        href="/contact"
        className={`w-full text-center py-3 rounded-full font-heading font-semibold text-sm tracking-wide transition-all duration-200
          ${plan.highlight
            ? "bg-soyl-amber text-soyl-black hover:bg-[#FFD080]"
            : "border border-white/15 text-soyl-white hover:border-white/30 hover:bg-white/[0.04]"
          }`}
      >
        {plan.cta}
      </Link>
    </motion.div>
  )
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Hero */}
        <section className="page-hero border-b border-white/[0.06] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-soyl-amber/[0.04] blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="section-chip mb-6 inline-flex">Transparent Pricing</span>
              <h1 className="font-heading font-bold text-display-lg text-soyl-white mb-5 leading-none">
                Simple pricing.<br />
                <span className="text-gradient-amber">No surprises.</span>
              </h1>
              <p className="font-body text-soyl-gray max-w-lg mx-auto text-balance">
                Monthly subscriptions with clear deliverables. Cancel anytime.
                No lock-in until you see results.
              </p>
            </motion.div>

            {/* Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3 mt-10"
            >
              <span className={`text-sm font-body ${!annual ? "text-soyl-white" : "text-soyl-gray"}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300
                  ${annual ? "bg-soyl-amber" : "bg-white/10"}`}
              >
                <motion.span
                  animate={{ x: annual ? 24 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white block"
                />
              </button>
              <span className={`text-sm font-body ${annual ? "text-soyl-white" : "text-soyl-gray"}`}>
                Annual <span className="text-soyl-teal text-xs">–20%</span>
              </span>
            </motion.div>
          </div>
        </section>

        {/* Plans grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <PlanCard plan={plan} annual={annual} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="section-chip mb-4 inline-flex">Add-ons</span>
              <h2 className="font-heading font-bold text-display-sm text-soyl-white mb-3">
                Extend any plan
              </h2>
              <p className="font-body text-soyl-gray max-w-md text-balance">
                One-time or monthly add-ons that stack on top of any subscription.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {addOns.map((addon, i) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="glass-card rounded-xl p-5 hover:border-soyl-amber/20 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-heading font-semibold text-sm text-soyl-white mb-1">{addon.name}</p>
                      <p className="font-body text-xs text-soyl-gray">{addon.desc}</p>
                    </div>
                    <span className="font-heading font-bold text-soyl-amber text-sm flex-shrink-0">{addon.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ strip */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading font-bold text-display-sm text-soyl-white mb-4">
                Still not sure which plan fits?
              </h2>
              <p className="font-body text-soyl-gray mb-8 text-balance">
                Book a free 30-minute strategy call. We&apos;ll assess your business and
                recommend the exact plan and add-ons you need.
              </p>
              <Link href="/contact" className="btn-amber">
                Book Free Strategy Call
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
