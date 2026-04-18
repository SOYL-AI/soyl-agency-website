"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import type { PhilosophyPanel as Panel } from "@/types"

const PANELS: Panel[] = [
  {
    letter: "S",
    title:  "Story",
    body:   "Every business has an origin worth telling. We find it, frame it, and make it undeniable at every touchpoint.",
    color:  "#FF5500",
  },
  {
    letter: "O",
    title:  "Obsession",
    body:   "We are obsessed with outcomes, not outputs. Vanity metrics are a distraction. Revenue, retention, and reputation — those are the numbers that matter.",
    color:  "#FF4D1A",
  },
  {
    letter: "Y",
    title:  "You",
    body:   "You stay focused on your business. We handle the digital operations. Not a template. Not a trend. Built around the specific ambition of your specific company.",
    color:  "#FF5500",
  },
  {
    letter: "L",
    title:  "Life",
    body:   "This is your livelihood. We treat it like our own. Work that outlives the brief — built to scale, built to endure, built to be remembered.",
    color:  "#FF4D1A",
  },
]

function SOYLLetters({ activeIndex }: { activeIndex: number }) {
  return (
    <div
      style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        gap:           "0.25rem",
        userSelect:    "none",
      }}
    >
      {PANELS.map((p, i) => (
        <motion.span
          key={p.letter}
          animate={{
            color:   i === activeIndex ? p.color : "#1A1A1A",
            scale:   i === activeIndex ? 1.05 : 1,
            opacity: i === activeIndex ? 1 : 0.15,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily:  "var(--font-display)",
            fontSize:    "clamp(3rem, 8vw, 7.5rem)",
            fontWeight:  700,
            letterSpacing: "-0.04em",
            lineHeight:  1,
            color:       "#1A1A1A",
          }}
        >
          {p.letter}
        </motion.span>
      ))}
    </div>
  )
}

function PanelContent({ panel, index }: { panel: Panel; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      style={{
        height:         "100vh",
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "center",
        padding:        "0 clamp(2rem,5vw,5rem) 0 clamp(1rem,3vw,3rem)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-20% 0px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          style={{
            fontFamily:  "var(--font-label)",
            fontSize:    "0.7rem",
            letterSpacing: "0.2em",
            color:       panel.color,
            marginBottom: "1rem",
            opacity:     0.8,
          }}
        >
          {String(index + 1).padStart(2, "0")} / {PANELS.length}
        </p>

        <h3
          style={{
            fontFamily:  "var(--font-display)",
            fontSize:    "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight:  700,
            color:       "#0A0A0A",
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
            lineHeight:  0.95,
          }}
        >
          {panel.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize:   "clamp(1rem, 1.5vw, 1.25rem)",
            color:      "rgba(10,10,10,0.6)",
            lineHeight: 1.7,
            maxWidth:   "42ch",
          }}
        >
          {panel.body}
        </p>
      </motion.div>
    </div>
  )
}

export default function Philosophy() {
  const sectionRef  = useRef<HTMLElement>(null)
  const activeIndex = useRef(0)

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start start", "end end"],
  })

  const rawActive = useTransform(scrollYProgress, [0, 1], [0, PANELS.length - 1])

  useMotionValueEvent(rawActive, "change", (v) => {
    activeIndex.current = Math.round(v)
  })

  const activeMotion = useTransform(scrollYProgress, [0, 1], [0, PANELS.length - 1])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        display:    "flex",
        minHeight:  `${PANELS.length * 100}vh`,
        background: "#F5F4EE",
      }}
    >
      {/* Sticky left — SOYL letters */}
      <div
        style={{
          position:       "sticky",
          top:            0,
          height:         "100vh",
          width:          "clamp(140px, 28vw, 320px)",
          flexShrink:     0,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          borderRight:    "1px solid rgba(10,10,10,0.08)",
          background:     "#F5F4EE",
        }}
      >
        {/* Header chip */}
        <div
          style={{
            position: "absolute",
            top:      "clamp(5.5rem,10vh,7rem)",
            left:     "clamp(1.25rem,5vw,4rem)",
          }}
        >
          <span
            style={{
              fontFamily:  "var(--font-mono)",
              fontSize:    "0.6rem",
              letterSpacing: "0.15em",
              color:       "rgba(255,85,0,0.5)",
              textTransform: "uppercase",
            }}
          >
            [ Philosophy ]
          </span>
        </div>

        <ActiveLetters progress={activeMotion} />
      </div>

      {/* Scrolling right panels */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {PANELS.map((panel, i) => (
          <PanelContent key={panel.letter} panel={panel} index={i} />
        ))}
      </div>
    </section>
  )
}

function ActiveLetters({ progress }: { progress: ReturnType<typeof useTransform<number, number>> }) {
  const activeIndex = useTransform(progress, (v) => Math.round(v))

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
      {PANELS.map((p, i) => {
        return (
          <LetterItem key={p.letter} panel={p} index={i} activeIndex={activeIndex} />
        )
      })}
    </div>
  )
}

function LetterItem({
  panel,
  index,
  activeIndex,
}: {
  panel:       Panel
  index:       number
  activeIndex: ReturnType<typeof useTransform<number, number>>
}) {
  const isActive = useTransform(activeIndex, (v) => Math.round(v) === index)

  return (
    <motion.span
      style={{
        fontFamily:  "var(--font-display)",
        fontSize:    "clamp(3rem, 8vw, 7.5rem)",
        fontWeight:  700,
        letterSpacing: "-0.04em",
        lineHeight:  1,
        userSelect:  "none",
      }}
      animate={{}}
    >
      <AnimatedLetter panel={panel} index={index} activeIndex={activeIndex} />
    </motion.span>
  )
}

function AnimatedLetter({
  panel,
  index,
  activeIndex,
}: {
  panel:       Panel
  index:       number
  activeIndex: ReturnType<typeof useTransform<number, number>>
}) {
  const colorValue = useTransform(activeIndex, (v) => {
    return Math.round(v) === index ? panel.color : "#D8D6D0"
  })
  const opacityValue = useTransform(activeIndex, (v) => {
    return Math.round(v) === index ? 1 : 0.7
  })

  return (
    <motion.span
      style={{
        display:     "inline-block",
        color:       colorValue,
        opacity:     opacityValue,
        fontFamily:  "var(--font-display)",
        fontSize:    "clamp(3rem, 8vw, 7.5rem)",
        fontWeight:  700,
        letterSpacing: "-0.04em",
        lineHeight:  1,
      }}
    >
      {panel.letter}
    </motion.span>
  )
}
