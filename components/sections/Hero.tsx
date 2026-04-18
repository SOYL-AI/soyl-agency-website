"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useCursorStore } from "@/store/cursor"

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false })

const HERO_LINES = ["We Build", "What You", "Imagined."]
const SUBTEXT    = "AI-native digital partner for businesses that refuse to stay small."

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const { setVariant } = useCursorStore()

  useEffect(() => {
    let cleanup: (() => void) | undefined

    const init = async () => {
      const { gsap }          = await import("gsap")
      const { SplitText }     = await import("gsap/SplitText")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(SplitText, ScrollTrigger)

      if (!titleRef.current || !subRef.current) return

      const ctx = gsap.context(() => {
        const split = new SplitText(titleRef.current!, { type: "chars,words" })
        gsap.from(split.chars, {
          opacity:  0,
          y:        80,
          rotateX: -90,
          stagger:  0.015,
          duration: 0.85,
          ease:     "back.out(1.7)",
          delay:    2.5,
          onComplete: () => split.revert(),
        })

        const subSplit = new SplitText(subRef.current!, { type: "words" })
        gsap.from(subSplit.words, {
          opacity:  0,
          y:        20,
          stagger:  0.04,
          duration: 0.6,
          ease:     "power3.out",
          delay:    3.8,
          onComplete: () => subSplit.revert(),
        })
      }, sectionRef)

      cleanup = () => ctx.revert()
    }

    init()
    return () => cleanup?.()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", minHeight: "150vh" }}
    >
      <div
        style={{
          position:   "sticky",
          top:        0,
          height:     "100svh",
          overflow:   "hidden",
          display:    "flex",
          alignItems: "center",
        }}
      >
        {/* R3F background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <HeroScene />
        </div>

        {/* Gradient vignette */}
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            inset:      0,
            zIndex:     1,
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #080808 100%)",
          }}
        />

        {/* Text content */}
        <div
          style={{
            position: "relative",
            zIndex:   2,
            padding:  "0 clamp(1.25rem, 5vw, 4rem)",
            maxWidth: "100%",
          }}
        >
          <div
            ref={titleRef}
            onMouseEnter={() => setVariant("text")}
            onMouseLeave={() => setVariant("default")}
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(3.5rem, 11vw, 10rem)",
              fontWeight:    700,
              lineHeight:    0.92,
              letterSpacing: "-0.03em",
              color:         "#F5F4EE",
              marginBottom:  "2rem",
            }}
          >
            {HERO_LINES.map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <span style={{ display: "inline-block" }}>{line}</span>
              </div>
            ))}
          </div>

          <p
            ref={subRef}
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "clamp(0.75rem, 1.4vw, 1rem)",
              color:         "rgba(255,85,0,0.85)",
              letterSpacing: "0.06em",
              maxWidth:      "42ch",
              lineHeight:    1.6,
            }}
          >
            {SUBTEXT}
          </p>
        </div>

        {/* Bottom-left meta */}
        <div
          style={{
            position:      "absolute",
            bottom:        "clamp(1.5rem, 4vw, 2.5rem)",
            left:          "clamp(1.25rem, 5vw, 4rem)",
            zIndex:        2,
            fontFamily:    "var(--font-label)",
            fontSize:      "0.65rem",
            letterSpacing: "0.2em",
            color:         "rgba(245,244,238,0.4)",
            textTransform: "uppercase",
          }}
        >
          Bengaluru, India · Est. 2024
        </div>

        {/* Bottom-right — rotating scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom:   "clamp(1.5rem, 4vw, 2.5rem)",
            right:    "clamp(1.25rem, 5vw, 4rem)",
            zIndex:   2,
            width:    80,
            height:   80,
          }}
        >
          <svg
            viewBox="0 0 80 80"
            width="80"
            height="80"
            style={{ animation: "spin-slow 10s linear infinite" }}
          >
            <defs>
              <path
                id="circle-path"
                d="M 40 40 m -28 0 a 28 28 0 1 1 56 0 a 28 28 0 1 1 -56 0"
              />
            </defs>
            <text
              fontSize="7"
              fontFamily="var(--font-label)"
              letterSpacing="3.2"
              fill="rgba(255,85,0,0.6)"
            >
              <textPath href="#circle-path">
                SCROLL TO EXPLORE · SCROLL TO EXPLORE ·
              </textPath>
            </text>
          </svg>
          {/* Center dot */}
          <div
            style={{
              position:     "absolute",
              top:          "50%",
              left:         "50%",
              transform:    "translate(-50%, -50%)",
              width:        6,
              height:       6,
              borderRadius: "50%",
              background:   "#FF5500",
            }}
          />
        </div>
      </div>
    </section>
  )
}
