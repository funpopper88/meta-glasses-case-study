import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { LITE } from './quality'

// Procedural Meta Starfire Kylie Edition-style smart glasses, traced from the
// product's front view: cat-eye front with upswept outer wings, a dip in the top
// edge at the bridge, a narrow keyhole nose cut-out, large almond lenses with a
// thin silver ring, round camera/LED dots on the wings, thick glossy acetate,
// thick temples with down-turned ear hooks. White capture LED on the viewer's
// right: steady while recording, off otherwise.

const WRAP = 0.1 // front wrap: z -= WRAP * x^2
const DEPTH = 0.14
const BEVEL_T = 0.045
const FRONT_Z = DEPTH / 2 + BEVEL_T
const VSCALE = 0.88 // flatten to match the product's proportions
const END = { x: 1.37, y: 0.13 * VSCALE }
const LENS_C = [0.71, -0.05]

export const zAt = (x, z = FRONT_Z) => z - WRAP * x * x
export const tiltAt = (x) => Math.atan(2 * WRAP * x)

// Right half of the front outline, from the top-center dip clockwise to the
// top of the nose cut-out. Each entry: [control1, control2, end].
const FRONT_START = [0, 0.25]
const FRONT_R = [
  [[0.15, 0.25], [0.3, 0.33], [0.6, 0.36]],
  [[0.9, 0.39], [1.2, 0.43], [1.38, 0.42]],
  [[1.47, 0.41], [1.51, 0.34], [1.5, 0.24]],
  [[1.48, 0.05], [1.39, -0.2], [1.2, -0.34]],
  [[1.02, -0.47], [0.82, -0.48], [0.66, -0.48]],
  [[0.45, -0.48], [0.3, -0.44], [0.22, -0.36]],
  [[0.17, -0.3], [0.15, -0.12], [0.11, -0.05]],
  [[0.08, 0.0], [0.04, 0.03], [0, 0.03]],
]

// Right lens: flatter top, rounder bottom, cat-eye outer corner
const LENS_START = [0.21, 0.0]
const LENS_R = [
  [[0.22, 0.2], [0.36, 0.3], [0.62, 0.31]],
  [[0.9, 0.32], [1.12, 0.33], [1.2, 0.25]],
  [[1.27, 0.17], [1.26, 0.02], [1.2, -0.1]],
  [[1.1, -0.32], [0.9, -0.41], [0.68, -0.41]],
  [[0.45, -0.41], [0.27, -0.33], [0.22, -0.18]],
  [[0.2, -0.12], [0.2, -0.05], [0.21, 0.0]],
]

function frontShape() {
  const s = new THREE.Shape()
  s.moveTo(...FRONT_START)
  FRONT_R.forEach(([c1, c2, e]) => s.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], e[0], e[1]))
  // left half: walk the right half backwards, mirrored
  for (let i = FRONT_R.length - 1; i >= 0; i--) {
    const [c1, c2] = FRONT_R[i]
    const start = i === 0 ? FRONT_START : FRONT_R[i - 1][2]
    s.bezierCurveTo(-c2[0], c2[1], -c1[0], c1[1], -start[0], start[1])
  }
  return s
}

// Lens outline for a side (+1 right, -1 left), scaled about the lens center
function lensPath(side, scale = 1, PathType = THREE.Path) {
  const t = ([x, y]) => [side * (LENS_C[0] + (x - LENS_C[0]) * scale), LENS_C[1] + (y - LENS_C[1]) * scale]
  const p = new PathType()
  p.moveTo(...t(LENS_START))
  LENS_R.forEach(([c1, c2, e]) => p.bezierCurveTo(...t(c1), ...t(c2), ...t(e)))
  return p
}

// Bend geometry around the vertical axis and rotate normals to match,
// so the wrap stays smooth instead of faceted.
function wrap(geo) {
  const pos = geo.attributes.position
  const nor = geo.attributes.normal
  const n = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    pos.setZ(i, pos.getZ(i) - WRAP * x * x)
    const a = tiltAt(x)
    n.fromBufferAttribute(nor, i)
    const nx = n.x * Math.cos(a) + n.z * Math.sin(a)
    const nz = -n.x * Math.sin(a) + n.z * Math.cos(a)
    nor.setXYZ(i, nx, n.y, nz)
  }
  pos.needsUpdate = true
  nor.needsUpdate = true
  return geo
}

