let registered = false

export async function registerGSAP() {
  if (registered || typeof window === "undefined") return
  const { gsap } = await import("gsap")
  const { ScrollTrigger } = await import("gsap/ScrollTrigger")
  const { SplitText } = await import("gsap/SplitText")
  gsap.registerPlugin(ScrollTrigger, SplitText)
  registered = true
}
