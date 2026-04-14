"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

// ─── Configuration ───────────────────────────────────────────────────
const NODE_COUNT    = 380      // More nodes for density
const SPHERE_R      = 3.0
const LINK_DIST     = 0.85     // Longer edges = more connections
const NODE_SIZE_MIN = 0.025
const NODE_SIZE_MAX = 0.065    // Bigger highlight nodes

// Colors with bloom-like intensity
const AMBER         = new THREE.Color("#F5A623")
const AMBER_BRIGHT  = new THREE.Color("#FFD080")
const TEAL          = new THREE.Color("#AFD0CC")
const TEAL_BRIGHT   = new THREE.Color("#D4F0EC")
const DIM_WHITE     = new THREE.Color("#7799AA")

// ─── Shape generators ────────────────────────────────────────────────
function randomLogoPoint(index: number, total: number) {
  const numRibbons = 3
  const ribbonId = index % numRibbons
  const t = (index / total) * Math.PI * 2 * numRibbons
  const waves = 5
  const baseR = 2.1
  const phase = ribbonId * 0.6
  const thickness = (ribbonId - 1) * 0.25
  const waveShape = Math.sin(t * waves + phase)
  const currentR = baseR + (waveShape * 0.75) + thickness
  const scatter = 0.08
  const x = currentR * Math.cos(t) + (Math.random() - 0.5) * scatter
  const y = currentR * Math.sin(t) + (Math.random() - 0.5) * scatter
  const z = Math.cos(t * waves + phase) * 0.6 + (ribbonId - 1) * 0.3
  return new THREE.Vector3(x, y, z)
}

function torusPoint(index: number, total: number) {
  const t = (index / total) * Math.PI * 2
  const tubeR = 0.6
  const ringR = 2.0
  const phi = (index * 2.399) % (Math.PI * 2)
  const x = (ringR + tubeR * Math.cos(phi)) * Math.cos(t)
  const y = (ringR + tubeR * Math.cos(phi)) * Math.sin(t) * 0.7
  const z = tubeR * Math.sin(phi)
  return new THREE.Vector3(x, y, z)
}

function helixPoint(index: number, total: number) {
  const t = (index / total) * Math.PI * 4 - Math.PI * 2
  const strand = index % 2
  const helixR = 1.8
  const offset = strand * Math.PI
  const x = helixR * Math.cos(t + offset)
  const y = t * 0.5
  const z = helixR * Math.sin(t + offset)
  return new THREE.Vector3(x, y, z)
}

function randomSpherePoint(rMin: number, rMax: number, yFlatten = 0.72) {
  const theta = Math.random() * Math.PI * 2
  const phi   = Math.acos(2 * Math.random() - 1)
  const r     = rMin + Math.random() * (rMax - rMin)
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta) * yFlatten,
    r * Math.cos(phi)
  )
}

