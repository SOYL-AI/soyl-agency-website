"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"
import { Suspense, useEffect } from "react"
import { useLenis } from "@/components/layout/LenisProvider"

function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y += 0.0015
    meshRef.current.rotation.x = Math.sin(t * 0.12) * 0.2
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 3]} />
      <meshBasicMaterial
        color="#E8A020"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  )
}

function InvalidateOnScroll() {
  const { invalidate } = useThree()
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const handler = () => invalidate()
    lenis.on("scroll", handler)
    return () => lenis.off("scroll", handler)
  }, [lenis, invalidate])

  return null
}

export default function ContactScene() {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <WireframeSphere />
        <InvalidateOnScroll />
      </Suspense>
      <EffectComposer>
        <Bloom intensity={0.3} luminanceThreshold={0.7} luminanceSmoothing={0.9} />
      </EffectComposer>
    </Canvas>
  )
}
