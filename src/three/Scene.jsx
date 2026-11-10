import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'
import Glasses3D from './Glasses3D'

// Studio lighting built from light panels (no HDR download needed)
function Studio() {
  return (
    <Environment resolution={512}>
      <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 1.2, 1]} />
      <Lightformer form="rect" intensity={1.2} position={[0, -3, 2]} scale={[8, 0.6, 1]} />
      <Lightformer form="rect" color="#3b6cff" intensity={2.2} position={[-5, 0.5, -1]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} />
      <Lightformer form="rect" color="#1e3a8a" intensity={2.2} position={[5, 0.5, -1]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
      <Lightformer form="circle" intensity={2} position={[2, 2, 4]} scale={0.8} />
      {/* panels behind the camera: what the lenses and frame reflect */}
      <Lightformer form="rect" intensity={2.2} position={[-1.5, 1.6, 7]} rotation={[0, Math.PI, -0.5]} scale={[6, 0.7, 1]} />
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
// glasses turn slowly. `progress` is a motion value (0..1) or undefined (static).
function Rig({ progress, glasses, led }) {
  const { camera, size } = useThree()
  const v = useMemo(
    () => ({ start: new THREE.Vector3(), end: new THREE.Vector3(), ledPos: new THREE.Vector3(), look: new THREE.Vector3(), base: new THREE.Vector3() }),
    [],
  )

  useFrame(({ clock }) => {
    if (!glasses.current || !led.current) return
    const t = ease(clamp01((progress ? progress.get() : 0) / 0.75))
    const idle = clock.elapsedTime

    glasses.current.rotation.y = -0.28 + t * 0.55 + Math.sin(idle * 0.45) * 0.03
    glasses.current.rotation.x = 0.04 + Math.sin(idle * 0.35) * 0.015
    glasses.current.position.y = GLASSES_Y + Math.sin(idle * 0.8) * 0.015 * (1 - t)

    // Pull the camera back on narrow screens so the frame always fits
    const aspect = size.width / size.height
    const baseZ = Math.max(4.9, 3.4 / (2 * Math.tan(HALF_FOV) * aspect))
    v.start.set(0, 0, baseZ)
    v.base.set(0, 0, 0)

    led.current.getWorldPosition(v.ledPos)
    v.end.copy(v.ledPos).add({ x: 0, y: 0, z: 0.16 })

    camera.position.lerpVectors(v.start, v.end, t)
    v.look.lerpVectors(v.base, v.ledPos, t)
    camera.lookAt(v.look)
  })
  return null
}

export default function GlassesCanvas({ progress, className = '' }) {
  const glasses = useRef()
  const led = useRef()
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4.4], fov: 32 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <Studio />
        <ambientLight intensity={0.15} />
        <directionalLight position={[2, 4, 5]} intensity={0.6} />
        <Glasses3D groupRef={glasses} ledRef={led} position={[0, GLASSES_Y, 0]} />
        <Rig progress={progress} glasses={glasses} led={led} />
        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={1.4} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