function templeShape() {
  const t = new THREE.Shape()
  t.moveTo(0, 0.13)
  t.bezierCurveTo(0.6, 0.12, 1.2, 0.1, 1.55, 0.08)
  t.bezierCurveTo(1.68, 0.07, 1.76, 0.0, 1.79, -0.13)
  t.lineTo(1.72, -0.17)
  t.bezierCurveTo(1.68, -0.07, 1.62, -0.03, 1.52, -0.03)
  t.bezierCurveTo(1.2, -0.03, 0.6, -0.06, 0, -0.12)
  t.closePath()
  return t
}

function useGeometries() {
  return useMemo(() => {
    const shape = frontShape()
    // hole is a little larger than the lens; the bevel pulls it back in
    shape.holes.push(lensPath(1, 1.07), lensPath(-1, 1.07))
    const front = new THREE.ExtrudeGeometry(shape, {
      depth: DEPTH,
      bevelEnabled: true,
      bevelThickness: BEVEL_T,
      bevelSize: 0.035,
      bevelSegments: LITE ? 4 : 10,
      curveSegments: LITE ? 36 : 80,
    })
    front.translate(0, 0, -DEPTH / 2)
    front.scale(1, VSCALE, 1)
    wrap(front)

    const lenses = [1, -1].map((side) => {
      const g = new THREE.ExtrudeGeometry(lensPath(side, 1.07, THREE.Shape), { depth: 0.022, bevelEnabled: false, curveSegments: LITE ? 36 : 80 })
      g.translate(0, 0, -0.011)
      g.scale(1, VSCALE, 1)
      return wrap(g)
    })

    // thin silver ring just inside each lens edge
    const rings = [1, -1].map((side) => {
      const r = lensPath(side, 1.01, THREE.Shape)
      r.holes.push(lensPath(side, 0.975))
      const g = new THREE.ShapeGeometry(r, LITE ? 36 : 80)
      g.translate(0, 0, 0.014)
      g.scale(1, VSCALE, 1)
      return wrap(g)
    })

    const temple = new THREE.ExtrudeGeometry(templeShape(), {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.022,
      bevelSegments: LITE ? 3 : 6,
      curveSegments: LITE ? 20 : 40,
    })
    temple.translate(0, 0, -0.03)
    temple.rotateY(Math.PI / 2) // length runs back along -z, thickness along x
    return { front, lenses, rings, temple }
  }, [])
}

const acetate = (
  <meshPhysicalMaterial color="#09090b" roughness={0.12} metalness={0.05} clearcoat={1} clearcoatRoughness={0.02} envMapIntensity={2} />
)

// Small disc that sits flush on the wrapped front surface at x, y
function OnFront({ x, y, lift = 0.004, children, groupRef }) {
  return (
    <group ref={groupRef} position={[x, y, zAt(x) + lift]} rotation={[0, tiltAt(x), 0]}>
      {children}
    </group>
  )
}

