import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsap'
import { FINE, STILL } from '../utils/env'

// Custom cursor: small dot + trailing ring that grows over links, buttons and cards.
// Only active for mouse/trackpad users (not touch) and when reduced motion is off.
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!FINE || STILL) return
    const d = dot.current, r = ring.current
    document.documentElement.classList.add('has-cursor')
    gsap.set([d, r], { xPercent: -50, yPercent: -50 })
    const dx = gsap.quickTo(d, 'x', { duration: 0.08 }), dy = gsap.quickTo(d, 'y', { duration: 0.08 })
    const rx = gsap.quickTo(r, 'x', { duration: 0.45, ease: 'power3' }), ry = gsap.quickTo(r, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
      d.classList.add('on'); r.classList.add('on')
    }
    const over = (e) => r.classList.toggle('hov', !!e.target.closest('a,button,.card,[data-cursor]'))
    const down = () => r.classList.add('down')
    const up = () => r.classList.remove('down')
    const out = (e) => { if (!e.relatedTarget) { d.classList.remove('on'); r.classList.remove('on') } }

    addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    addEventListener('pointerdown', down)
    addEventListener('pointerup', up)
    document.addEventListener('pointerout', out)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      removeEventListener('pointerdown', down)
      removeEventListener('pointerup', up)
      document.removeEventListener('pointerout', out)
    }
  }, [])

  return (
    <>
      <div id="cr" ref={ring} aria-hidden="true" />
      <div id="cd" ref={dot} aria-hidden="true" />
    </>
  )
}