export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const el: HTMLCanvasElement = canvas

    // ── Renderer ─────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.4

    const scene  = new THREE.Scene()
    scene.fog    = new THREE.FogExp2(0x080808, 0.04)
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100)
    camera.position.set(0, 0, 7.5)

    // ── Node hierarchy — hub nodes + regular nodes ───────────────────
    const nodePos: THREE.Vector3[]  = []
    const nodeVel: THREE.Vector3[]  = []
    const nodeBase: THREE.Vector3[] = []
    const nodeType: ("hub" | "mid" | "small")[] = []

    const shapes = {
      logo:  [] as THREE.Vector3[],
      torus: [] as THREE.Vector3[],
      helix: [] as THREE.Vector3[],
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      const logoP = randomLogoPoint(i, NODE_COUNT)
      shapes.logo.push(logoP.clone())
      shapes.torus.push(torusPoint(i, NODE_COUNT))
      shapes.helix.push(helixPoint(i, NODE_COUNT))

      nodePos.push(logoP.clone())
      nodeBase.push(logoP.clone())
      nodeVel.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.0008,
        (Math.random() - 0.5) * 0.0008,
        (Math.random() - 0.5) * 0.0008,
      ))

      // Assign node types — hubs are brighter and bigger
      if (i % 12 === 0) nodeType.push("hub")
      else if (i % 4 === 0) nodeType.push("mid")
      else nodeType.push("small")
    }

    // ── Create node meshes with glow ─────────────────────────────────
    const nodeMeshGroup = new THREE.Group()
    scene.add(nodeMeshGroup)
    const nodeMats: THREE.MeshBasicMaterial[] = []

    // Glow sprite for hub nodes (simulates bloom)
    const glowCanvas = document.createElement("canvas")
    glowCanvas.width = 64
    glowCanvas.height = 64
    const glowCtx = glowCanvas.getContext("2d")!
    const gradient = glowCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.5)")
    gradient.addColorStop(0.3, "rgba(255, 200, 100, 0.2)")
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
    glowCtx.fillStyle = gradient
    glowCtx.fillRect(0, 0, 64, 64)
    const glowTexture = new THREE.CanvasTexture(glowCanvas)

    nodePos.forEach((pos, i) => {
      const type = nodeType[i]
      let color: THREE.Color
      let size: number
      let opacity: number

      if (type === "hub") {
        // Hub nodes — bright glowing amber or teal, biggest
        color = i % 24 === 0 ? AMBER_BRIGHT.clone() : TEAL_BRIGHT.clone()
        size = NODE_SIZE_MAX
        opacity = 0.95

        // Add glow sprite behind hub
        const spriteMat = new THREE.SpriteMaterial({
          map: glowTexture,
          color: i % 24 === 0 ? AMBER : TEAL,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
        const sprite = new THREE.Sprite(spriteMat)
        sprite.scale.set(0.5, 0.5, 0.5)
        sprite.position.copy(pos)
        nodeMeshGroup.add(sprite)
      } else if (type === "mid") {
        // Mid nodes — colored but smaller
        color = i % 8 === 0 ? AMBER.clone() : TEAL.clone()
        size = NODE_SIZE_MIN + (NODE_SIZE_MAX - NODE_SIZE_MIN) * 0.5
        opacity = 0.75
      } else {
        // Small nodes — dim background texture
        color = DIM_WHITE.clone()
        size = NODE_SIZE_MIN + Math.random() * 0.01
        opacity = 0.4 + Math.random() * 0.25
      }

      const geo = new THREE.SphereGeometry(size, 8, 8)
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
      })
      nodeMats.push(mat)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(pos)
      nodeMeshGroup.add(mesh)
    })

    // ── Dense Edges ──────────────────────────────────────────────────
    type Edge = [number, number]
    const edges: Edge[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodePos[i].distanceTo(nodePos[j])
        // Hub-to-hub connections reach further
        const maxDist = (nodeType[i] === "hub" || nodeType[j] === "hub")
          ? LINK_DIST * 1.6
          : LINK_DIST
        if (dist < maxDist) {
          edges.push([i, j])
        }
      }
    }

    const edgePosArr = new Float32Array(edges.length * 6)
    const edgeColArr = new Float32Array(edges.length * 6)

    edges.forEach(([a, b], k) => {
      edgePosArr[k*6]   = nodePos[a].x; edgePosArr[k*6+1] = nodePos[a].y; edgePosArr[k*6+2] = nodePos[a].z
      edgePosArr[k*6+3] = nodePos[b].x; edgePosArr[k*6+4] = nodePos[b].y; edgePosArr[k*6+5] = nodePos[b].z

      // Color edges based on connected node types
      const hubA = nodeType[a] === "hub"
      const hubB = nodeType[b] === "hub"
      const edgeIntensity = (hubA || hubB) ? 0.6 : 0.3
      const t = Math.random()
      const ca = AMBER.clone().lerp(TEAL, t).multiplyScalar(edgeIntensity)
      const cb = TEAL.clone().lerp(AMBER, t).multiplyScalar(edgeIntensity)
      edgeColArr[k*6]   = ca.r; edgeColArr[k*6+1] = ca.g; edgeColArr[k*6+2] = ca.b
      edgeColArr[k*6+3] = cb.r; edgeColArr[k*6+4] = cb.g; edgeColArr[k*6+5] = cb.b
    })

    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePosArr, 3))
    edgeGeo.setAttribute("color",    new THREE.BufferAttribute(edgeColArr, 3))
    const edgeMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat)
    scene.add(edgeLines)

    // ── Multiple pulse channels (simultaneous glowing edges) ─────────
    const PULSE_COUNT = 5
    const pulseStates = Array.from({ length: PULSE_COUNT }, () => ({
      edgeIdx: 0,
      phase: 1,
      nextTime: Math.random() * 2,
      color: Math.random() > 0.5 ? AMBER : TEAL,
    }))

    const pulsePosArr = new Float32Array(PULSE_COUNT * 6)
    const pulseColArr = new Float32Array(PULSE_COUNT * 6)
    const pulseGeo = new THREE.BufferGeometry()
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePosArr, 3))
    pulseGeo.setAttribute("color", new THREE.BufferAttribute(pulseColArr, 3))
    const pulseMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const pulseLine = new THREE.LineSegments(pulseGeo, pulseMat)
    scene.add(pulseLine)

    // ── Ambient halo particles ─────────────────────────────────────────
    const haloCount = 900
    const haloPos   = new Float32Array(haloCount * 3)
    const haloSizes = new Float32Array(haloCount)
    for (let i = 0; i < haloCount; i++) {
      const p = randomSpherePoint(SPHERE_R * 0.8, SPHERE_R * 1.8, 0.6)
      haloPos[i*3] = p.x; haloPos[i*3+1] = p.y; haloPos[i*3+2] = p.z
      haloSizes[i] = 0.005 + Math.random() * 0.012
    }
    const haloGeo = new THREE.BufferGeometry()
    haloGeo.setAttribute("position", new THREE.BufferAttribute(haloPos, 3))
    const haloMat = new THREE.PointsMaterial({
      color: new THREE.Color("#AAC8DD"),
      size: 0.012,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const halo = new THREE.Points(haloGeo, haloMat)
    scene.add(halo)

    // ── Second halo layer — warm tones ─────────────────────────────────
    const halo2Count = 400
    const halo2Pos = new Float32Array(halo2Count * 3)
    for (let i = 0; i < halo2Count; i++) {
      const p = randomSpherePoint(SPHERE_R * 0.5, SPHERE_R * 1.2, 0.5)
      halo2Pos[i*3] = p.x; halo2Pos[i*3+1] = p.y; halo2Pos[i*3+2] = p.z
    }
    const halo2Geo = new THREE.BufferGeometry()
    halo2Geo.setAttribute("position", new THREE.BufferAttribute(halo2Pos, 3))
    const halo2Mat = new THREE.PointsMaterial({
      color: AMBER,
      size: 0.008,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const halo2 = new THREE.Points(halo2Geo, halo2Mat)
    scene.add(halo2)

    // ── Resize ────────────────────────────────────────────────────────
    let w = 0, h = 0
    function onResize() {
      const parent = el.parentElement
      if (!parent) return
      w = parent.clientWidth; h = parent.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    onResize()
    const ro = new ResizeObserver(onResize)
    if (el.parentElement) ro.observe(el.parentElement)

    // ── Touch/Mouse interaction ────────────────────────────────────────
    const interaction = { x: 0, y: 0, active: false }

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect()
      interaction.x = ((clientX - rect.left) / rect.width - 0.5) * 2
      interaction.y = -((clientY - rect.top) / rect.height - 0.5) * 2
      interaction.active = true
    }

    const handleMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const handlePointerEnd = () => { interaction.active = false }

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("touchstart", handleTouchMove, { passive: true })
    el.addEventListener("touchmove", handleTouchMove, { passive: true })
    el.addEventListener("touchend", handlePointerEnd)
    el.addEventListener("mouseleave", handlePointerEnd)

    // ── Morph state (#13) ─────────────────────────────────────────────
    let scrollProgress = 0
    const handleScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = docH > 0 ? window.scrollY / docH : 0
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    function getMorphTarget(progress: number): THREE.Vector3[] {
      if (progress < 0.33) {
        const t = progress / 0.33
        return shapes.logo.map((lp, i) =>
          lp.clone().lerp(shapes.torus[i], smoothstep(t))
        )
      } else if (progress < 0.66) {
        const t = (progress - 0.33) / 0.33
        return shapes.torus.map((tp, i) =>
          tp.clone().lerp(shapes.helix[i], smoothstep(t))
        )
      } else {
        const t = (progress - 0.66) / 0.34
        return shapes.helix.map((hp, i) =>
          hp.clone().lerp(shapes.logo[i], smoothstep(t))
        )
      }
    }

    function smoothstep(t: number) {
      t = Math.max(0, Math.min(1, t))
      return t * t * (3 - 2 * t)
    }

    // ── Animation ─────────────────────────────────────────────────────
    let animId = 0
    const clock = new THREE.Clock()
    const smoothInteraction = { x: 0, y: 0 }

    // Track mesh children for position updates (skip glow sprites)
    const nodeStartIdx = nodeMeshGroup.children.findIndex(
      c => c instanceof THREE.Mesh
    )

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth interaction lerp
      const lerpFactor = interaction.active ? 0.06 : 0.02
      smoothInteraction.x += (interaction.x - smoothInteraction.x) * lerpFactor
      smoothInteraction.y += (interaction.y - smoothInteraction.y) * lerpFactor
      if (!interaction.active) {
        smoothInteraction.x *= 0.97
        smoothInteraction.y *= 0.97
      }

      // Camera orbit — responds to touch/mouse
      const orbitR = 7.5
      const baseAngle = t * 0.06
      camera.position.x = Math.sin(baseAngle + smoothInteraction.x * 0.5) * orbitR
      camera.position.z = Math.cos(baseAngle + smoothInteraction.x * 0.5) * orbitR
      camera.position.y = Math.sin(t * 0.035) * 1.0 + smoothInteraction.y * 1.5
      camera.lookAt(0, 0, 0)

      // Morphing — update base positions
      const morphTargets = getMorphTarget(scrollProgress)
      morphTargets.forEach((target, i) => {
        nodeBase[i].lerp(target, 0.03)
      })

      // Drift nodes
      let meshIdx = 0
      nodePos.forEach((pos, i) => {
        pos.add(nodeVel[i])
        const dist = pos.distanceTo(nodeBase[i])
        if (dist > 0.12) {
          nodeVel[i].sub(pos.clone().sub(nodeBase[i]).multiplyScalar(0.012))
        }

        // Update all mesh children that belong to this node
        // Hub nodes have a sprite + mesh, others just mesh
        if (nodeType[i] === "hub") {
          // Sprite (glow)
          const sprite = nodeMeshGroup.children[meshIdx]
          if (sprite) sprite.position.copy(pos)
          meshIdx++
        }
        // Mesh (node sphere)
        const mesh = nodeMeshGroup.children[meshIdx]
        if (mesh) mesh.position.copy(pos)
        meshIdx++
      })

      // Rebuild edge positions
      edges.forEach(([a, b], k) => {
        edgePosArr[k*6]   = nodePos[a].x; edgePosArr[k*6+1] = nodePos[a].y; edgePosArr[k*6+2] = nodePos[a].z
        edgePosArr[k*6+3] = nodePos[b].x; edgePosArr[k*6+4] = nodePos[b].y; edgePosArr[k*6+5] = nodePos[b].z
      })
      edgeGeo.attributes.position.needsUpdate = true

      // Edge opacity breathing
      edgeMat.opacity = 0.15 + Math.sin(t * 0.4) * 0.05

      // Multiple simultaneous pulses
      pulseStates.forEach((pulse, pi) => {
        if (t > pulse.nextTime && edges.length > 0) {
          pulse.edgeIdx = Math.floor(Math.random() * edges.length)
          pulse.phase = 0
          pulse.nextTime = t + 0.2 + Math.random() * 0.5
          pulse.color = Math.random() > 0.4 ? AMBER : TEAL
        }

        const offset = pi * 6
        if (pulse.phase < 1 && edges.length > 0) {
          pulse.phase = Math.min(1, pulse.phase + 0.035)
          const [a, b] = edges[pulse.edgeIdx]
          pulsePosArr[offset]     = nodePos[a].x
          pulsePosArr[offset + 1] = nodePos[a].y
          pulsePosArr[offset + 2] = nodePos[a].z
          pulsePosArr[offset + 3] = nodePos[b].x
          pulsePosArr[offset + 4] = nodePos[b].y
          pulsePosArr[offset + 5] = nodePos[b].z

          const intensity = Math.sin(pulse.phase * Math.PI) * 0.9
          pulseColArr[offset]     = pulse.color.r * intensity
          pulseColArr[offset + 1] = pulse.color.g * intensity
          pulseColArr[offset + 2] = pulse.color.b * intensity
          pulseColArr[offset + 3] = pulse.color.r * intensity
          pulseColArr[offset + 4] = pulse.color.g * intensity
          pulseColArr[offset + 5] = pulse.color.b * intensity
        } else {
          for (let j = 0; j < 6; j++) pulseColArr[offset + j] = 0
        }
      })
      pulseGeo.attributes.position.needsUpdate = true
      pulseGeo.attributes.color.needsUpdate = true

      // Hub glow pulsation
      let childIdx = 0
      for (let i = 0; i < NODE_COUNT; i++) {
        if (nodeType[i] === "hub") {
          const sprite = nodeMeshGroup.children[childIdx] as THREE.Sprite
          if (sprite && sprite.material) {
            const pulse = 0.4 + Math.sin(t * 1.5 + i * 0.5) * 0.2
            ;(sprite.material as THREE.SpriteMaterial).opacity = pulse
            const scale = 0.45 + Math.sin(t * 2 + i * 0.3) * 0.08
            sprite.scale.set(scale, scale, scale)
          }
          childIdx++
        }
        childIdx++ // mesh
      }

      // Halo rotations
      halo.rotation.y = t * 0.015
      halo.rotation.x = Math.sin(t * 0.01) * 0.08
      halo2.rotation.y = -t * 0.012
      halo2.rotation.z = Math.sin(t * 0.008) * 0.05

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("scroll", handleScroll)
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("touchstart", handleTouchMove)
      el.removeEventListener("touchmove", handleTouchMove)
      el.removeEventListener("touchend", handlePointerEnd)
      el.removeEventListener("mouseleave", handlePointerEnd)
      ro.disconnect()
      renderer.dispose()
      edgeGeo.dispose()
      haloGeo.dispose()
      halo2Geo.dispose()
      pulseGeo.dispose()
      edgeMat.dispose()
      haloMat.dispose()
      halo2Mat.dispose()
      pulseMat.dispose()
      glowTexture.dispose()
      nodeMats.forEach(m => m.dispose())
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%", touchAction: "none" }}
    />
  )
}
