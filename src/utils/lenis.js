// Shared handle to the Lenis instance (used by loader + anchor links)
let instance = null
export const setLenis = (l) => { instance = l }
export const getLenis = () => instance
