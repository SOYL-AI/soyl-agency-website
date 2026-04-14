"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useLayoutEffect, useCallback } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import CardSpotlight from "@/components/ui/CardSpotlight"
import TextScramble from "@/components/ui/TextScramble"
import MagneticButton from "@/components/ui/MagneticButton"
import {
  IconWebsite, IconAutomation, IconBranding, IconMarketing,
  IconCRM, IconOperations, IconSupport, IconAnalytics,
  IconContent, IconSEO, IconIntegrations, IconAIAgents,
} from "@/components/icons/Icons"

const services = [
  {
    Icon: IconWebsite,
    name: "Website & E-Commerce",
    value: "5–8 page sites to full Shopify stores, live in 5–14 days",
    delivery: "5–14 days",
    accent: "amber",
    size: "large",
    image: "/images/services_web_ecom_1776115271049.png",
  },
  {
    Icon: IconAutomation,
    name: "AI Automation",
    value: "Save 10–20 hrs/week — CRM sync, invoicing, onboarding, workflows",
    delivery: "3–10 days",
    accent: "teal",
    size: "large",
    image: "/images/services_ai_aut_1776115257049.png",
  },
  {
    Icon: IconBranding,
    name: "Branding & Identity",
    value: "Logo, brand system, AI-generated assets at 80% less cost",
    delivery: "7–21 days",
    accent: "amber",
    size: "medium",
  },
  {
    Icon: IconMarketing,
    name: "Performance Marketing",
    value: "Meta, Google & WhatsApp ads with 2–5x ROAS targeting",
    delivery: "Ongoing",
    accent: "teal",
    size: "medium",
  },
  {
    Icon: IconCRM,
    name: "CRM & Sales",
    value: "HubSpot/Zoho setup + 100–500 qualified leads/month automated",
    delivery: "5–14 days",
    accent: "amber",
    size: "medium",
  },
  {
    Icon: IconOperations,
    name: "Operations Automation",
    value: "HR, invoicing, project management — save 15+ hrs/month",
    delivery: "5–10 days",
    accent: "teal",
    size: "medium",
  },
  {
    Icon: IconSupport,
    name: "Customer Support AI",
    value: "AI chatbots + WhatsApp bots handle 60–80% of queries 24/7",
    delivery: "5–14 days",
    accent: "amber",
    size: "medium",
  },
  {
    Icon: IconAnalytics,
    name: "Analytics & BI",
    value: "Real-time dashboards — GA4, revenue, churn, LTV at a glance",
    delivery: "3–14 days",
    accent: "teal",
    size: "medium",
  },
  {
    Icon: IconContent,
    name: "Content & Creative",
    value: "10x content volume at 20% of cost — social, video, blog",
    delivery: "Ongoing",
    accent: "amber",
    size: "medium",
  },
  {
    Icon: IconSEO,
    name: "SEO & Growth",
    value: "Technical SEO + local rankings + compounding organic traffic",
    delivery: "5–7 days",
    accent: "teal",
    size: "medium",
  },
  {
    Icon: IconIntegrations,
    name: "Tech Integrations",
    value: "Connect your entire stack — CRM, payments, analytics, ERP",
    delivery: "5–21 days",
    accent: "amber",
    size: "medium",
  },
  {
    Icon: IconAIAgents,
    name: "Custom AI Agents",
    value: "LangGraph agents, RAG systems, predictive models built for your business",
    delivery: "21–60 days",
    accent: "teal",
    size: "large",
    image: "/images/services_custom_ai_1776115289037.png",
  },
]

