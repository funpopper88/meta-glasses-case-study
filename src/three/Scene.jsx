import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import Glasses3D from './Glasses3D'

// Studio lighting built from light panels (no HDR download needed)
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={4} position={[0, 4, 3]} scale={[8, 1.2, 1]} />
      <Lightformer form="rect" intensity={1.5} position={[-4, 1, 3]} rotation-y={Math.PI / 3} scale={[3, 1.5, 1]} />
      <Lightformer form="rect" intensity={1.2} position={[0, -3, 2]} scale={[8, 0.6, 1]} />
      <Lightformer form="rect" color="#a9c1ff" intensity={0.6} position={[-5, 0.5, -1]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} />
      <Lightformer form="rect" color="#1e3a8a" intensity={0.8} position={[5, 0.5, -1]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
      <Lightformer form="circle" intensity={2} position={[2, 2, 4]} scale={0.8} />
      {/* panels behind the camera: what the lenses and frame reflect */}
      <Lightformer form="rect" intensity={3} position={[-1.5, 1.6, 7]} rotation={[0, Math.PI, -0.5]} scale={[6, 0.7, 1]} />
      <Lightformer form="rect" intensity={1.2} position={[2, -0.8, 7]} rotation={[0, Math.PI, -0.5]} scale={[5, 0.3, 1]} />
      <Lightformer form="rect" color="#1e3a8a" intensity={0.35} position={[0, 0, 8]} rotation={[0, Math.PI, 0]} scale={[14, 6, 1]} />
    </Environment>
  )
}

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const HALF_FOV = (32 / 2) * (Math.PI / 180)
const GLASSES_Y = 0.32 // sit above center so the title fits below

// Scroll-driven camera: flies from a front view to the capture LED while the
// glasses turn slowly. `progress` is a (spring-smoothed) motion value 0..1, or
// undefined for a static pose.
function Rig({ progress, glasses, led, pose }) {
  const { camera, size } = useThree()
  const v = useMemo(
    () => ({ start: new THREE.Vector3(), end: new THREE.Vector3(), ledPos: new THREE.Vector3(), look: new THREE.Vector3(), base: new THREE.Vector3() }),
    [],
  )

  useFrame(({ clock }) => {
    if (!glasses.current || !led.current) return
    const t = ease(clamp01((progress ? progress.get() : 0) / 0.75))
    const idle = clock.elapsedTime

    glasses.current.rotation.y = pose.rotY - t * 0.45 + Math.sin(idle * 0.45) * 0.03
    glasses.current.rotation.x = pose.rotX + t * 0.06 + Math.sin(idle * 0.35) * 0.015
    glasses.current.position.y = pose.y + Math.sin(idle * 0.8) * 0.015 * (1 - t)

    // Pull the camera back on narrow screens so the frame always fits
    const aspect = size.width / size.height
    const baseZ = Math.max(pose.minZ ?? 5.2, (pose.fit ?? 3.7) / (2 * Math.tan(HALF_FOV) * aspect))
    v.start.set(0, 0, baseZ)
    v.base.set(0, 0, 0)

    led.current.getWorldPosition(v.ledPos)
    v.end.copy(v.ledPos).add({ x: 0.03, y: 0, z: 0.16 })

    camera.position.lerpVectors(v.start, v.end, t)
    v.look.lerpVectors(v.base, v.ledPos, t)
    camera.lookAt(v.look)
  })
  return null
}

const HERO_POSE = { rotY: -0.08, rotX: 0.04, y: GLASSES_Y }

// progress: scroll motion value (hero) or undefined (static).
// state: 'recording' | 'idle' | 'covered'. pose: starting angle and height.
export default function GlassesCanvas({ progress, state = 'recording', pose = HERO_POSE, className = '' }) {
  const glasses = useRef()
  const led = useRef()
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4.4], fov: 32 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <Studio />
        <ambientLight intensity={0.15} />
        <directionalLight position={[2, 4, 5]} intensity={0.6} />
        <Glasses3D state={state} groupRef={glasses} ledRef={led} position={[0, pose.y, 0]} />
        <Rig progress={progress} glasses={glasses} led={led} pose={pose} />
      </Canvas>
    </div>
  )
}
