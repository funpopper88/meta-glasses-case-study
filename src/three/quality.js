// Phones and low-memory devices get a lighter 3D render: fewer pixels and
// triangles, smaller reflection map, no MSAA. Desktop keeps full quality.
const mq = (q) => typeof window !== 'undefined' && window.matchMedia?.(q).matches

export const LITE =
  typeof window !== 'undefined' &&
  (mq('(pointer: coarse)') || window.innerWidth < 768 || (navigator.deviceMemory && navigator.deviceMemory <= 4))

// True when the browser can create a WebGL context at all
export function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}
