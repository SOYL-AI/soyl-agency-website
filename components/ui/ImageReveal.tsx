"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

interface ImageRevealProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  containerClassName?: string
  priority?: boolean
  accentColor?: "amber" | "teal"
}

export default function ImageReveal({
  src,
  alt,
  fill = true,
  className = "",
  containerClassName = "",
  priority = false,
  accentColor = "amber",
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [loaded, setLoaded] = useState(false)

  const overlayColor =
    accentColor === "amber"
      ? "rgba(245, 166, 35, 0.85)"
      : "rgba(175, 208, 204, 0.85)"

  return (
    <div ref={ref} className={`relative overflow-hidden ${containerClassName}`}>
      {/* Shimmer placeholder */}
      {!loaded && <div className="absolute inset-0 shimmer z-10" />}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`${className} transition-transform duration-700`}
        priority={priority}
        onLoad={() => setLoaded(true)}
      />

      {/* Wipe overlay */}
      <motion.div
        initial={{ x: "0%" }}
        animate={inView && loaded ? { x: "101%" } : { x: "0%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="absolute inset-0 z-20"
        style={{ backgroundColor: overlayColor }}
      />
    </div>
  )
}
