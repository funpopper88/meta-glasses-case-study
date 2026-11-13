import { Component, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import Glasses3D from './Glasses3D'
import { LITE, webglAvailable } from './quality'

// Studio lighting built from light panels (no HDR download needed)
function Studio() {
  return (
    <Environment resolution={LITE ? 64 : 256} frames={1}>
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
    () => ({ start: new THREE.Vector3(), end: new THREE.Vector3(), ledPos: new THREE.Vector3(), dir: new THREE.Vector3(), look: new THREE.Vector3(), base: new THREE.Vector3() }),
    [],
  )

  useFrame(({ clock }) => {
    if (!glasses.current || !led.current) return
    const t = ease(clamp01((progress ? progress.get() : 0) / 0.75))
    const idle = clock.elapsedTime

    // Tall phone screens get a three-quarter pose so the glasses can sit larger
    const aspect = size.width / size.height
    const p = aspect < 0.85 && pose.portrait ? { ...pose, ...pose.portrait } : pose

    glasses.current.rotation.y = p.rotY + t * (p.turn ?? -0.3) + Math.sin(idle * 0.45) * 0.03
    glasses.current.rotation.x = p.rotX + t * 0.06 + Math.sin(idle * 0.35) * 0.015
    glasses.current.position.y = p.y + Math.sin(idle * 0.8) * 0.015 * (1 - t)

    // Pull the camera back on narrow screens so the frame always fits
    const baseZ = Math.max(p.minZ ?? 5.2, (p.fit ?? 3.7) / (2 * Math.tan(HALF_FOV) * aspect))
    v.start.set(0, 0, baseZ)
    v.base.set(0, 0, 0)

    // End in front of the LED, along the direction it faces, far enough back
    // that it reads as a glowing light rather than filling the screen
    led.current.getWorldPosition(v.ledPos)
    led.current.getWorldDirection(v.dir)
    v.end.copy(v.ledPos).addScaledVector(v.dir, 0.55)

    camera.position.lerpVectors(v.start, v.end, t)
    v.look.lerpVectors(v.base, v.ledPos, t)
    camera.lookAt(v.look)
  })
  return null
}

const HERO_POSE = {
  rotY: -0.08,
  rotX: 0.04,
  y: GLASSES_Y,
  portrait: { rotY: 0.3, rotX: 0.14, y: 0.2, fit: 3.3, minZ: 4, turn: -0.7 },
}

// If 3D fails (no WebGL, out of GPU memory), drop it quietly so the rest of
// the page still loads.
class Safe3D extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err) {
    console.warn('3D glasses disabled:', err)
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

// Only keep a WebGL context alive while the canvas is on or near the screen,
// so phones never hold two 3D scenes in memory at once.
function useNearScreen(ref, margin = '300px') {
  const [near, setNear] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin])
  return near
}

const CAN_3D = typeof window !== 'undefined' && webglAvailable()

// progress: scroll motion value (hero) or undefined (static).
// state: 'recording' | 'idle' | 'covered'. pose: starting angle and height.
export default function GlassesCanvas({ progress, state = 'recording', pose = HERO_POSE, className = '' }) {
  const glasses = useRef()
  const led = useRef()
  const box = useRef()
  const near = useNearScreen(box)
  return (
    <div ref={box} className={className}>
      {CAN_3D && near && (
        <Safe3D>
          <Canvas
            camera={{ position: [0, 0, 4.4], fov: 32 }}
            dpr={LITE ? 1 : [1, 1.5]}
            gl={{ antialias: !LITE, powerPreference: LITE ? 'default' : 'high-performance' }}
          >
            <Studio />
            <ambientLight intensity={0.15} />
            <directionalLight position={[2, 4, 5]} intensity={0.6} />
            <Glasses3D state={state} groupRef={glasses} ledRef={led} position={[0, pose.y, 0]} />
            <Rig progress={progress} glasses={glasses} led={led} pose={pose} />
          </Canvas>
        </Safe3D>
      )}
    </div>
  )
}
