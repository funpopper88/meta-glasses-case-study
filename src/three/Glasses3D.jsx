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
        <mesh ref={led} scale={[1, 1, 0.5]} position={[0, 0, 0.006]}>
          <sphereGeometry args={[0.018, 24, 24]} />
          <meshPhysicalMaterial color="#14161b" emissive="#f4f7ff" emissiveIntensity={0} roughness={0.1} clearcoat={1} toneMapped={false} />
        </mesh>
        <sprite ref={glow} scale={[0.2, 0.2, 1]} position={[0, 0, 0.01]}>
          <spriteMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </sprite>
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
