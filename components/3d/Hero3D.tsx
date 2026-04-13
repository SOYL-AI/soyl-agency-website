"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

const NODE_COUNT    = 240
const SPHERE_R      = 3.0
const LINK_DIST     = 0.65
const AMBER         = new THREE.Color("#F5A623")
const TEAL          = new THREE.Color("#AFD0CC")
const DIM_WHITE     = new THREE.Color("#8899AA")

function randomLogoPoint(index: number, total: number) {
  // We distribute points exactly along 3 overlapping parametric ribbons
  const numRibbons = 3
  const ribbonId = index % numRibbons
  
  // Progress along the circle
  const t = (index / total) * Math.PI * 2 * numRibbons
  
  // Logo has 5 lobes
  const waves = 5
  const baseR = 2.1
  
  // Phase shift each ribbon so they overlap like the actual logo
  const phase = ribbonId * 0.6
  // Shift their base radius slightly to give thickness to the ring
  const thickness = (ribbonId - 1) * 0.25 
  
  // Shape the wide lobes and sharp inner dips using a blended wave
  const waveShape = Math.sin(t * waves + phase)
  const currentR = baseR + (waveShape * 0.75) + thickness
  
  // Add a tiny bit of random dust scatter
  const scatter = 0.06
  const x = currentR * Math.cos(t) + (Math.random() - 0.5) * scatter
  const y = currentR * Math.sin(t) + (Math.random() - 0.5) * scatter
  
  // Let the ribbons weave in 3D depth over and under each other
  const z = Math.cos(t * waves + phase) * 0.6 + (ribbonId - 1) * 0.3
  
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
    renderer.toneMappingExposure = 1.1

    const scene  = new THREE.Scene()
    scene.fog    = new THREE.FogExp2(0x080808, 0.055)
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100)
    camera.position.set(0, 0, 7.5)

    // ── Nodes ─────────────────────────────────────────────────────────
    const nodePos: THREE.Vector3[]  = []
    const nodeVel: THREE.Vector3[]  = []
    const nodeBase: THREE.Vector3[] = []
    const nodeMat: THREE.MeshBasicMaterial[] = []

    for (let i = 0; i < NODE_COUNT; i++) {
      const p = randomLogoPoint(i, NODE_COUNT)
      nodePos.push(p.clone())
      nodeBase.push(p.clone())
      nodeVel.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.001,
        (Math.random() - 0.5) * 0.001,
        (Math.random() - 0.5) * 0.001,
      ))
    }

    const nodeGeo  = new THREE.SphereGeometry(0.032, 7, 7)
    const nodeMeshGroup = new THREE.Group()
    scene.add(nodeMeshGroup)

    nodePos.forEach((pos, i) => {
      const color =
        i % 5 === 0 ? AMBER.clone() :
        i % 9 === 0 ? TEAL.clone()  :
        DIM_WHITE.clone()
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55 + Math.random() * 0.45 })
      nodeMat.push(mat)
      const mesh = new THREE.Mesh(nodeGeo, mat)
      mesh.position.copy(pos)
      nodeMeshGroup.add(mesh)
    })

    // ── Edges ─────────────────────────────────────────────────────────
    type Edge = [number, number]
    const edges: Edge[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodePos[i].distanceTo(nodePos[j]) < LINK_DIST) {
          edges.push([i, j])
        }
      }
    }

    const edgePosArr  = new Float32Array(edges.length * 6)
    const edgeColArr  = new Float32Array(edges.length * 6)

    edges.forEach(([a, b], k) => {
      // positions
      edgePosArr[k*6]   = nodePos[a].x; edgePosArr[k*6+1] = nodePos[a].y; edgePosArr[k*6+2] = nodePos[a].z
      edgePosArr[k*6+3] = nodePos[b].x; edgePosArr[k*6+4] = nodePos[b].y; edgePosArr[k*6+5] = nodePos[b].z
      // colors — interpolate between amber and teal per edge
      const t = Math.random()
      const ca = AMBER.clone().lerp(TEAL, t)
      const cb = TEAL.clone().lerp(AMBER, t)
      edgeColArr[k*6]   = ca.r; edgeColArr[k*6+1] = ca.g; edgeColArr[k*6+2] = ca.b
      edgeColArr[k*6+3] = cb.r; edgeColArr[k*6+4] = cb.g; edgeColArr[k*6+5] = cb.b
    })

    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePosArr, 3))
    edgeGeo.setAttribute("color",    new THREE.BufferAttribute(edgeColArr, 3))
    const edgeMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat)
    scene.add(edgeLines)

    // ── Pulse highlights ───────────────────────────────────────────────
    // A second LineSegments layer for lit-up edges
    const pulseGeo  = new THREE.BufferGeometry()
    const pulsePosArr = new Float32Array(6) // single edge at a time
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePosArr, 3))
    const pulseMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#F5A623"),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1,
    })
    const pulseLine = new THREE.LineSegments(pulseGeo, pulseMat)
    scene.add(pulseLine)

    // ── Ambient halo particles ─────────────────────────────────────────
    const haloCount = 700
    const haloPos   = new Float32Array(haloCount * 3)
    for (let i = 0; i < haloCount; i++) {
      const p = randomSpherePoint(SPHERE_R * 1.05, SPHERE_R * 1.7, 0.6)
      haloPos[i*3] = p.x; haloPos[i*3+1] = p.y; haloPos[i*3+2] = p.z
    }
    const haloGeo = new THREE.BufferGeometry()
    haloGeo.setAttribute("position", new THREE.BufferAttribute(haloPos, 3))
    const haloMat = new THREE.PointsMaterial({
      color: AMBER,
      size: 0.01,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const halo = new THREE.Points(haloGeo, haloMat)
    scene.add(halo)

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

    // ── Pulse state ───────────────────────────────────────────────────
    let pulseEdgeIdx   = 0
    let pulsePhase     = 0
    let nextPulseTime  = 0

    // ── Animation ─────────────────────────────────────────────────────
    let animId = 0
    const clock = new THREE.Clock()

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Camera orbit — slow, gentle
      const orbitR = 7.5
      camera.position.x = Math.sin(t * 0.07) * orbitR
      camera.position.z = Math.cos(t * 0.07) * orbitR
      camera.position.y = Math.sin(t * 0.04) * 1.2
      camera.lookAt(0, 0, 0)

      // Drift nodes
      nodePos.forEach((pos, i) => {
        pos.add(nodeVel[i])
        // Pull back towards anchor point tightly to preserve the intricate ribbons
        const dist = pos.distanceTo(nodeBase[i])
        if (dist > 0.15) {
          nodeVel[i].sub(pos.clone().sub(nodeBase[i]).multiplyScalar(0.015))
        }
        nodeMeshGroup.children[i].position.copy(pos)
      })

      // Rebuild edge positions
      edges.forEach(([a, b], k) => {
        edgePosArr[k*6]   = nodePos[a].x; edgePosArr[k*6+1] = nodePos[a].y; edgePosArr[k*6+2] = nodePos[a].z
        edgePosArr[k*6+3] = nodePos[b].x; edgePosArr[k*6+4] = nodePos[b].y; edgePosArr[k*6+5] = nodePos[b].z
      })
      edgeGeo.attributes.position.needsUpdate = true

      // Edge base opacity — breathes slightly
      edgeMat.opacity = 0.11 + Math.sin(t * 0.4) * 0.03

      // Pulse — one edge lights up and fades
      if (t > nextPulseTime && edges.length > 0) {
        pulseEdgeIdx   = Math.floor(Math.random() * edges.length)
        pulsePhase     = 0
        nextPulseTime  = t + 0.35 + Math.random() * 0.4
      }
      if (pulsePhase < 1 && edges.length > 0) {
        pulsePhase  = Math.min(1, pulsePhase + 0.04)
        const [a, b] = edges[pulseEdgeIdx]
        pulsePosArr[0] = nodePos[a].x; pulsePosArr[1] = nodePos[a].y; pulsePosArr[2] = nodePos[a].z
        pulsePosArr[3] = nodePos[b].x; pulsePosArr[4] = nodePos[b].y; pulsePosArr[5] = nodePos[b].z
        pulseGeo.attributes.position.needsUpdate = true
        pulseMat.opacity = Math.sin(pulsePhase * Math.PI) * 0.75
      } else {
        pulseMat.opacity = 0
      }

      // Halo slow rotation
      halo.rotation.y = t * 0.018
      halo.rotation.x = Math.sin(t * 0.012) * 0.1

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      renderer.dispose()
      nodeGeo.dispose()
      edgeGeo.dispose()
      haloGeo.dispose()
      pulseGeo.dispose()
      nodeMat.forEach(m => m.dispose())
      edgeMat.dispose()
      haloMat.dispose()
      pulseMat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}
