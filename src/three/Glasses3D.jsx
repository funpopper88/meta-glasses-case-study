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

// Smashed capture-light cover, painted as a texture: one dark piece of glass
// with a frosted crush point, jagged fracture lines, chips and scratches.
function seeded(seed) {
  return () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
}

// jagged crack: a random walk that drifts along a heading
function crack(g, rnd, x, y, ang, len, width, alpha, depth = 0) {
  g.beginPath(); g.moveTo(x, y)
  let travelled = 0
  while (travelled < len) {
    const step = 10 + rnd() * 16
    ang += (rnd() - 0.5) * 0.16 + (rnd() < 0.15 ? (rnd() - 0.5) * 0.9 : 0) // straight runs, sharp kinks
    x += Math.cos(ang) * step; y += Math.sin(ang) * step
    travelled += step
    g.lineTo(x, y)
    if (depth < 2 && rnd() < 0.12) {
      g.strokeStyle = `rgba(235,242,255,${alpha})`; g.lineWidth = width; g.stroke()
      crack(g, rnd, x, y, ang + (rnd() < 0.5 ? 1 : -1) * (0.5 + rnd() * 0.6), (len - travelled) * (0.4 + rnd() * 0.4), width * 0.6, alpha * 0.8, depth + 1)
      g.beginPath(); g.moveTo(x, y)
    }
  }
  g.strokeStyle = `rgba(235,242,255,${alpha})`; g.lineWidth = width; g.stroke()
}

function scratches(g, rnd, cx, cy, R, count, maxAlpha) {
  g.lineCap = 'round'
  for (let k = 0; k < count; k++) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * R
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r
    const dir = rnd() < 0.6 ? 0.5 + (rnd() - 0.5) * 0.5 : rnd() * Math.PI // mostly one swipe direction
    const len = 15 + rnd() * 70
    g.beginPath(); g.moveTo(x, y)
    g.quadraticCurveTo(x + Math.cos(dir) * len * 0.5 + (rnd() - 0.5) * 6, y + Math.sin(dir) * len * 0.5 + (rnd() - 0.5) * 6, x + Math.cos(dir) * len, y + Math.sin(dir) * len)
    g.strokeStyle = `rgba(225,232,245,${0.05 + rnd() * maxAlpha})`; g.lineWidth = 0.5 + rnd() * 0.9; g.stroke()
  }
}

function makeSmashTexture() {
  const S = 512, C = S / 2, R = S * 0.48
  const IX = C + 34, IY = C - 26 // impact point, off-center
  const rnd = seeded(23)
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const g = cv.getContext('2d')

  // one continuous piece of dark glass with a single soft reflection
  g.beginPath(); g.arc(C, C, R, 0, Math.PI * 2); g.fillStyle = '#090d14'; g.fill()
  const sheen = g.createLinearGradient(0, 0, S, S)
  sheen.addColorStop(0.15, 'rgba(120,140,170,0)')
  sheen.addColorStop(0.32, 'rgba(120,140,170,0.22)')
  sheen.addColorStop(0.45, 'rgba(120,140,170,0)')
  g.fillStyle = sheen; g.fillRect(0, 0, S, S)

  // fine scratches all over the surface
  scratches(g, rnd, C, C, R, 90, 0.22)

  // frosted crush where it was hit: powdered glass
  const crushR = R * 0.36
  for (let k = 0; k < 4500; k++) {
    const a = rnd() * Math.PI * 2, r = crushR * Math.pow(rnd(), 0.7) * (0.75 + 0.35 * Math.sin(a * 5 + 1))
    g.fillStyle = `rgba(230,236,248,${0.12 + rnd() * 0.5})`
    g.fillRect(IX + Math.cos(a) * r, IY + Math.sin(a) * r, 1 + rnd() * 2, 1 + rnd() * 2)
  }
  // missing chunk at the center of the impact, with a broken bright lip
  g.beginPath()
  for (let k = 0; k < 11; k++) {
    const a = (k / 11) * Math.PI * 2, r = crushR * (0.22 + rnd() * 0.22)
    const x = IX + Math.cos(a) * r, y = IY + Math.sin(a) * r
    k ? g.lineTo(x, y) : g.moveTo(x, y)
  }
  g.closePath(); g.fillStyle = '#000'; g.fill()
  g.strokeStyle = 'rgba(240,245,255,0.75)'; g.lineWidth = 1.5; g.stroke()

  // main fracture lines running out from the impact, uneven in length
  for (let k = 0; k < 9; k++) {
    const a = (k / 9) * Math.PI * 2 + (rnd() - 0.5) * 0.6
    crack(g, rnd, IX + Math.cos(a) * crushR * 0.5, IY + Math.sin(a) * crushR * 0.5, a, R * (0.6 + rnd() * 0.9), 1.3 + rnd() * 1, 0.7 + rnd() * 0.3)
  }
  // a few broken stress fractures crossing them, not full rings
  for (let k = 0; k < 4; k++) {
    const a = rnd() * Math.PI * 2, r = R * (0.45 + rnd() * 0.35)
    crack(g, rnd, IX + Math.cos(a) * r, IY + Math.sin(a) * r, a + Math.PI / 2, R * (0.2 + rnd() * 0.25), 1.1, 0.45)
  }

  // chips knocked out of the edge
  for (let k = 0; k < 3; k++) {
    const a = rnd() * Math.PI * 2
    g.beginPath()
    g.moveTo(C + Math.cos(a - 0.12) * R * 1.02, C + Math.sin(a - 0.12) * R * 1.02)
    g.lineTo(C + Math.cos(a) * R * (0.8 - rnd() * 0.08), C + Math.sin(a) * R * (0.8 - rnd() * 0.08))
    g.lineTo(C + Math.cos(a + 0.1) * R * 1.02, C + Math.sin(a + 0.1) * R * 1.02)
    g.closePath(); g.fillStyle = '#000'; g.fill()
    g.strokeStyle = 'rgba(230,238,250,0.6)'; g.lineWidth = 1; g.stroke()
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

// scuffs on the frame around the broken light
function makeScuffTexture() {
  const S = 512, C = S / 2
  const rnd = seeded(5)
  const cv = document.createElement('canvas')
  cv.width = cv.height = S
  const g = cv.getContext('2d')
  scratches(g, rnd, C, C, S * 0.42, 70, 0.3)
  // fade out toward the edge so it blends into the frame
  g.globalCompositeOperation = 'destination-in'
  const fade = g.createRadialGradient(C, C, S * 0.12, C, C, S * 0.5)
  fade.addColorStop(0, '#000'); fade.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = fade; g.fillRect(0, 0, S, S)
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function SmashedCover() {
  const tex = useMemo(makeSmashTexture, [])
  const scuff = useMemo(makeScuffTexture, [])
  return (
    <group position={[0, 0, 0.009]}>
      {/* scuffed frame around the light */}
      <mesh position={[0, 0, -0.004]}>
        <circleGeometry args={[0.16, 48]} />
        <meshBasicMaterial map={scuff} transparent depthWrite={false} />
      </mesh>
      {/* metal bezel the glass sat in */}
      <mesh>
        <torusGeometry args={[0.078, 0.007, 12, 48]} />
        <meshStandardMaterial color="#8d939d" metalness={1} roughness={0.45} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.078, 48]} />
        <meshPhysicalMaterial map={tex} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.3} transparent roughness={0.12} metalness={0.1} clearcoat={1} clearcoatRoughness={0.05} envMapIntensity={1.2} />
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
