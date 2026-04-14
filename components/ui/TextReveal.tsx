"use client"

import { useRef, useLayoutEffect } from "react"

interface TextRevealProps {
  text: string
  className?: string
  highlightColor?: string
  dimColor?: string
}

export default function TextReveal({
  text,
  className = "",
  highlightColor = "#F8FCFD",
  dimColor = "#535467",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  useLayoutEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined

    const init = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const words = wordsRef.current
        if (!words.length) return

        words.forEach((word, i) => {
          gsap.fromTo(
            word,
            { color: dimColor, opacity: 0.35 },
            {
              color: highlightColor,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: `${(i / words.length) * 60 + 20}% center`,
                end: `${((i + 1) / words.length) * 60 + 25}% center`,
                scrub: 0.5,
              },
            }
          )
        })
      }, containerRef)
    }

    init()
    return () => ctx?.revert()
  }, [text, highlightColor, dimColor])

  const words = text.split(" ")

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => { if (el) wordsRef.current[i] = el }}
          className="inline-block mr-[0.3em] transition-colors"
          style={{ color: dimColor, opacity: 0.35 }}
        >
          {word}
        </span>
      ))}
    </div>
  )
}
