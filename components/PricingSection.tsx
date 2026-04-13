"use client"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { IconCheck } from "@/components/icons/Icons"

const plans = [
  {
    name: "Starter",
    inr: 4999,
    usd: 60,
    tagline: "Get your digital foundation right",
    ideal: "Solo founders, local businesses, side hustles with <₹10L revenue",
    color: "default",
    features: [
      "5-page responsive website",
      "Basic brand kit",
      "Google Analytics setup",
      "WhatsApp Business setup",
      "2 social posts/week (AI-assisted)",
      "Basic lead capture automation",
      "Monthly performance report",
      "Email support",
    ],
    limits: ["1 website", "2 automations", "8 posts/month"],
    cta: "Start with Starter",
    popular: false,
  },
  {
    name: "Growth",
    inr: 12999,
    usd: 155,
    tagline: "Full-stack growth engine",
    ideal: "D2C brands, 1–3 yr old businesses, ₹10L–₹1Cr revenue",
    color: "amber",
    features: [
      "Full e-commerce store or website",
      "Complete brand identity",
      "Meta or Google Ads management",
      "Klaviyo email (4 campaigns/month)",
      "WhatsApp Marketing (2 broadcasts/month)",
      "CRM setup + lead pipeline",
      "AI chatbot on website",
      "10 social posts/month",
      "5 automations",
      "Monthly BI dashboard",
      "Fortnightly strategy call",
    ],
    limits: ["1 store/website", "5 automations", "Up to ₹50K ad spend"],
    cta: "Start Growing",
    popular: true,
  },
  {
    name: "Scale",
    inr: 29999,
    usd: 360,
    tagline: "Enterprise ops at SMB prices",
    ideal: "Established D2C (₹1–10Cr), multi-location, funded startups",
    color: "teal",
    features: [
      "Multi-page website + landing pages",
      "Full performance marketing suite",
      "Meta + Google + WhatsApp ads",
      "Advanced email automation (all flows)",
      "Full CRM + sales pipeline",
      "AI chatbot + WhatsApp bot",
      "SEO programme (on-page + content)",
      "20 social posts + 4 reels/month",
      "15 automations",
      "Advanced BI dashboard",
      "Weekly strategy calls + dedicated AM",
    ],
    limits: ["Up to 2 websites", "15 automations", "Up to ₹2L ad spend"],
    cta: "Scale Up",
    popular: false,
  },
  {
    name: "Enterprise",
    inr: 74999,
    usd: 895,
    tagline: "The full AI-powered backbone",
    ideal: "Multi-brand operators, Series A+, >₹10Cr revenue",
    color: "default",
    features: [
      "Everything in Scale, plus:",
      "Custom AI agent development",
      "Dedicated AI engineer",
      "Multi-brand/store management",
      "Unlimited custom integrations",
      "Predictive analytics models",
      "Voice AI agent",
      "SLA-backed support (6hr response)",
      "Quarterly business reviews",
    ],
    limits: ["Unlimited automations", "Up to 5 websites", "Unlimited ad spend"],
    cta: "Talk to Us",
    popular: false,
  },
]

