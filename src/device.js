// Phones and tablets get the lightweight version of the site: still images of
// the glasses instead of the live 3D scene and scroll zoom. Same URL, decided
// once on load.
const mq = (q) => typeof window !== 'undefined' && window.matchMedia?.(q).matches

export const IS_MOBILE = mq('(max-width: 767px)') || mq('(pointer: coarse) and (max-width: 1024px)')