// Smashed capture-light cover, painted as a detailed texture: a punched-in
// hole, broken glass cells with their own reflections, cut-glass edges,
// hairline fractures and a few glints. Mapped onto a glossy disc.
function makeSmashTexture() {
  const S = 512, C = S / 2, R = S * 0.48
  const IX = C + 26, IY = C - 20 // impact point, off-center
  let seed = 11
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const g = cv.getContext('2d')
  const P = (a, r) => [IX + Math.cos(a) * r, IY + Math.sin(a) * r]

  // rays from the impact point, and the fracture rings they cross
  const n = 10
  const rays = []
  for (let i = 0; i < n; i++) rays.push((i / n) * Math.PI * 2 + (rnd() - 0.5) * 0.5)
  const hole = rays.map(() => R * (0.24 + rnd() * 0.16))
  const mid = rays.map(() => R * (0.52 + rnd() * 0.3))
  const jag = (p, q, amt) => {
    const m = [(p[0] + q[0]) / 2 + (rnd() - 0.5) * amt, (p[1] + q[1]) / 2 + (rnd() - 0.5) * amt]
    return [p, m, q]
  }

  // base: dark tinted glass
  g.beginPath(); g.arc(C, C, R, 0, Math.PI * 2)
  g.fillStyle = '#0b1018'; g.fill()

  const cells = []
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    const a0 = rays[i], a1 = rays[j] + (j === 0 ? Math.PI * 2 : 0)
    // inner ring cell (some are knocked out entirely)
    if (rnd() > 0.4) {
      cells.push({ pts: [...jag(P(a0, hole[i]), P(a0, mid[i]), 14), ...jag(P(a1, mid[j]), P(a1, hole[j]), 14).slice(1)], depth: 1 })
    }
    // outer cell, sometimes split by an extra short crack
    const am = (a0 + a1) / 2
    if (rnd() > 0.5) {
      const rm = (mid[i] + mid[j]) / 2
      cells.push({ pts: [P(a0, mid[i]), P(a0, R * 1.3), P(am, R * 1.3), P(am, rm)], depth: 0 })
      cells.push({ pts: [P(am, rm), P(am, R * 1.3), P(a1, R * 1.3), P(a1, mid[j])], depth: 0 })
    } else {
      cells.push({ pts: [...jag(P(a0, mid[i]), P(a0, R * 1.3), 10), P(am, R * 1.3), ...jag(P(a1, R * 1.3), P(a1, mid[j]), 10).slice(1)], depth: 0 })
    }
  }

  const poly = (pts) => { g.beginPath(); g.moveTo(...pts[0]); for (const p of pts.slice(1)) g.lineTo(...p); g.closePath() }

  for (const c of cells) {
    // each piece sits at its own angle, so it reflects a different brightness
    const lit = rnd() ** 1.6 * (c.depth ? 0.7 : 1)
    const ang = rnd() * Math.PI * 2
    const [x0, y0] = c.pts[0]
    const gr = g.createLinearGradient(x0, y0, x0 + Math.cos(ang) * 160, y0 + Math.sin(ang) * 160)
    const hi = Math.round(40 + lit * 190), lo = Math.round(14 + lit * 60)
    gr.addColorStop(0, `rgba(${hi - 12},${hi - 4},${hi + 14},0.95)`)
    gr.addColorStop(1, `rgba(${lo},${lo + 6},${lo + 18},0.95)`)
    poly(c.pts); g.fillStyle = gr; g.fill()
    // cut-glass edge: dark seam, then a thin bright bevel just inside it
    g.lineJoin = 'round'
    poly(c.pts); g.strokeStyle = 'rgba(0,0,0,0.85)'; g.lineWidth = 5; g.stroke()
    g.save(); g.translate(-1.2, -1.2)
    poly(c.pts); g.strokeStyle = `rgba(225,236,255,${0.35 + lit * 0.6})`; g.lineWidth = 1.6; g.stroke()
    g.restore()
  }

  // the punched-in hole, with a jagged lip
  const holePts = []
  rays.forEach((a, i) => { holePts.push(P(a, hole[i])); holePts.push(P(a + 0.24, hole[i] * (0.75 + rnd() * 0.2))) })
  poly(holePts); g.fillStyle = '#000'; g.fill()
  g.save(); g.translate(1.5, 1.5); poly(holePts); g.strokeStyle = 'rgba(200,215,240,0.55)'; g.lineWidth = 2; g.stroke(); g.restore()
  // broken LED chip down inside the hole
  g.save(); g.translate(IX + 4, IY + 6); g.rotate(0.5)
  g.fillStyle = '#20232a'; g.fillRect(-14, -14, 28, 28)
  g.fillStyle = '#3a3e47'; g.fillRect(-14, -14, 28, 4)
  g.restore()

  // hairline fractures running through the pieces
  g.lineCap = 'round'
  for (let k = 0; k < 26; k++) {
    let a = rnd() * Math.PI * 2, r = R * (0.3 + rnd() * 0.6)
    let [x, y] = P(a, r)
    g.beginPath(); g.moveTo(x, y)
    for (let s = 0; s < 3; s++) { a += (rnd() - 0.5) * 0.6; r += 10 + rnd() * 22; [x, y] = P(a, Math.min(r, R * 1.3)); g.lineTo(x, y) }
    g.strokeStyle = `rgba(220,232,255,${0.15 + rnd() * 0.3})`; g.lineWidth = 0.8; g.stroke()
  }

  // a few sharp glints where light catches a broken edge
  for (let k = 0; k < 6; k++) {
    const c = cells[Math.floor(rnd() * cells.length)].pts[0]
    const gl = g.createRadialGradient(c[0], c[1], 0, c[0], c[1], 16)
    gl.addColorStop(0, 'rgba(255,255,255,0.95)'); gl.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = gl; g.fillRect(c[0] - 16, c[1] - 16, 32, 32)
  }

  // keep everything inside the round cover
  g.globalCompositeOperation = 'destination-in'
  g.fillStyle = '#000'
  g.beginPath(); g.arc(C, C, R, 0, Math.PI * 2); g.fill()

  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

function SmashedCover() {
  const tex = useMemo(makeSmashTexture, [])
  return (
    <group position={[0, 0, 0.009]}>
      {/* metal bezel the glass sat in */}
      <mesh>
        <torusGeometry args={[0.078, 0.007, 12, 48]} />
        <meshStandardMaterial color="#9da3ad" metalness={1} roughness={0.25} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.078, 48]} />
        <meshPhysicalMaterial map={tex} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.55} transparent roughness={0.08} metalness={0.2} clearcoat={1} clearcoatRoughness={0} envMapIntensity={1.4} />
      </mesh>
    </group>
  )
}

