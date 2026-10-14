export const FINE = matchMedia('(pointer:fine)').matches
export const STILL = matchMedia('(prefers-reduced-motion:reduce)').matches
export const clamp01 = (v) => Math.max(0, Math.min(1, v))
