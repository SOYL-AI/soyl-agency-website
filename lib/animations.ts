import type { Variants } from "framer-motion"

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
}

export const clipRevealLeft: Variants = {
  hidden:  { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.7, ease: EASE_IN_OUT_QUART } },
}

export const clipRevealUp: Variants = {
  hidden:  { clipPath: "inset(100% 0 0 0)" },
  visible: { clipPath: "inset(0% 0 0 0)", transition: { duration: 0.6, ease: EASE_IN_OUT_QUART } },
}

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } },
})

export const charReveal: Variants = {
  hidden:  { opacity: 0, y: 80, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: EASE_SPRING },
  },
}

export const pageEnter: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6, ease: EASE_OUT_EXPO } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export const sweepPanelExit: Variants = {
  initial: { scaleY: 0, originY: "bottom" },
  animate: { scaleY: 0, originY: "bottom" },
  exit:    { scaleY: 1, originY: "bottom", transition: { duration: 0.4, ease: EASE_IN_OUT_QUART } },
}

export const sweepPanelEnter: Variants = {
  initial: { scaleY: 1, originY: "top" },
  animate: { scaleY: 0, originY: "top", transition: { duration: 0.4, delay: 0.4, ease: EASE_IN_OUT_QUART } },
  exit:    { scaleY: 0, originY: "top" },
}
