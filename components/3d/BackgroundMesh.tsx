"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

const GRID_SIZE = 32
const SPACING = 0.6
const POINT_SIZE = 1.5
const INFLUENCE_RADIUS = 3.0
const LIFT_STRENGTH = 0.4
const AMBER = new THREE.Color("#F5A623")
const DIM = new THREE.Color("#1a1a2e")

export default function BackgroundMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    // Only render on lg+ screens for performance
    const check = () => setIsLargeScreen(window.innerWidth >= 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (!isLargeScreen) return
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.set(0, 8, 12)
    camera.lookAt(0, 0, 0)

    // ── Grid of points ──────────────────────────────────────────────
    const total = GRID_SIZE * GRID_SIZE
    const positions = new Float32Array(total * 3)
    const colors = new Float32Array(total * 3)
    const basePositions = new Float32Array(total * 3)

    const halfGrid = (GRID_SIZE - 1) * SPACING * 0.5
    for (let ix = 0; ix < GRID_SIZE; ix++) {
      for (let iz = 0; iz < GRID_SIZE; iz++) {
        const idx = (ix * GRID_SIZE + iz) * 3
        const x = ix * SPACING - halfGrid
        const z = iz * SPACING - halfGrid
        positions[idx] = x
        positions[idx + 1] = 0
        positions[idx + 2] = z
        basePositions[idx] = x
        basePositions[idx + 1] = 0
        basePositions[idx + 2] = z
        colors[idx] = DIM.r
        colors[idx + 1] = DIM.g
        colors[idx + 2] = DIM.b
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: POINT_SIZE * 0.02,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // ── Wireframe grid lines ────────────────────────────────────────
    const linePositions: number[] = []
    for (let ix = 0; ix < GRID_SIZE; ix++) {
      for (let iz = 0; iz < GRID_SIZE - 1; iz++) {
        const idx1 = (ix * GRID_SIZE + iz) * 3
        const idx2 = (ix * GRID_SIZE + iz + 1) * 3
        linePositions.push(
          positions[idx1], positions[idx1 + 1], positions[idx1 + 2],
          positions[idx2], positions[idx2 + 1], positions[idx2 + 2]
        )
      }
    }
    for (let iz = 0; iz < GRID_SIZE; iz++) {
      for (let ix = 0; ix < GRID_SIZE - 1; ix++) {
        const idx1 = (ix * GRID_SIZE + iz) * 3
        const idx2 = ((ix + 1) * GRID_SIZE + iz) * 3
        linePositions.push(
          positions[idx1], positions[idx1 + 1], positions[idx1 + 2],
          positions[idx2], positions[idx2 + 1], positions[idx2 + 2]
        )
      }
    }

    const lineGeo = new THREE.BufferGeometry()
    const linePosAttr = new Float32Array(linePositions.length)
    linePosAttr.set(linePositions)
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePosAttr, 3))

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x1a1a2e,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const wireframe = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(wireframe)

    // ── Mouse tracking ──────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const mouseNDC = new THREE.Vector2()
    const intersectPoint = new THREE.Vector3()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      mouseRef.current.active = true

      raycaster.setFromCamera(mouseNDC, camera)
      if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
        mouseRef.current.x = intersectPoint.x
        mouseRef.current.y = intersectPoint.z
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // ── Resize ──────────────────────────────────────────────────────
    function onResize() {
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    onResize()
    const ro = new ResizeObserver(onResize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    // ── Animation ───────────────────────────────────────────────────
    let animId = 0
    const clock = new THREE.Clock()
    const tempColor = new THREE.Color()

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const posAttr = geo.attributes.position as THREE.BufferAttribute
      const colAttr = geo.attributes.color as THREE.BufferAttribute

      for (let ix = 0; ix < GRID_SIZE; ix++) {
        for (let iz = 0; iz < GRID_SIZE; iz++) {
          const idx = ix * GRID_SIZE + iz
          const idx3 = idx * 3
          const baseX = basePositions[idx3]
          const baseZ = basePositions[idx3 + 2]

          // Ambient wave
          let yTarget = Math.sin(baseX * 0.5 + t * 0.3) * Math.cos(baseZ * 0.5 + t * 0.2) * 0.15

          // Mouse influence
          let influence = 0
          if (mouseRef.current.active) {
            const dx = baseX - mouseRef.current.x
            const dz = baseZ - mouseRef.current.y
            const dist = Math.sqrt(dx * dx + dz * dz)
            if (dist < INFLUENCE_RADIUS) {
              influence = 1 - dist / INFLUENCE_RADIUS
              influence = influence * influence // quadratic falloff
              yTarget += influence * LIFT_STRENGTH
            }
          }

          // Smooth lerp
          const currentY = positions[idx3 + 1]
          positions[idx3 + 1] = currentY + (yTarget - currentY) * 0.08

          // Color — lerp to amber near cursor
          tempColor.copy(DIM).lerp(AMBER, influence * 0.7)
          colors[idx3] = tempColor.r
          colors[idx3 + 1] = tempColor.g
          colors[idx3 + 2] = tempColor.b
        }
      }

      posAttr.needsUpdate = true
      colAttr.needsUpdate = true

      // Update wireframe line positions to match point positions
      let lineIdx = 0
      const linePos = lineGeo.attributes.position as THREE.BufferAttribute
      for (let ix = 0; ix < GRID_SIZE; ix++) {
        for (let iz = 0; iz < GRID_SIZE - 1; iz++) {
          const idx1 = (ix * GRID_SIZE + iz) * 3
          const idx2 = (ix * GRID_SIZE + iz + 1) * 3
          linePosAttr[lineIdx * 3] = positions[idx1]
          linePosAttr[lineIdx * 3 + 1] = positions[idx1 + 1]
          linePosAttr[lineIdx * 3 + 2] = positions[idx1 + 2]
          lineIdx++
          linePosAttr[lineIdx * 3] = positions[idx2]
          linePosAttr[lineIdx * 3 + 1] = positions[idx2 + 1]
          linePosAttr[lineIdx * 3 + 2] = positions[idx2 + 2]
          lineIdx++
        }
      }
      for (let iz = 0; iz < GRID_SIZE; iz++) {
        for (let ix = 0; ix < GRID_SIZE - 1; ix++) {
          const idx1 = (ix * GRID_SIZE + iz) * 3
          const idx2 = ((ix + 1) * GRID_SIZE + iz) * 3
          linePosAttr[lineIdx * 3] = positions[idx1]
          linePosAttr[lineIdx * 3 + 1] = positions[idx1 + 1]
          linePosAttr[lineIdx * 3 + 2] = positions[idx1 + 2]
          lineIdx++
          linePosAttr[lineIdx * 3] = positions[idx2]
          linePosAttr[lineIdx * 3 + 1] = positions[idx2 + 1]
          linePosAttr[lineIdx * 3 + 2] = positions[idx2 + 2]
          lineIdx++
        }
      }
      linePos.needsUpdate = true

      // Gentle rotation for depth
      points.rotation.y = t * 0.01
      wireframe.rotation.y = t * 0.01

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      ro.disconnect()
      renderer.dispose()
      geo.dispose()
      lineGeo.dispose()
      mat.dispose()
      lineMat.dispose()
    }
  }, [isLargeScreen])

  if (!isLargeScreen) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
      style={{ opacity: 0.4 }}
    />
  )
}
