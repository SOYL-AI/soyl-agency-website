"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
  IconWebsite, IconAutomation, IconBranding, IconMarketing,
  IconCRM, IconOperations, IconSupport, IconAnalytics,
  IconContent, IconSEO, IconIntegrations, IconAIAgents, IconArrow
} from "@/components/icons/Icons"

const services = [
  {
    Icon: IconWebsite,
    name: "Website & E-Commerce",
    tagline: "Your storefront, live in 14 days",
    description: "From 5-page brochure sites to fully customised Shopify stores. Every site is SEO-structured, mobile-first, and integrated with analytics from day one. We use 25+ pre-built templates so delivery is fast — customisation is layered on top, not built from scratch.",
    deliverables: ["Responsive multi-page website", "Shopify / WooCommerce setup", "GA4 + Hotjar integration", "On-page SEO structure", "Loom handover video"],
    delivery: "5–14 days",
    price: "Included in Growth+",
    accent: "amber",
  },
  {
    Icon: IconAutomation,
    name: "AI Automation",
    tagline: "Save 10–20 hours every week",
    description: "We map your manual workflows and rebuild them as automated pipelines using n8n, Make.com, Zapier, and custom AI scripts. CRM sync, lead routing, invoice generation, onboarding sequences — all hands-free.",
    deliverables: ["Workflow audit + mapping", "n8n / Make automation builds", "CRM sync pipelines", "Invoice + onboarding automation", "Monitoring dashboard"],
    delivery: "3–10 days",
    price: "Included in Starter+",
    accent: "teal",
  },
  {
    Icon: IconBranding,
    name: "Branding & Identity",
    tagline: "A brand system that scales",
    description: "Full visual identity built with AI-augmented design — 80% less cost than a traditional agency. Logo, brand guidelines, social templates, pitch decks, email headers. Everything exported in every format you'll ever need.",
    deliverables: ["Logo (3 concepts)", "Brand guidelines PDF", "Social media template pack", "Pitch deck template", "AI-generated asset library"],
    delivery: "7–21 days",
    price: "Add-on from ₹8,999",
    accent: "amber",
  },
  {
    Icon: IconMarketing,
    name: "Performance Marketing",
    tagline: "2–5x ROAS, consistently",
    description: "Meta, Google, and WhatsApp campaigns managed by AI-assisted targeting. We run creative testing at scale, optimise weekly, and report daily. Every rupee is tracked to revenue.",
    deliverables: ["Campaign strategy + setup", "Ad creative production", "Weekly A/B testing", "Daily performance reports", "Monthly ROAS review"],
    delivery: "Ongoing from Month 1",
    price: "Included in Growth+",
    accent: "teal",
  },
  {
    Icon: IconCRM,
    name: "CRM & Sales",
    tagline: "100–500 qualified leads/month",
    description: "HubSpot or Zoho CRM configured for your sales process — lead scoring, pipeline stages, automated follow-ups, WhatsApp sequences. We also build outbound sequences that generate leads on autopilot.",
    deliverables: ["CRM setup + migration", "Lead scoring model", "Automated follow-up sequences", "Sales pipeline configuration", "WhatsApp outreach automation"],
    delivery: "5–14 days",
    price: "Included in Growth+",
    accent: "amber",
  },
  {
    Icon: IconOperations,
    name: "Operations Automation",
    tagline: "15+ hours saved every month",
    description: "HR onboarding flows, leave management, expense automation, contractor payments, project tracking — all systematised. We connect your existing tools and automate the gaps between them.",
    deliverables: ["Ops audit + gap analysis", "HR workflow automation", "Expense + payment flows", "Contractor management system", "Weekly ops dashboard"],
    delivery: "5–10 days",
    price: "Included in Scale+",
    accent: "teal",
  },
  {
    Icon: IconSupport,
    name: "Customer Support AI",
    tagline: "60–80% queries handled 24/7",
    description: "AI chatbots trained on your products, FAQs, and policies. WhatsApp bots for order tracking, booking confirmation, and escalation. Your team only handles the 20% that truly needs a human.",
    deliverables: ["Chatbot build + training", "WhatsApp bot setup", "FAQ knowledge base", "Escalation workflow", "Monthly query analysis"],
    delivery: "5–14 days",
    price: "Included in Growth+",
    accent: "amber",
  },
  {
    Icon: IconAnalytics,
    name: "Analytics & BI",
    tagline: "Every KPI, in real time",
    description: "Custom Looker Studio dashboards pulling from GA4, Meta Ads, Google Ads, your CRM, and Shopify — consolidated into one view. Weekly automated reports to your inbox with anomaly alerts built in.",
    deliverables: ["Custom Looker Studio dashboard", "GA4 advanced setup", "Weekly automated reports", "Anomaly + alert system", "Monthly strategy review"],
    delivery: "3–14 days",
    price: "Included in Growth+",
    accent: "teal",
  },
  {
    Icon: IconContent,
    name: "Content & Creative",
    tagline: "10x output at 20% of cost",
    description: "AI-assisted content production at scale — social posts, reels scripts, blog articles, email newsletters, and video editing. We produce a month of content in a week, with your brand voice baked in.",
    deliverables: ["Content calendar (30 days)", "20 social posts/month", "4 blog articles/month", "Email newsletter (2/month)", "Video scripts + captions"],
    delivery: "Ongoing",
    price: "Included in Growth+",
    accent: "amber",
  },
  {
    Icon: IconSEO,
    name: "SEO & Growth",
    tagline: "Compounding organic traffic",
    description: "Technical SEO audit, on-page optimisation, local SEO for Google Maps, and a content strategy that compounds over time. Most clients see measurable ranking improvements in 30–60 days.",
    deliverables: ["Full SEO audit", "On-page optimisation", "Google Business Profile setup", "Local citation building", "Monthly rank tracking report"],
    delivery: "5–7 days setup, ongoing",
    price: "Included in Starter+",
    accent: "teal",
  },
  {
    Icon: IconIntegrations,
    name: "Tech Integrations",
    tagline: "Connect your entire stack",
    description: "We map your tech stack and build the integrations between them — CRM to accounting, payments to inventory, marketing to analytics. Every tool talking to every other tool.",
    deliverables: ["Tech stack audit", "Custom API integrations", "Payment gateway setup", "ERP / accounting sync", "Integration documentation"],
    delivery: "5–21 days",
    price: "Add-on from ₹12,999",
    accent: "amber",
  },
  {
    Icon: IconAIAgents,
    name: "Custom AI Agents",
    tagline: "AI built for your exact business",
    description: "LangGraph and LangChain agents, RAG systems trained on your data, predictive churn models, AI voice agents, and custom GPTs. The most advanced service we offer — and the one that creates the deepest competitive moat for your business.",
    deliverables: ["AI agent architecture design", "LangGraph / RAG build", "Integration into your stack", "Training + fine-tuning", "Monitoring + retraining pipeline"],
    delivery: "21–60 days",
    price: "Custom from ₹49,999",
    accent: "teal",
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Hero */}
        <section className="page-hero border-b border-white/[0.06] relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-soyl-amber/[0.04] blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <span className="section-chip mb-6 inline-flex">12 Verticals</span>
              <h1 className="font-heading font-bold text-display-lg text-soyl-white mb-6 leading-none">
                Every service your business needs,{" "}
                <span className="text-gradient-amber">powered by AI.</span>
              </h1>
              <p className="font-body text-lg text-soyl-gray leading-relaxed max-w-xl text-balance">
                From website to AI agents — all delivered in days, not months, at a fraction
                of what a traditional agency charges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3 mt-10"
            >
              <Link href="/pricing" className="btn-amber">
                View Pricing Plans
                <IconArrow size={14} />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Book a Strategy Call
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services list */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col gap-px bg-white/[0.04]">
              {services.map((svc, i) => {
                const isAmber = svc.accent === "amber"
                const { Icon } = svc
                return (
                  <motion.div
                    key={svc.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                    className="bg-soyl-bg p-8 lg:p-10 group hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                      {/* Left */}
                      <div className="flex flex-col gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                          ${isAmber ? "bg-soyl-amber/8 text-soyl-amber" : "bg-soyl-teal/8 text-soyl-teal"}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className={`text-xs font-mono tracking-widest uppercase mb-1.5
                            ${isAmber ? "text-soyl-amber/70" : "text-soyl-teal/70"}`}>
                            0{i + 1}
                          </p>
                          <h3 className="font-heading font-bold text-xl text-soyl-white mb-1">
                            {svc.name}
                          </h3>
                          <p className={`text-sm font-body ${isAmber ? "text-soyl-amber" : "text-soyl-teal"}`}>
                            {svc.tagline}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1.5 mt-auto pt-4 border-t border-white/[0.05]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-soyl-gray/50 font-mono">DELIVERY</span>
                            <span className="text-soyl-gray">{svc.delivery}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-soyl-gray/50 font-mono">PRICING</span>
                            <span className={isAmber ? "text-soyl-amber" : "text-soyl-teal"}>{svc.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Middle */}
                      <div className="lg:col-span-1">
                        <p className="font-body text-sm text-soyl-gray leading-relaxed">
                          {svc.description}
                        </p>
                      </div>

                      {/* Right — deliverables */}
                      <div>
                        <p className="text-xs font-mono text-soyl-gray/40 tracking-widest uppercase mb-4">
                          Deliverables
                        </p>
                        <ul className="flex flex-col gap-2.5">
                          {svc.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2.5 text-sm font-body text-soyl-gray">
                              <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0
                                ${isAmber ? "bg-soyl-amber" : "bg-soyl-teal"}`} />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="border-t border-white/[0.06] py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading font-bold text-display-sm text-soyl-white mb-4">
                Not sure which services you need?
              </h2>
              <p className="font-body text-soyl-gray mb-8 max-w-md mx-auto text-balance">
                Book a free 30-minute strategy call. We&apos;ll audit your business and
                recommend the exact combination.
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
