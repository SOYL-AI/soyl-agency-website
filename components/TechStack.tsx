"use client"

import { motion } from "framer-motion"
import Marquee from "@/components/ui/Marquee"

// Tools with brand color accents instead of emojis
const row1 = [
  { name: "Shopify",     dot: "#95BF47" },
  { name: "Klaviyo",     dot: "#FFB800" },
  { name: "HubSpot",     dot: "#FF7A59" },
  { name: "n8n",         dot: "#EA4B71" },
  { name: "LangChain",   dot: "#1C3C3C" },
  { name: "OpenAI",      dot: "#74AA9C" },
  { name: "Claude",      dot: "#D4A27F" },
  { name: "Meta Ads",    dot: "#0866FF" },
  { name: "Webflow",     dot: "#4353FF" },
  { name: "Figma",       dot: "#F24E1E" },
  { name: "Razorpay",    dot: "#3395FF" },
  { name: "Zapier",      dot: "#FF4A00" },
  { name: "Make.com",    dot: "#6D00CC" },
]

const row2 = [
  { name: "Google Ads",    dot: "#4285F4" },
  { name: "Twilio",        dot: "#F22F46" },
  { name: "WhatsApp API",  dot: "#25D366" },
  { name: "AWS",           dot: "#FF9900" },
  { name: "Notion",        dot: "#FFFFFF" },
  { name: "Airtable",      dot: "#FCB400" },
  { name: "GA4",           dot: "#E37400" },
  { name: "Stripe",        dot: "#635BFF" },
  { name: "Pinecone",      dot: "#61D2A4" },
  { name: "ElevenLabs",    dot: "#A259FF" },
  { name: "Supabase",      dot: "#3ECF8E" },
  { name: "Vapi.ai",       dot: "#7C3AED" },
  { name: "Looker Studio", dot: "#4285F4" },
]

function ToolPill({ name, dot }: { name: string; dot: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/[0.07]
      hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-200 cursor-default
      group flex-shrink-0 bg-white/[0.02]">
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} />
      <span className="font-body text-sm font-medium text-soyl-gray group-hover:text-soyl-white
        transition-colors whitespace-nowrap tracking-tight">
        {name}
      </span>
    </div>
  )
}

export default function TechStack() {
  return (
    <section className="section-pad border-t border-white/[0.06] overflow-hidden" id="tech-stack">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-chip mb-4 inline-flex">The Toolbox</span>
          <h2 className="font-heading font-bold text-display-md text-soyl-white mb-4">
            Best-in-class tools.{" "}
            <span className="text-gradient-teal">Expertly configured.</span>
          </h2>
          <p className="font-body text-soyl-gray max-w-lg mx-auto text-balance">
            40+ platforms mastered and pre-integrated — so you never start from zero.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3.5">
        <Marquee direction="left" speed={38} gap={10}>
          {row1.map(t => <ToolPill key={t.name} name={t.name} dot={t.dot} />)}
        </Marquee>
        <Marquee direction="right" speed={32} gap={10}>
          {row2.map(t => <ToolPill key={t.name} name={t.name} dot={t.dot} />)}
        </Marquee>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm font-body text-soyl-gray"
        >
          <span className="text-soyl-white font-medium">40+ pre-built integration blueprints.</span>{" "}
          Every client starts from a battle-tested playbook — not a blank canvas.
        </motion.p>
      </div>
    </section>
  )
}
