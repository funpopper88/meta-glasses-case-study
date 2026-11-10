import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Procedural smart glasses in the style of the Meta Starfire Kylie Edition:
// slim oval classic-black frame, black lenses, small gem on each lens.
// Camera module on the viewer's left, blinking capture LED on the viewer's right.
// Units: 1 = 50 mm (48 mm lens, 21 mm bridge).

const RX = 0.48 // lens half-width
const RY = 0.33 // lens half-height
const RIM = 0.055
const EYE_X = RX + 0.21
const END_Y = 0.1
const OUTER_X = EYE_X + (RX + RIM) * Math.sqrt(1 - (END_Y / (RY + RIM)) ** 2)

function oval(rx, ry) {
  const s = new THREE.Shape()
  s.absellipse(0, 0, rx, ry, 0, Math.PI * 2, false, 0)
  return s
}

function useGeometries() {
  return useMemo(() => {
    const ring = oval(RX + RIM, RY + RIM)
    ring.holes.push(oval(RX, RY))
    const rim = new THREE.ExtrudeGeometry(ring, {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.022,
      bevelSize: 0.018,
      bevelSegments: 6,
      curveSegments: 72,
    })
    rim.translate(0, 0, -0.025)

    const lens = new THREE.ExtrudeGeometry(oval(RX + 0.01, RY + 0.01), { depth: 0.01, bevelEnabled: false, curveSegments: 72 })

    const b = new THREE.Shape()
    b.moveTo(-0.24, 0.025)
    b.quadraticCurveTo(0, 0.12, 0.24, 0.025)
    b.lineTo(0.24, -0.025)
    b.quadraticCurveTo(0, 0.07, -0.24, -0.025)
    b.closePath()
    const bridge = new THREE.ExtrudeGeometry(b, {
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.012,
      bevelSegments: 5,
      curveSegments: 24,
    })
    bridge.translate(0, 0.1, -0.02)
    return { rim, lens, bridge }
  }, [])
}

const acetate = (
  <meshPhysicalMaterial color="#0c0c0f" roughness={0.16} metalness={0.1} clearcoat={1} clearcoatRoughness={0.03} envMapIntensity={1.8} />
)

export default function Glasses3D({ recording = true, ledRef, groupRef, ...props }) {
  const { rim, lens, bridge } = useGeometries()
  const led = useRef()
  const ledLight = useRef()

  useFrame(({ clock }) => {
    if (!led.current) return
    const on = recording ? (Math.sin(clock.elapsedTime * 4.5) + 1) / 2 : 0
    led.current.material.emissiveIntensity = 0.2 + on * 9
    if (ledLight.current) ledLight.current.intensity = on * 1.4
  })

  return (
    <group ref={groupRef} {...props}>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * EYE_X, 0, 0]}>
          <mesh geometry={rim}>{acetate}</mesh>
          <mesh geometry={lens} position={[0, 0, -0.005]}>
            <meshPhysicalMaterial
              color="#060608"
              roughness={0}
              metalness={0.35}
              clearcoat={1}
              clearcoatRoughness={0}
              transparent
              opacity={0.93}
              envMapIntensity={2.6}
            />
          </mesh>
          {/* gem accent, lower outer corner of each lens */}
          <mesh position={[side * 0.3, -0.2, 0.02]} rotation={[0, 0, Math.PI / 4]}>
            <octahedronGeometry args={[0.022, 0]} />
            <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.05} clearcoat={1} envMapIntensity={4} />
          </mesh>
        </group>
      ))}
      <mesh geometry={bridge}>{acetate}</mesh>

      {/* end pieces + slim temples */}
      {[-1, 1].map((side) => (
        <group key={`t${side}`} position={[side * (OUTER_X + 0.02), END_Y, -0.01]}>
          <mesh>
            <boxGeometry args={[0.09, 0.11, 0.1]} />
            {acetate}
          </mesh>
          <mesh position={[side * 0.015, 0, -0.82]}>
            <boxGeometry args={[0.04, 0.075, 1.6]} />
            {acetate}
          </mesh>
        </group>
      ))}

      {/* camera module, viewer's left */}
      <group position={[-(OUTER_X + 0.02), END_Y, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.032, 0.032, 0.012, 40]} />
          <meshStandardMaterial color="#3a3d44" metalness={1} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.007, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.003, 40]} />
          <meshPhysicalMaterial color="#0a1a3a" metalness={0.6} roughness={0} clearcoat={1} />
        </mesh>
      </group>

      {/* capture LED, viewer's right */}
      <group position={[OUTER_X + 0.02, END_Y, 0.05]} ref={ledRef}>
        <mesh ref={led}>
          <sphereGeometry args={[0.016, 24, 24]} />
          <meshStandardMaterial color="#ff2a2a" emissive="#ff1a1a" emissiveIntensity={6} toneMapped={false} />
        </mesh>
        <pointLight ref={ledLight} color="#ff2a2a" distance={0.5} decay={2} />
      </group>
    </group>
  )
}
