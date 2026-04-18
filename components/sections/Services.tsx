"use client"

import { useEffect, useRef } from "react"
import { useCursorStore } from "@/store/cursor"
import type { ServiceItem } from "@/types"

const SERVICES: ServiceItem[] = [
  {
    id:          "ai-automation",
    name:        "AI Automation",
    tagline:     "Replace repetitive work with intelligent systems.",
    description: "We map your workflows and deploy AI agents that handle data entry, lead qualification, scheduling, and reporting — 24/7, at a fraction of the cost.",
    capabilities: ["Workflow audit & mapping", "n8n / Make / Zapier AI pipelines", "Custom GPT agents for your team"],
    videoPrompt: "Dark top-down overhead shot of glowing circuit board traces in amber and teal, data packets visualized as tiny golden spheres flowing through pathways, macro lens, cinematic depth, no text, loop-ready --ar 16:9",
    accent:      "amber",
    aspectRatio: "16:9",
  },
  {
    id:          "web-ecommerce",
    name:        "Web & E-Commerce",
    tagline:     "Sites that sell while you sleep.",
    description: "From high-converting Shopify stores to custom Next.js web platforms — we build with performance, conversion, and brand impact as first-class citizens.",
    capabilities: ["Shopify & headless e-commerce", "Custom web apps (Next.js)", "CRO-optimized UX design"],
    videoPrompt: "Slow-motion product reveal on a dark e-commerce website mockup, floating 3D device screens showing a clean storefront UI in amber and dark tones, subtle parallax depth, particles, no text --ar 16:9",
    accent:      "teal",
    aspectRatio: "16:9",
  },
  {
    id:          "custom-ai-agents",
    name:        "Custom AI Agents",
    tagline:     "Your team's new hardest worker.",
    description: "Bespoke AI agents trained on your business context. Customer support, sales prospecting, invoice processing, content drafting — built to your exact spec.",
    capabilities: ["RAG pipelines on your docs", "Multi-agent orchestration", "WhatsApp / Slack / email interfaces"],
    videoPrompt: "Abstract visualization of neural network nodes pulsing in amber light on a dark background, data streams converging to a central glowing point, subtle particle field, cinematic and technical, no text --ar 16:9",
    accent:      "amber",
    aspectRatio: "16:9",
  },
  {
    id:          "performance-marketing",
    name:        "Performance Marketing",
    tagline:     "Every rupee working harder.",
    description: "AI-assisted ad creative testing, audience segmentation, and budget allocation across Meta, Google, and LinkedIn. We chase ROAS, not vanity metrics.",
    capabilities: ["Meta & Google Ads management", "AI creative testing at scale", "Weekly performance reviews"],
    videoPrompt: "Dark control room aesthetic with multiple screens showing real-time analytics dashboards in amber and teal, data visualizations rising like heat maps, cinematic wide angle, no faces, no text --ar 16:9",
    accent:      "teal",
    aspectRatio: "16:9",
  },
  {
    id:          "brand-identity",
    name:        "Brand & Visual Identity",
    tagline:     "Look the part. Own the room.",
    description: "Strategy-led brand identity that translates across every touchpoint — logo, typography, color, motion, and voice. Built for businesses that are playing the long game.",
    capabilities: ["Brand strategy & positioning", "Visual identity system", "Brand guidelines & asset library"],
    videoPrompt: "Elegant abstract brand identity elements — letterforms dissolving into geometric shapes, dark background with amber glow highlights, smooth motion, typographic mood, cinematic --ar 16:9",
    accent:      "amber",
    aspectRatio: "16:9",
  },
  {
    id:          "content-copywriting",
    name:        "Content & Copywriting",
    tagline:     "Words that move people to act.",
    description: "AI-assisted, human-refined content — blog articles, product copy, email sequences, ad scripts, and social captions — optimized for both SEO and human emotion.",
    capabilities: ["SEO content strategy", "AI-assisted drafting + human edit", "Email sequence copywriting"],
    videoPrompt: "Overhead shot of a writer's desk at night, warm amber desk lamp illuminating pages with handwritten words dissolving into glowing text, dark moody atmosphere, film grain, no text readable --ar 9:16",
    accent:      "teal",
    aspectRatio: "9:16",
  },
  {
    id:          "social-media",
    name:        "Social Media Management",
    tagline:     "Consistent. Strategic. Human.",
    description: "Full-stack social management — content calendar, creative production, community management, and monthly analytics — powered by AI tools and human judgment.",
    capabilities: ["Monthly content calendar", "Reel & carousel production", "Community management + DM flows"],
    videoPrompt: "Dark smartphone screen showing a premium Instagram feed grid with cohesive amber and dark aesthetic, subtle scroll motion, reflective glass surface below device, cinematic still life --ar 9:16",
    accent:      "amber",
    aspectRatio: "9:16",
  },
  {
    id:          "analytics-reporting",
    name:        "Analytics & Reporting",
    tagline:     "Know exactly what's working.",
    description: "Custom dashboards that pull data from every channel — ads, website, email, social — into one clear view. We set it up, automate it, and make it readable for non-technical founders.",
    capabilities: ["Looker Studio dashboards", "GA4 + Meta Pixel setup", "Automated weekly reports"],
    videoPrompt: "Cinematic close-up of glowing data visualization charts on a dark screen — bar graphs in amber light rising and falling, heat map overlays in teal, minimal UI aesthetic, no text readable --ar 16:9",
    accent:      "teal",
    aspectRatio: "16:9",
  },
]