const ANNUAL_DISCOUNT = 0.2

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly")

  const getPrice = (inr: number) =>
    (billing === "annual" ? Math.round(inr * (1 - ANNUAL_DISCOUNT)) : inr)
      .toLocaleString("en-IN")

  return (
    <section className="section-pad border-t border-white/[0.06]" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-chip mb-4 inline-flex">Pricing</span>
          <h2 className="font-heading font-bold text-display-md text-soyl-white mb-4">
            Pricing that respects your{" "}
            <span className="text-gradient-amber">intelligence.</span>
          </h2>
          <p className="font-body text-soyl-gray max-w-lg mx-auto text-balance">
            No lock-ins until value is proven. Traditional agencies charge ₹50K–₹3L/month
            for what we deliver at ₹12,999.
          </p>
          <div className="relative w-full max-w-3xl mx-auto mt-10 aspect-video rounded-3xl overflow-hidden glass-card border border-soyl-amber/10 mix-blend-lighten shadow-2xl">
            <Image src="/images/pricing_value_1776115414446.png" fill className="object-cover" priority alt="Value Comparison" />
            <div className="absolute inset-0 bg-gradient-to-t from-soyl-bg/80 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-12">
          <div className="glass-card rounded-full p-1 flex gap-1">
            {(["monthly", "annual"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setBilling(opt)}
                className={`relative px-5 py-2 rounded-full text-sm font-heading font-medium transition-all duration-200 ${
                  billing === opt ? "text-soyl-black" : "text-soyl-gray hover:text-soyl-white"
                }`}
              >
                {billing === opt && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 bg-soyl-amber rounded-full"
                  />
                )}
                <span className="relative z-10 capitalize">{opt}</span>
                {opt === "annual" && (
                  <span className={`relative z-10 ml-2 text-xs font-semibold ${
                    billing === "annual" ? "text-soyl-black/70" : "text-soyl-amber"
                  }`}>
                    –20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map((plan, i) => {
            const isAmber = plan.color === "amber"
            const isTeal  = plan.color === "teal"

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative glass-card rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300
                  ${plan.popular
                    ? "border-soyl-amber/40 shadow-amber-md scale-[1.02] bg-soyl-amber/[0.025]"
                    : "hover:border-white/[0.12]"
                  }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="px-3 py-1 bg-soyl-amber text-soyl-black text-xs font-heading font-bold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan name + tagline */}
                <div>
                  <p className={`text-xs font-heading font-bold tracking-[0.12em] uppercase mb-1.5
                    ${isAmber ? "text-soyl-amber" : isTeal ? "text-soyl-teal" : "text-soyl-gray-light"}`}>
                    {plan.name}
                  </p>
                  <p className="text-sm font-body text-soyl-gray leading-snug">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${plan.name}-${billing}`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-baseline gap-1.5"
                    >
                      <span className={`font-heading font-bold text-3xl
                        ${isAmber ? "text-soyl-amber" : isTeal ? "text-soyl-teal" : "text-soyl-white"}`}>
                        ₹{getPrice(plan.inr)}
                      </span>
                      <span className="text-sm font-body text-soyl-gray">/mo</span>
                    </motion.div>
                  </AnimatePresence>
                  <p className="text-xs font-body text-soyl-gray mt-1">
                    ~${billing === "annual"
                      ? Math.round(plan.usd * (1 - ANNUAL_DISCOUNT))
                      : plan.usd} USD/mo
                  </p>
                </div>

                {/* Ideal for */}
                <p className="text-xs font-body text-soyl-gray border border-white/[0.07] rounded-lg p-3 leading-relaxed">
                  <span className="text-soyl-gray-light font-medium">Best for: </span>
                  {plan.ideal}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-2 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm font-body text-soyl-gray">
                      <span className={`mt-0.5 flex-shrink-0
                        ${isAmber ? "text-soyl-amber" : isTeal ? "text-soyl-teal" : "text-soyl-gray-light"}`}>
                        <IconCheck size={13} />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Limits */}
                <div className="border-t border-white/[0.06] pt-4">
                  <p className="text-xs font-heading font-semibold tracking-widest uppercase text-soyl-gray mb-2">
                    Limits
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {plan.limits.map((limit, j) => (
                      <li key={j} className="text-xs font-body text-soyl-gray flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-soyl-gray-dim flex-shrink-0" />
                        {limit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`w-full text-center py-3 rounded-full font-heading font-semibold text-sm tracking-wide transition-all duration-200
                    ${plan.popular
                      ? "bg-soyl-amber text-soyl-black hover:bg-[#FFD080]"
                      : "border border-white/[0.12] text-soyl-white hover:border-white/25 hover:bg-white/[0.04]"
                    }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-10"
        >
          <p className="font-body text-sm text-soyl-gray">
            Not sure which plan?{" "}
            <Link href="/contact" className="text-soyl-amber hover:underline">
              Book a free 30-minute strategy call →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
