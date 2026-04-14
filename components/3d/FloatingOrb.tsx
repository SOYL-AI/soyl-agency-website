"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

const AMBER = new THREE.Color("#F5A623")
const TEAL  = new THREE.Color("#AFD0CC")

export default function FloatingOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50)
    camera.position.set(0, 0, 4)

    // ── Glass sphere ────────────────────────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(0.8, 64, 64)
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a2e,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.92,
      thickness: 1.5,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.0,
      transparent: true,
      opacity: 0.85,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphere)

    // ── Inner glow core ─────────────────────────────────────────────
    const coreGeo = new THREE.SphereGeometry(0.25, 32, 32)
    const coreMat = new THREE.MeshBasicMaterial({
      color: AMBER,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    sphere.add(core)

    // ── Inner particle swirl ────────────────────────────────────────
    const particleCount = 200
    const particlePos = new Float32Array(particleCount * 3)
    const particleVel: THREE.Vector3[] = []
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 0.15 + Math.random() * 0.5
      particlePos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      particlePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      particlePos[i * 3 + 2] = r * Math.cos(phi)
      particleVel.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
      ))
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3))
    const particleMat = new THREE.PointsMaterial({
      color: TEAL,
      size: 0.015,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    sphere.add(particles)

    // ── Lighting ────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(AMBER, 2, 10)
    pointLight1.position.set(2, 1, 3)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(TEAL, 1.5, 10)
    pointLight2.position.set(-2, -1, 2)
    scene.add(pointLight2)

    // ── Mouse tracking (#15 — reacts to mouse proximity) ────────────
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    canvas.addEventListener("mousemove", handleMouseMove)

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

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Floating orbit
      sphere.position.y = Math.sin(t * 0.5) * 0.15
      sphere.position.x = Math.cos(t * 0.3) * 0.08

      // Slow rotation
      sphere.rotation.y = t * 0.15
      sphere.rotation.x = Math.sin(t * 0.2) * 0.1

      // Mouse influence — tilt toward cursor
      const targetRotX = mouseRef.current.y * 0.2
      const targetRotZ = -mouseRef.current.x * 0.1
      sphere.rotation.x += (targetRotX - sphere.rotation.x) * 0.03
      sphere.rotation.z += (targetRotZ - sphere.rotation.z) * 0.03

      // Core pulsation
      const pulse = 0.5 + Math.sin(t * 2) * 0.15
      coreMat.opacity = pulse
      core.scale.setScalar(0.9 + Math.sin(t * 1.5) * 0.15)

      // Inner particle swirl
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3
        particlePos[idx] += particleVel[i].x
        particlePos[idx + 1] += particleVel[i].y
        particlePos[idx + 2] += particleVel[i].z

        // Constrain to sphere
        const dist = Math.sqrt(
          particlePos[idx] ** 2 +
          particlePos[idx + 1] ** 2 +
          particlePos[idx + 2] ** 2
        )
        if (dist > 0.6) {
          particleVel[i].multiplyScalar(-0.9)
          const scale = 0.59 / dist
          particlePos[idx] *= scale
          particlePos[idx + 1] *= scale
          particlePos[idx + 2] *= scale
        }
      }
      posAttr.needsUpdate = true

      // Light color cycle
      pointLight1.color.copy(AMBER).lerp(TEAL, Math.sin(t * 0.3) * 0.5 + 0.5)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener("mousemove", handleMouseMove)
      ro.disconnect()
      renderer.dispose()
      sphereGeo.dispose()
      sphereMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}
