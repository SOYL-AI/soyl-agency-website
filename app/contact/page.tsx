"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { IconMail, IconPhone, IconMapPin, IconCalendar, IconArrow } from "@/components/icons/Icons"

const businessTypes = [
  "D2C / E-Commerce", "Retail / F&B", "Healthcare / Clinic",
  "Professional Services", "SaaS / Tech", "Education", "Real Estate", "Other",
]

const serviceOptions = [
  "Website / E-Commerce", "AI Automation", "Branding & Identity",
  "Performance Marketing", "CRM & Sales", "Analytics & BI",
  "Custom AI Agent", "Operations", "Content", "Not sure yet",
]

type FormState = "idle" | "loading" | "success"

export default function ContactPage() {
  const [form, setForm]     = useState({ name: "", email: "", company: "", type: "", message: "" })
  const [services, setServices] = useState<string[]>([])
  const [status, setStatus] = useState<FormState>("idle")

  const toggleService = (s: string) =>
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    await new Promise(r => setTimeout(r, 1400))
    setStatus("success")
  }

  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Hero */}
        <section className="page-hero border-b border-white/[0.06] relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-soyl-amber/[0.04] blur-[140px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <span className="section-chip mb-6 inline-flex">Let&apos;s Talk</span>
              <h1 className="font-heading font-bold text-display-lg text-soyl-white mb-5 leading-none">
                Start your AI-powered
                <br />
                <span className="text-gradient-amber">growth journey.</span>
              </h1>
              <p className="font-body text-lg text-soyl-gray text-balance">
                Fill in the form and we&apos;ll get back to you within 24 hours with a
                tailored plan for your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-14">

              {/* Left — info */}
              <div className="flex flex-col gap-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <p className="text-xs font-mono text-soyl-gray/40 tracking-widest uppercase mb-6">Contact Info</p>
                  <div className="flex flex-col gap-5">
                    {[
                      { Icon: IconMail,    label: "Email",    value: "hello@soyl.in" },
                      { Icon: IconPhone,   label: "WhatsApp", value: "+91 98xxx xxxxx" },
                      { Icon: IconMapPin,  label: "Based in", value: "India — remote-first" },
                    ].map(({ Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-lg bg-soyl-amber/8 text-soyl-amber flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={15} />
                        </div>
                        <div>
                          <p className="text-xs font-mono text-soyl-gray/50 mb-0.5">{label}</p>
                          <p className="text-sm font-body text-soyl-white">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Book a call */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass-card rounded-2xl p-6 border-soyl-amber/15"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-soyl-amber/8 text-soyl-amber flex items-center justify-center">
                      <IconCalendar size={15} />
                    </div>
                    <p className="font-heading font-semibold text-soyl-white text-sm">Book a Strategy Call</p>
                  </div>
                  <p className="font-body text-xs text-soyl-gray mb-5">
                    30-minute free call with our founder. We&apos;ll analyse your business and
                    recommend the exact plan you need.
                  </p>
                  <a
                    href="https://calendly.com/soyl-agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-amber w-full justify-center text-xs py-2.5"
                  >
                    Schedule on Calendly
                    <IconArrow size={12} />
                  </a>
                </motion.div>

                {/* Response time */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col gap-2.5"
                >
                  {[
                    "Response within 24 hours",
                    "Free 30-min strategy session",
                    "No sales pressure, just honest advice",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-xs font-body text-soyl-gray">
                      <span className="w-1 h-1 rounded-full bg-soyl-teal flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right — form */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-20 glass-card rounded-2xl"
                    >
                      <div className="w-14 h-14 rounded-full bg-soyl-teal/10 flex items-center justify-center mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AFD0CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h3 className="font-heading font-bold text-2xl text-soyl-white mb-3">
                        We&apos;ve received your request.
                      </h3>
                      <p className="font-body text-soyl-gray max-w-sm text-balance">
                        Expect a reply within 24 hours. If you&apos;d like to talk sooner,
                        book a slot on Calendly above.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      {/* Name + email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono text-soyl-gray/60 tracking-widest uppercase">Your name *</label>
                          <input
                            required
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                            placeholder="Rohan Sharma"
                            className="input-field"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono text-soyl-gray/60 tracking-widest uppercase">Business email *</label>
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={e => setForm({...form, email: e.target.value})}
                            placeholder="rohan@company.com"
                            className="input-field"
                          />
                        </div>
                      </div>

                      {/* Company + type */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono text-soyl-gray/60 tracking-widest uppercase">Company name</label>
                          <input
                            value={form.company}
                            onChange={e => setForm({...form, company: e.target.value})}
                            placeholder="Acme Pvt Ltd"
                            className="input-field"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono text-soyl-gray/60 tracking-widest uppercase">Business type</label>
                          <select
                            value={form.type}
                            onChange={e => setForm({...form, type: e.target.value})}
                            className="input-field"
                          >
                            <option value="">Select type…</option>
                            {businessTypes.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Services */}
                      <div className="flex flex-col gap-2.5">
                        <label className="text-xs font-mono text-soyl-gray/60 tracking-widest uppercase">
                          What do you need? <span className="text-soyl-gray/30">(pick all that apply)</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {serviceOptions.map(s => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => toggleService(s)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-body transition-all duration-150 border
                                ${services.includes(s)
                                  ? "bg-soyl-amber/10 border-soyl-amber/40 text-soyl-amber"
                                  : "border-white/[0.08] text-soyl-gray hover:border-white/20 hover:text-soyl-white bg-transparent"
                                }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono text-soyl-gray/60 tracking-widest uppercase">
                          Tell us about your business
                        </label>
                        <textarea
                          rows={4}
                          value={form.message}
                          onChange={e => setForm({...form, message: e.target.value})}
                          placeholder="What are you trying to achieve? What's your current monthly revenue? What's the biggest bottleneck right now?"
                          className="input-field resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === "loading" || !form.name || !form.email}
                        className="btn-amber justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? (
                          <div className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                        ) : (
                          <>Send Message <IconArrow size={14} /></>
                        )}
                      </button>

                      <p className="text-xs font-body text-soyl-gray/50 text-center">
                        No spam. No cold calls. Just a genuine conversation about your business.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
