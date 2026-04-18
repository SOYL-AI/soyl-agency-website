"use client"

import { useRef, useMemo, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { AdaptiveDpr, MeshDistortMaterial } from "@react-three/drei"
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing"
import { BlendFunction, KernelSize } from "postprocessing"
import * as THREE from "three"

/* ─── Constants matching brand palette ────────────────────────────── */
const INDIGO     = new THREE.Color("#FF5500")
const VERMILLION = new THREE.Color("#FF4D1A")
const DARK       = new THREE.Color("#080808")
const VOID       = new THREE.Color("#030709")

/* ─── Mouse tracker (shared ref, lives outside component) ─────────── */
const mouse = { x: 0, y: 0 }

/* ════════════════════════════════════════════════════════════════════
   Fan lines — radiating from an off-centre focal point (logo DNA)
   ════════════════════════════════════════════════════════════════════ */
function FanLines() {
  const ref = useRef<THREE.LineSegments>(null!)

  const geo = useMemo(() => {
    const BLADES  = 48
    const INNER_R = 0.18
    const OUTER_R = 2.55
    /* Focal point offset — lower-left, matching the logo's sunburst origin */
    const FX = -0.38
    const FY = -0.52

    const positions: number[] = []
    const colors:    number[] = []

    for (let i = 0; i < BLADES; i++) {
      const angle = (i / BLADES) * Math.PI * 2
      const cos   = Math.cos(angle)
      const sin   = Math.sin(angle)

      /* inner vertex */
      positions.push(FX + INNER_R * cos, FY + INNER_R * sin, 0)
      /* outer vertex */
      positions.push(FX + OUTER_R * cos, FY + OUTER_R * sin, 0)

      /* colour: interpolate indigo → vermillion around the ring */
      const t  = i / BLADES
      const ca = INDIGO.clone().lerp(VERMILLION, t)
      colors.push(ca.r, ca.g, ca.b, ca.r, ca.g, ca.b)
    }

    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    g.setAttribute("color",    new THREE.Float32BufferAttribute(colors, 3))
    return g
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.z = t * 0.055
    /* subtle breathing scale */
    const s = 1 + Math.sin(t * 0.38) * 0.018
    ref.current.scale.setScalar(s)
  })

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}

/* ════════════════════════════════════════════════════════════════════
   Outer shell — dark sphere, barely-there metallic surface
   ════════════════════════════════════════════════════════════════════ */
function OuterShell() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.04
    ref.current.rotation.x = Math.sin(t * 0.025) * 0.12
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.72, 64, 64]} />
      <meshPhysicalMaterial
        color={DARK}
        metalness={0.55}
        roughness={0.45}
        transparent
        opacity={0.78}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

/* ════════════════════════════════════════════════════════════════════
   Primary ring — indigo, tilted like the logo's white oval band
   ════════════════════════════════════════════════════════════════════ */
function PrimaryRing() {
  const ref = useRef<THREE.Mesh>(null!)

  /* Matches the logo: ring tilted ~32° on X, 18° on Z */
  const baseRotation = useMemo(
    () => new THREE.Euler(Math.PI * 0.18, 0, Math.PI * 0.10),
    []
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = baseRotation.x + Math.sin(t * 0.19) * 0.05
    ref.current.rotation.y = t * 0.11
    ref.current.rotation.z = baseRotation.z + Math.cos(t * 0.13) * 0.03

    /* emissive pulse */
    const mat = ref.current.material as THREE.MeshPhysicalMaterial
    mat.emissiveIntensity = 1.2 + Math.sin(t * 0.9) * 0.35
  })

  return (
    <mesh ref={ref} rotation={baseRotation}>
      <torusGeometry args={[1.88, 0.055, 40, 160]} />
      <meshPhysicalMaterial
        color={INDIGO}
        emissive={INDIGO}
        emissiveIntensity={1.4}
        metalness={0.92}
        roughness={0.04}
        clearcoat={1}
        clearcoatRoughness={0.05}
      />
    </mesh>
  )
}

/* ════════════════════════════════════════════════════════════════════
   Secondary ring — thinner, vermillion, cross-axial orbit
   ════════════════════════════════════════════════════════════════════ */
