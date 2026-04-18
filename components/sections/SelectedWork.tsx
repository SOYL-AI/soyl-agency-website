"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useCursorStore } from "@/store/cursor"
import { PROJECTS } from "@/lib/projects"
import type { WorkProject } from "@/types"

export { PROJECTS }

interface ProjectCardProps {
  project:   WorkProject
  className?: string
  style?:    React.CSSProperties
  index:     number
}

function ProjectCard({ project, style, index }: ProjectCardProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })
  const { setVariant, setLabel } = useCursorStore()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ ...style, position: "relative" }}
    >
      <Link
        href={`/work/${project.slug}`}
        style={{ display: "block", height: "100%", textDecoration: "none" }}
        onMouseEnter={() => { setVariant("link"); setLabel("Open →") }}
        onMouseLeave={() => { setVariant("default"); setLabel(null) }}
      >
        <div
          style={{
            position:    "relative",
            width:       "100%",
            aspectRatio: project.aspectRatio,
            overflow:    "hidden",
            background:  "#1A1A1A",
          }}
        >
          {/* Image overlay */}
          {project.imageSrc ? (
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
          ) : (
            <div
              className="img-placeholder"
              data-image-prompt={project.imagePrompt}
              data-aspect-ratio={project.aspectRatio}
              data-section="selected-work"
              style={{ position: "absolute", inset: 0, background: "#E8E6E0" }}
            >
              <div className="placeholder-inner">
                <span className="placeholder-label" style={{ color: "rgba(10,10,10,0.35)" }}>[ IMAGE ]</span>
                <span className="placeholder-prompt" style={{ color: "rgba(10,10,10,0.25)" }}>{project.imagePrompt.slice(0, 80)}…</span>
              </div>
            </div>
          )}

          {/* Hover overlay — clip-path wipe */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileHover={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position:       "absolute",
              inset:          0,
              background:     "rgba(8,8,8,0.78)",
              display:        "flex",
              flexDirection:  "column",
              justifyContent: "flex-end",
              padding:        "1.5rem",
              gap:            "0.5rem",
            }}
          >
            {project.stats?.map((s) => (
              <div key={s.label} style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#FF5500", fontWeight: 700 }}>{s.value}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(245,244,238,0.5)", letterSpacing: "0.1em" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Project number */}
          <div
            style={{
              position:      "absolute",
              top:           "1rem",
              left:          "1rem",
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.7rem",
              color:         "rgba(10,10,10,0.35)",
              letterSpacing: "0.1em",
              opacity:       0.8,
              zIndex:        2,
            }}
          >
            {String(index + 1).padStart(2, "0")} /
          </div>

          {/* Arrow */}
          <motion.div
            initial={{ rotate: 0, opacity: 0.4 }}
            whileHover={{ rotate: 45, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position:   "absolute",
              top:        "1rem",
              right:      "1rem",
              fontFamily: "var(--font-mono)",
              fontSize:   "1.1rem",
              color:      "#0A0A0A",
              zIndex:     2,
            }}
          >
            →
          </motion.div>
        </div>

        {/* Card footer */}
        <div
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-end",
            padding:        "0.875rem 0",
          }}
        >
          <span
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(1.25rem, 3vw, 2.25rem)",
              fontWeight:    700,
              color:         "#0A0A0A",
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </span>
          <span
            style={{
              fontFamily:    "var(--font-label)",
              fontSize:      "0.65rem",
              letterSpacing: "0.15em",
              color:         "#FF4D1A",
              textTransform: "uppercase",
              textAlign:     "right",
              maxWidth:      "18ch",
            }}
          >
            {project.category}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function SelectedWork() {
  const [p0, p1, p2, p3, p4] = PROJECTS

  return (
    <section
      style={{
        padding:    "clamp(5rem,10vw,8rem) clamp(1.25rem,5vw,4rem)",
        background: "#F5F4EE",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
        <p
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.7rem",
            letterSpacing: "0.15em",
            color:         "rgba(10,10,10,0.4)",
            marginBottom:  "0.75rem",
          }}
        >
          [ 2024 — 2025 ]
        </p>
        <h2
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(2.5rem,8vw,5rem)",
            fontWeight:    700,
            letterSpacing: "-0.03em",
            color:         "#0A0A0A",
            lineHeight:    0.95,
          }}
        >
          Selected Work
        </h2>
      </div>

      {/* Asymmetric grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

        {/* Row 1 — full width */}
        {p0 && <ProjectCard project={p0} index={0} style={{ width: "100%" }} />}

        {/* Row 2 — 60/40 */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "1rem" }}>
          {p1 && <ProjectCard project={p1} index={1} />}
          {p2 && <ProjectCard project={p2} index={2} />}
        </div>

        {/* Row 3 — full width */}
        {p3 && <ProjectCard project={p3} index={3} style={{ width: "100%" }} />}

        {/* Row 4 — 55% right-aligned */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {p4 && <ProjectCard project={p4} index={4} style={{ width: "55%" }} />}
        </div>
      </div>
    </section>
  )
}
