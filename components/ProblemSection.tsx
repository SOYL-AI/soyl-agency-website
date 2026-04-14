"use client"

import { useRef, useLayoutEffect } from "react"
import { motion } from "framer-motion"

const problems = [
  {
    problem: "₹50K–₹3L/month agency retainers",
    solution: "₹4,999–₹74,999/month subscription with clear deliverables",
  },
  {
    problem: "2–8 week turnarounds",
    solution: "5–14 day delivery using AI + pre-built templates",
  },
  {
    problem: "5–7 freelancers to manage",
    solution: "One accountable AI-augmented partner for everything",
  },
  {
    problem: "Opaque processes, hard to measure ROI",
    solution: "Real-time dashboards and weekly automated reports",
  },
  {
    problem: "Scaling means hiring more headcount",
    solution: "Scale with AI — adding clients = marginal cost per subscription",
  },
  {
    problem: "No AI, no systems, no scale",
    solution: "AI is core to every single service we deliver",
  },
]

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const problemRefs = useRef<(HTMLDivElement | null)[]>([])
  const solutionRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const dividerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any

    const init = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Pin the inner content while the tall spacer scrolls
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".problem-sticky",
          pinSpacing: false,
          anticipatePin: 1,
        })

        // Animated divider between columns (#6 enhancement)
        if (dividerRef.current) {
          gsap.fromTo(
            dividerRef.current,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "0% top",
                end: "100% top",
                scrub: 0.6,
              },
            }
          )
        }

        // Animate each problem/solution pair
        problems.forEach((_, i) => {
          const total = problems.length
          const start = i / total
          const end = (i + 1) / total

          // Strike-through line grows across problem text
          gsap.fromTo(
            lineRefs.current[i],
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              transformOrigin: "left center",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `${start * 100}% top`,
                end: `${(start + (end - start) * 0.4) * 100}% top`,
                scrub: 0.8,
              },
            }
          )

          // Problem text fades to gray
          gsap.to(problemRefs.current[i], {
            color: "#535467",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${start * 100}% top`,
              end: `${(start + (end - start) * 0.5) * 100}% top`,
              scrub: 0.8,
            },
          })

          // Solution fades in with a slide
          gsap.fromTo(
            solutionRefs.current[i],
            { opacity: 0, x: 30, filter: "blur(4px)" },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `${(start + (end - start) * 0.3) * 100}% top`,
                end: `${(start + (end - start) * 0.7) * 100}% top`,
                scrub: 0.6,
              },
            }
          )

          // Solution icon pulse
          const solutionEl = solutionRefs.current[i]
          if (solutionEl) {
            const icon = solutionEl.querySelector(".solution-icon")
            if (icon) {
              gsap.fromTo(
                icon,
                { scale: 0, opacity: 0 },
                {
                  scale: 1,
                  opacity: 1,
                  ease: "back.out(2)",
                  scrollTrigger: {
                    trigger: sectionRef.current,
                    start: `${(start + (end - start) * 0.4) * 100}% top`,
                    end: `${(start + (end - start) * 0.6) * 100}% top`,
                    scrub: 0.4,
                  },
                }
              )
            }
          }
        })
      }, sectionRef)

      ScrollTrigger.refresh()
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    // The section is tall to give scroll real estate for GSAP
    <div ref={sectionRef} className="relative" style={{ height: `${problems.length * 100 + 100}vh` }} id="problem">
      {/* This div gets pinned */}
      <div className="problem-sticky h-screen flex items-center overflow-hidden top-0">
        <div className="max-w-7xl mx-auto px-6 w-full py-16">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 lg:mb-16"
          >
            <span className="section-chip mb-4 inline-flex">The Problem</span>
            <h2 className="font-heading font-bold text-display-md text-soyl-white">
              Traditional agencies are{" "}
              <span className="text-gradient-amber">broken</span> for SMBs.
            </h2>
          </motion.div>

          {/* Two-column table with animated divider (#6) */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 relative">
            {/* Animated center divider (#6) */}
            <div
              ref={dividerRef}
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px"
              style={{
                background: "linear-gradient(180deg, transparent, rgba(245,166,35,0.4), rgba(175,208,204,0.4), transparent)",
                transform: "scaleY(0)",
                transformOrigin: "top center",
              }}
            />

            {/* Left — Problems */}
            <div className="space-y-5">
              <p className="text-xs font-heading font-semibold tracking-widest uppercase text-soyl-gray mb-6">
                The old way
              </p>
              {problems.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => { problemRefs.current[i] = el }}
                  className="relative font-body text-base md:text-lg text-soyl-white py-2"
                >
                  {/* Strike-through line */}
                  <span
                    ref={(el) => { lineRefs.current[i] = el }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-soyl-amber/60"
                    style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
                  />
                  {item.problem}
                </div>
              ))}
            </div>

            {/* Right — Solutions */}
            <div className="space-y-5">
              <p className="text-xs font-heading font-semibold tracking-widest uppercase text-soyl-teal mb-6">
                The SOYL way
              </p>
              {problems.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => { solutionRefs.current[i] = el }}
                  className="font-body text-base md:text-lg text-soyl-teal py-2 opacity-0 flex items-center gap-3"
                >
                  <span className="solution-icon w-5 h-5 rounded-full bg-soyl-teal/15 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.5L4 7.5L8 3" stroke="#AFD0CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item.solution}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