type Service = typeof services[0] & { image?: string }

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const mx       = useMotionValue(0)
  const my       = useMotionValue(0)
  const rotateX  = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]),  { stiffness: 300, damping: 30 })
  const rotateY  = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]),  { stiffness: 300, damping: 30 })
  const isAmber  = service.accent === "amber"
  const { Icon } = service

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width  - 0.5)
    my.set((e.clientY - r.top)  / r.height - 0.5)
  }

  return (
    <CardSpotlight teal={!isAmber} className="h-full">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mx.set(0); my.set(0) }}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className={`group glass-card gradient-border-wrapper rounded-2xl p-6 flex flex-col gap-3 cursor-default relative overflow-hidden h-full
          transition-[border-color,box-shadow] duration-300
          ${isAmber ? "hover:border-soyl-amber/25 hover:shadow-amber-sm" : "hover:border-soyl-teal/25 hover:shadow-teal-sm"}
          ${service.size === "large" ? "min-w-[340px] lg:min-w-[420px]" : "min-w-[280px] lg:min-w-[320px]"}
        `}
      >
        {/* Background Image if available */}
        {service.image && (
          <div className="absolute inset-0 z-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500 scale-105 group-hover:scale-100">
            <Image src={service.image} fill className="object-cover" alt={service.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-soyl-bg via-soyl-bg/50 to-transparent" />
          </div>
        )}

        {/* Icon */}
        <div className={`relative z-10 w-9 h-9 rounded-xl flex items-center justify-center
          ${isAmber ? "bg-soyl-amber/8 text-soyl-amber" : "bg-soyl-teal/8 text-soyl-teal"}`}>
          <Icon size={18} />
        </div>

        {/* Name */}
        <h3 className={`relative z-10 font-heading font-semibold text-base text-soyl-white
          group-hover:${isAmber ? "text-soyl-amber" : "text-soyl-teal"} transition-colors duration-200`}>
          {service.name}
        </h3>

        {/* Value */}
        <p className="relative z-10 font-body text-sm text-soyl-gray leading-relaxed flex-1">
          {service.value}
        </p>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/[0.05]">
          <span className="text-xs font-body text-soyl-gray/60 tracking-wide">Delivery</span>
          <span className={`text-[11px] font-heading font-semibold px-2.5 py-1 rounded-full
            ${isAmber ? "bg-soyl-amber/8 text-soyl-amber" : "bg-soyl-teal/8 text-soyl-teal"}`}>
            {service.delivery}
          </span>
        </div>

        {/* Bottom glow line on hover */}
        <div className={`relative z-10 h-px w-0 group-hover:w-full transition-all duration-500
          ${isAmber ? "bg-gradient-to-r from-soyl-amber/60 to-transparent" : "bg-gradient-to-r from-soyl-teal/60 to-transparent"}`} />
      </motion.div>
    </CardSpotlight>
  )
}

export default function ServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Horizontal scroll (#1) — GSAP ScrollTrigger
  useLayoutEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined

    const init = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!scrollContainerRef.current || !sectionRef.current) return

      const scrollWidth = scrollContainerRef.current.scrollWidth
      const viewportWidth = window.innerWidth

      ctx = gsap.context(() => {
        gsap.to(scrollContainerRef.current, {
          x: -(scrollWidth - viewportWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }, sectionRef)
    }

    // Only enable horizontal scroll on large screens
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      init()
    }

    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-white/[0.06]" id="services">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[250px] bg-soyl-amber/[0.025] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-20 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-chip mb-4 inline-flex">12 Verticals</span>
          <h2 className="font-heading font-bold text-display-md text-soyl-white mb-4">
            <TextScramble text="One subscription." className="inline" speed={30} />{" "}
            <span className="text-gradient-amber">
              <TextScramble text="Infinite leverage." className="inline" speed={30} delay={400} />
            </span>
          </h2>
          <p className="font-body text-soyl-gray max-w-lg mx-auto text-balance">
            Every service generates revenue, reduces cost, or both — with AI doing 70% of the work.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll container on desktop (#1), grid on mobile */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {services.map((s, i) => (
            <ServiceCard key={s.name} service={s} index={i} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block pb-28">
        <div
          ref={scrollContainerRef}
          className="flex gap-5 px-10 will-change-transform"
          style={{ width: "max-content" }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.name} service={s} index={i} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <MagneticButton>
            <Link href="/services" className="btn-ghost inline-flex items-center gap-2">
              Explore All Services in Detail
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
