"use client"

import { createContext, useContext, useEffect, useRef } from "react"
import type Lenis from "lenis"

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    let lenis: Lenis
    let gsap: typeof import("gsap").gsap
    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger

    const init = async () => {
      const LenisModule   = await import("lenis")
      const gsapModule    = await import("gsap")
      const STModule      = await import("gsap/ScrollTrigger")
      const SplitModule   = await import("gsap/SplitText")

      gsap          = gsapModule.gsap
      ScrollTrigger = STModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger, SplitModule.SplitText)

      lenis = new LenisModule.default({
        duration:          1.2,
        easing:            (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation:       "vertical",
        gestureOrientation: "vertical",
        smoothWheel:       true,
        wheelMultiplier:   1,
        touchMultiplier:   2,
      })

      lenisRef.current = lenis

      lenis.on("scroll", () => ScrollTrigger.update())

      const ticker = (time: number) => { lenis.raf(time * 1000) }
      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)

      return () => {
        lenis.destroy()
        gsap.ticker.remove(ticker)
        ScrollTrigger.killAll()
      }
    }

    let cleanup: (() => void) | undefined
    init().then((fn) => { cleanup = fn })

    return () => { cleanup?.() }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