function ServicePanel({ service, index }: { service: ServiceItem; index: number }) {
  return (
    <div
      style={{
        width:          "100vw",
        height:         "100vh",
        flexShrink:     0,
        display:        "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems:     "center",
        padding:        "0 clamp(3rem, 8vw, 7rem)",
        gap:            "4rem",
        background:     index % 2 === 0 ? "#0D0D0D" : "#080808",
      }}
    >
      {/* Left — text */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <span
          style={{
            fontFamily:  "var(--font-mono)",
            fontSize:    "0.65rem",
            letterSpacing: "0.15em",
            color:       service.accent === "amber" ? "#FF5500" : "#FF4D1A",
            opacity:     0.7,
          }}
        >
          {String(index + 1).padStart(2, "0")} / {SERVICES.length}
        </span>

        <h3
          style={{
            fontFamily:  "var(--font-display)",
            fontSize:    "clamp(2.5rem, 5vw, 4rem)",
            fontWeight:  700,
            color:       "#F5F4EE",
            letterSpacing: "-0.03em",
            lineHeight:  0.95,
          }}
        >
          {service.name}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize:   "1.125rem",
            color:      "rgba(245,244,238,0.7)",
            lineHeight: 1.6,
            maxWidth:   "40ch",
          }}
        >
          {service.description}
        </p>

        <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem", listStyle: "none" }}>
          {service.capabilities.map((cap) => (
            <li
              key={cap}
              style={{
                fontFamily:  "var(--font-mono)",
                fontSize:    "0.8rem",
                letterSpacing: "0.05em",
                color:       "rgba(245,244,238,0.55)",
                display:     "flex",
                gap:         "0.75rem",
                alignItems:  "center",
              }}
            >
              <span style={{ color: service.accent === "amber" ? "#FF5500" : "#FF4D1A", fontSize: "0.5rem" }}>●</span>
              {cap}
            </li>
          ))}
        </ul>
      </div>

      {/* Right — video placeholder */}
      <div
        style={{
          aspectRatio: service.aspectRatio.replace(":", "/"),
          maxHeight:   "65vh",
          width:       "100%",
        }}
      >
        <div className="video-placeholder-wrap" style={{ height: "100%", position: "relative", overflow: "hidden", borderRadius: "1rem", background: service.accent === "amber" ? "#0a0600" : "#000808", border: `1px solid ${service.accent === "amber" ? "rgba(255,85,0,0.2)" : "rgba(14,207,207,0.2)"}` }}>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes sweep {
              0% { left: -100%; }
              100% { left: 200%; }
            }
            @keyframes grid-drift {
              0% { background-position: 0px 0px; }
              100% { background-position: 40px 40px; }
            }
            @keyframes pulse-glow {
              0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
              100% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
            }
          `}} />

          {/* Animated SVG Grid Background */}
          <div style={{ position: "absolute", inset: "-40px", opacity: 0.15, backgroundImage: `linear-gradient(${service.accent === "amber" ? "rgba(255,85,0,0.5)" : "rgba(14,207,207,0.5)"} 1px, transparent 1px), linear-gradient(90deg, ${service.accent === "amber" ? "rgba(255,85,0,0.5)" : "rgba(14,207,207,0.5)"} 1px, transparent 1px)`, backgroundSize: "40px 40px", animation: "grid-drift 3s linear infinite" }} />
          
          {/* Glowing animated orb */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "50%", height: "50%", background: service.accent === "amber" ? "radial-gradient(circle, rgba(255,85,0,0.2) 0%, transparent 70%)" : "radial-gradient(circle, rgba(14,207,207,0.2) 0%, transparent 70%)", filter: "blur(40px)", animation: "pulse-glow 4s ease-in-out infinite alternate" }} />

          {/* Sweep line */}
          <div style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: service.accent === "amber" ? "linear-gradient(90deg, transparent, rgba(255,85,0,0.15), transparent)" : "linear-gradient(90deg, transparent, rgba(14,207,207,0.15), transparent)", animation: "sweep 3s ease-in-out infinite" }} />
          
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, zIndex: 1, borderRadius: "inherit", opacity: 0 }}
          >
            {service.videoSrc && <source src={service.videoSrc} type="video/mp4" />}
          </video>
          
          <div className="video-placeholder-label" style={{ zIndex: 2, position: "relative", padding: "1.5rem" }}>
            <span className="placeholder-label" style={{ color: service.accent === "amber" ? "#FF5500" : "#0ECFCF" }}>[ MOCK VIDEO LOADED ]</span>
            <span className="placeholder-prompt" style={{ opacity: 0.5 }}>{service.videoPrompt.slice(0, 80)}…</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef  = useRef<HTMLElement>(null)
  const innerRef    = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const { setVariant } = useCursorStore()

  useEffect(() => {
    let ctx: gsap.Context

    const init = async () => {
      if (!sectionRef.current || !innerRef.current || !trackRef.current) return

      const { gsap }          = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const track    = trackRef.current!
        const progress = progressRef.current!

        gsap.to(track, {
          x:    () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger:  sectionRef.current,
            start:    "top top",
            end:      () => "+=" + track.scrollWidth,
            scrub:    1,
            snap: {
              snapTo:   1 / (SERVICES.length - 1),
              duration: { min: 0.2, max: 0.4 },
              delay:    0.1,
              ease:     "power1.inOut",
            },
            onUpdate: (self) => {
              if (progress) progress.style.width = `${self.progress * 100}%`
            },
          },
        })
      })
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ height: `${SERVICES.length * 100}vh`, position: "relative" }}
    >
      {/* Pinned inner via CSS sticky */}
      <div
        ref={innerRef}
        style={{
          position: "sticky",
          top:      0,
          height:   "100vh",
          overflow: "hidden",
        }}
      >
        {/* Section header — top left */}
        <div
          style={{
            position:  "absolute",
            top:       "clamp(5.5rem,10vh,7rem)",
            left:      "clamp(1.25rem,5vw,4rem)",
            zIndex:    10,
          }}
        >
          <p
            style={{
              fontFamily:  "var(--font-mono)",
              fontSize:    "0.65rem",
              letterSpacing: "0.15em",
              color:       "rgba(255,85,0,0.55)",
              marginBottom: "0.5rem",
            }}
          >
            [ WHAT WE DO ]
          </p>
          <h2
            style={{
              fontFamily:  "var(--font-display)",
              fontSize:    "clamp(1.5rem,3vw,2.25rem)",
              fontWeight:  700,
              color:       "#F5F4EE",
              letterSpacing: "-0.02em",
            }}
          >
            Services
          </h2>
        </div>

        {/* Progress bar */}
        <div
          style={{
            position:   "absolute",
            top:        0,
            left:       0,
            right:      0,
            height:     "2px",
            background: "#111111",
            zIndex:     10,
          }}
        >
          <div
            ref={progressRef}
            style={{
              height:     "100%",
              width:      "0%",
              background: "#FF5500",
              transition: "width 0.05s linear",
            }}
          />
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          style={{
            display:    "flex",
            height:     "100%",
            width:      `${SERVICES.length * 100}vw`,
          }}
          onMouseEnter={() => setVariant("drag")}
          onMouseLeave={() => setVariant("default")}
        >
          {SERVICES.map((service, i) => (
            <ServicePanel key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
