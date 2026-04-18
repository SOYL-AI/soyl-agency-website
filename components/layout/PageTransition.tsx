"use client"

import { motion } from "framer-motion"

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Amber sweep — exit: slides up from bottom */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.4, ease: EASE } }}
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          9997,
          background:      "#E8A020",
          transformOrigin: "bottom",
          pointerEvents:   "none",
        }}
      />
      {/* Amber sweep — enter: slides down from top */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.4, delay: 0.4, ease: EASE } }}
        exit={{ scaleY: 0 }}
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          9997,
          background:      "#E8A020",
          transformOrigin: "top",
          pointerEvents:   "none",
        }}
      />
      {/* Page content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
      >
        {children}
      </motion.div>
    </>
  )
}
