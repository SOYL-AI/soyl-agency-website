import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { PROJECTS } from "@/lib/projects"

interface Params { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const project  = PROJECTS.find((p) => p.slug === slug)
  if (!project) return { title: "Work — SOYL Agency" }
  return {
    title:       `${project.title} — SOYL Agency`,
    description: `${project.category} case study by SOYL Agency`,
  }
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project  = PROJECTS.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <main style={{ minHeight: "100svh", paddingTop: "80px" }}>
      {/* Hero */}
      <div
        style={{
          padding:    "clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,4rem) clamp(3rem,5vw,4rem)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Link
          href="/work"
          style={{
            fontFamily:  "var(--font-mono)",
            fontSize:    "0.7rem",
            letterSpacing: "0.1em",
            color:       "rgba(255,85,0,0.55)",
            textDecoration: "none",
            display:     "inline-flex",
            alignItems:  "center",
            gap:         "0.5rem",
            marginBottom: "2rem",
          }}
        >
          ← Back to Work
        </Link>

        <p
          style={{
            fontFamily:  "var(--font-mono)",
            fontSize:    "0.7rem",
            letterSpacing: "0.15em",
            color:       "#FF4D1A",
            marginBottom: "1rem",
            textTransform: "uppercase",
          }}
        >
          {project.category}
        </p>

        <h1
          style={{
            fontFamily:  "var(--font-display)",
            fontSize:    "clamp(3rem, 9vw, 7rem)",
            fontWeight:  700,
            letterSpacing: "-0.04em",
            lineHeight:  0.9,
            color:       "#F5F4EE",
            marginBottom: "2.5rem",
          }}
        >
          {project.title}
        </h1>

        {/* Stats */}
        {project.stats && (
          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            {project.stats.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <span
                  style={{
                    fontFamily:  "var(--font-display)",
                    fontSize:    "2.5rem",
                    fontWeight:  700,
                    color:       "#FF5500",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.value}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "rgba(245,244,238,0.4)", letterSpacing: "0.08em" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cover image */}
      <div
        style={{
          padding:   "clamp(1.25rem,5vw,4rem)",
          aspectRatio: project.aspectRatio,
          maxHeight:   "70vh",
          overflow:   "hidden",
          position:   "relative",
        }}
      >
        {project.imageSrc ? (
          <Image src={project.imageSrc} alt={project.title} fill style={{ objectFit: "cover", borderRadius: "1rem" }} priority />
        ) : (
          <div
            className="img-placeholder"
            data-image-prompt={project.imagePrompt}
            data-aspect-ratio={project.aspectRatio}
            data-section="work-detail"
            style={{ width: "100%", height: "100%", borderRadius: "1rem" }}
          >
            <div className="placeholder-inner">
              <span className="placeholder-label">[ COVER IMAGE ]</span>
              <span className="placeholder-prompt">{project.imagePrompt.slice(0, 100)}…</span>
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div
        style={{
          padding:   "2rem clamp(1.25rem,5vw,4rem)",
          display:   "flex",
          gap:       "0.75rem",
          flexWrap:  "wrap",
        }}
      >
        {project.tags.map((tag) => (
          <span key={tag} className="section-chip">{tag}</span>
        ))}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize:   "0.7rem",
            color:      "rgba(245,244,238,0.3)",
            alignSelf:  "center",
            marginLeft: "auto",
            letterSpacing: "0.06em",
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Content placeholder */}
      <div
        style={{
          padding:    "clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,4rem)",
          borderTop:  "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <p
          style={{
            fontFamily:  "var(--font-mono)",
            fontSize:    "0.7rem",
            letterSpacing: "0.12em",
            color:       "rgba(255,85,0,0.35)",
            textAlign:   "center",
          }}
        >
          [ FULL CASE STUDY CONTENT — COMING SOON ]
        </p>
      </div>
    </main>
  )
}
