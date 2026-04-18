"use client"

import { useEffect, useRef } from "react"

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let id: ReturnType<typeof setTimeout>

    function resize() {
      if (!canvas) return
      canvas.width  = Math.ceil(window.innerWidth  * (window.devicePixelRatio ?? 1))
      canvas.height = Math.ceil(window.innerHeight * (window.devicePixelRatio ?? 1))
      canvas.style.width  = window.innerWidth  + "px"
      canvas.style.height = window.innerHeight + "px"
    }

    function drawNoise() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0
        data[i]     = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
      id = setTimeout(drawNoise, 150)
    }

    resize()
    drawNoise()

    window.addEventListener("resize", resize)
    return () => {
      clearTimeout(id)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        pointerEvents: "none",
        zIndex:        9999,
        opacity:       0.035,
        mixBlendMode:  "overlay",
      }}
    />
  )
}