export default function Glasses3D({ state = 'recording', ledRef, groupRef, ...props }) {
  const recording = state === 'recording'
  const { front, lenses, rings, temple } = useGeometries()
  const led = useRef()
  const ledLight = useRef()
  const glow = useRef()

  // Soft additive glow sprite: much cheaper than a full-screen bloom pass
  const glowTex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const g = c.getContext('2d')
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64)
    gr.addColorStop(0, 'rgba(255,255,255,1)')
    gr.addColorStop(0.2, 'rgba(225,235,255,0.6)')
    gr.addColorStop(1, 'rgba(200,215,255,0)')
    g.fillStyle = gr
    g.fillRect(0, 0, 128, 128)
    return new THREE.CanvasTexture(c)
  }, [])

  useFrame(({ clock }) => {
    if (!led.current) return
    // Like the real glasses: a steady white light while capturing, fully off otherwise
    const on = recording ? 0.94 + Math.sin(clock.elapsedTime * 2) * 0.06 : 0
    led.current.material.emissiveIntensity = on * 3.2
    if (ledLight.current) ledLight.current.intensity = on * 1.2
    if (glow.current) glow.current.material.opacity = on * 0.9
  })

  const templeX = 1.4
  const templeZ = zAt(templeX, -0.02)

  return (
    <group ref={groupRef} {...props}>
      <mesh geometry={front}>{acetate}</mesh>

      {lenses.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshPhysicalMaterial attach="material-0" color="#16171a" roughness={0} metalness={0.4} clearcoat={1} transparent opacity={0.94} envMapIntensity={2.6} />
          <meshStandardMaterial attach="material-1" color="#b8bcc4" metalness={1} roughness={0.2} />
        </mesh>
      ))}

      {rings.map((g, i) => (
        <mesh key={`ring${i}`} geometry={g}>
          <meshStandardMaterial color="#b9bcc2" metalness={0.6} roughness={0.35} envMapIntensity={0.8} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* small mark on the left lens, upper outer area */}
      {[-1].map((side) => (
        <OnFront key={`g${side}`} x={side * 1.0} y={0.18 * VSCALE} lift={-FRONT_Z + 0.02}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.016, 0.016, 0.004, 3]} />
            <meshStandardMaterial color="#d9dce2" metalness={1} roughness={0.1} />
          </mesh>
        </OnFront>
      ))}

      {/* thick temples with down-turned ear hooks */}
      {[-1, 1].map((side) => (
        <mesh key={`t${side}`} geometry={temple} position={[side * templeX, 0.11, templeZ]} rotation={[0, side * -0.06, 0]}>
          {acetate}
        </mesh>
      ))}

      {/* camera, viewer's left */}
      <OnFront x={-END.x} y={END.y}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 40]} />
          <meshStandardMaterial color="#2c2f36" metalness={1} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.006]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.003, 40]} />
          <meshPhysicalMaterial color="#0a1a3a" metalness={0.6} roughness={0} clearcoat={1} />
        </mesh>
      </OnFront>

      {/* capture LED, viewer's right */}
      <OnFront x={END.x} y={END.y} groupRef={ledRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.008, 40]} />
          <meshStandardMaterial color="#2c2f36" metalness={1} roughness={0.3} />
        </mesh>
        <mesh ref={led} visible={state !== 'damaged'} scale={[1, 1, 0.5]} position={[0, 0, 0.006]}>
          <sphereGeometry args={[0.018, 24, 24]} />
          <meshPhysicalMaterial color="#14161b" emissive="#f4f7ff" emissiveIntensity={0} roughness={0.1} clearcoat={1} toneMapped={false} />
        </mesh>
        <sprite ref={glow} scale={[0.2, 0.2, 1]} position={[0, 0, 0.01]}>
          <spriteMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </sprite>
        {/* damaged light: smashed-in glass cover over the LED */}
        {state === 'damaged' && <SmashedCover />}
        {state === 'covered' && (
          <mesh position={[0, 0, 0.02]} rotation={[0, 0, -0.25]}>
            <boxGeometry args={[0.13, 0.09, 0.025]} />
            <meshStandardMaterial color="#8b8f99" roughness={0.6} />
          </mesh>
        )}
        <pointLight ref={ledLight} color="#eef3ff" distance={0.5} decay={2} position={[0, 0, 0.05]} />
      </OnFront>
    </group>
  )
}