function SecondaryRing() {
  const ref = useRef<THREE.Mesh>(null!)

  const baseRotation = useMemo(
    () => new THREE.Euler(-Math.PI * 0.05, Math.PI * 0.35, -Math.PI * 0.12),
    []
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = baseRotation.x + Math.cos(t * 0.15) * 0.04
    ref.current.rotation.y = -t * 0.07
    ref.current.rotation.z = baseRotation.z + Math.sin(t * 0.21) * 0.04

    const mat = ref.current.material as THREE.MeshPhysicalMaterial
    mat.emissiveIntensity = 0.55 + Math.sin(t * 1.1 + 1.2) * 0.2
  })

  return (
    <mesh ref={ref} rotation={baseRotation}>
      <torusGeometry args={[1.98, 0.022, 20, 160]} />
      <meshPhysicalMaterial
        color={VERMILLION}
        emissive={VERMILLION}
        emissiveIntensity={0.65}
        metalness={0.88}
        roughness={0.06}
        clearcoat={1}
        clearcoatRoughness={0.08}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

/* ════════════════════════════════════════════════════════════════════
   Inner blob — organic distorted sphere, logo's dark negative space
   ════════════════════════════════════════════════════════════════════ */
function InnerBlob() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * -0.13
    ref.current.rotation.x = Math.sin(t * 0.09) * 0.18
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.82, 64, 64]} />
      <MeshDistortMaterial
        color={VOID}
        distort={0.55}
        speed={1.8}
        metalness={0.7}
        roughness={0.25}
      />
    </mesh>
  )
}

/* ════════════════════════════════════════════════════════════════════
   Particle halo — amber/teal dust in a shell around the sphere
   ════════════════════════════════════════════════════════════════════ */
function ParticleHalo() {
  const ref = useRef<THREE.Points>(null!)

  const { geo } = useMemo(() => {
    const COUNT   = 700
    const positions = new Float32Array(COUNT * 3)
    const colorsArr = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 2.85 + Math.random() * 1.4

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7
      positions[i * 3 + 2] = r * Math.cos(phi)

      const isIndigo = Math.random() > 0.35
      const col      = isIndigo ? INDIGO : VERMILLION
      colorsArr[i * 3]     = col.r
      colorsArr[i * 3 + 1] = col.g
      colorsArr[i * 3 + 2] = col.b
    }

    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    g.setAttribute("color",    new THREE.Float32BufferAttribute(colorsArr, 3))
    return { geo: g, colors: colorsArr }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.y =  t * 0.028
    ref.current.rotation.x = -t * 0.014
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        vertexColors
        size={0.014}
        sizeAttenuation
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ════════════════════════════════════════════════════════════════════
   Orbiting lights — illuminate the rings dynamically
   ════════════════════════════════════════════════════════════════════ */
function OrbitalLights() {
  const amberRef = useRef<THREE.PointLight>(null!)
  const tealRef  = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const R = 3.5

    amberRef.current.position.set(
      Math.sin(t * 0.31) * R,
      Math.cos(t * 0.19) * R * 0.6,
      Math.cos(t * 0.31) * R,
    )
    tealRef.current.position.set(
      Math.sin(t * 0.27 + Math.PI) * R,
      Math.cos(t * 0.22 + Math.PI) * R * 0.6,
      Math.cos(t * 0.27 + Math.PI) * R,
    )
  })

  return (
    <>
      <pointLight ref={amberRef} color={INDIGO}     intensity={12} distance={8} decay={2} />
      <pointLight ref={tealRef}  color={VERMILLION} intensity={7}  distance={8} decay={2} />
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════
   Camera rig — smooth mouse parallax
   ════════════════════════════════════════════════════════════════════ */
function CameraRig() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 6.5))
  const current = useRef(new THREE.Vector3(0, 0, 6.5))

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    /* Slow idle drift + mouse offset */
    target.current.set(
      mouse.x * 0.9 + Math.sin(t * 0.08) * 0.25,
      mouse.y * 0.7 + Math.cos(t * 0.06) * 0.18,
      6.5 + Math.sin(t * 0.04) * 0.15,
    )

    current.current.lerp(target.current, 0.04)
    camera.position.copy(current.current)
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ════════════════════════════════════════════════════════════════════
   Main scene assembly
   ════════════════════════════════════════════════════════════════════ */
function SOYLLogoScene() {
  return (
    <>
      <ambientLight intensity={0.06} />
      <OrbitalLights />
      <fog attach="fog" args={["#080808", 8, 22]} />

      <OuterShell />
      <FanLines />
      <PrimaryRing />
      <SecondaryRing />
      <InnerBlob />
      <ParticleHalo />

      <CameraRig />
    </>
  )
}

/* ════════════════════════════════════════════════════════════════════
   Exported canvas
   ════════════════════════════════════════════════════════════════════ */
export default function HeroScene() {
  /* Track mouse globally — outside R3F */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <Canvas
      frameloop="always"
      camera={{ position: [0, 0, 6.5], fov: 48, near: 0.1, far: 50 }}
      gl={{
        antialias:           true,
        alpha:               true,
        toneMapping:         THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
        powerPreference:     "high-performance",
      }}
      dpr={[1, 2]}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <SOYLLogoScene />
        <AdaptiveDpr pixelated />
      </Suspense>

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={2.2}
          luminanceThreshold={0.28}
          luminanceSmoothing={0.92}
          kernelSize={KernelSize.LARGE}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0006, 0.0006)}
          blendFunction={BlendFunction.NORMAL}
        />
        <Vignette
          offset={0.22}
          darkness={0.82}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  )
}
