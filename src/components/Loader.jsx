import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsap'

// Full-screen loading animation: logo letters slide up, progress counts to 100,
// then the panel slides away and the hero intro starts (onReveal), finally onDone.
export default function Loader({ onReveal, onDone }) {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    const num = el.querySelector('.ld-num')
    const bar = el.querySelector('.ld-bar i')
    const p = { v: 0 }
    const paint = () => { num.textContent = Math.round(p.v); bar.style.transform = `scaleX(${p.v / 100})` }
    let dead = false

    const ctx = gsap.context(() => {
      gsap.from('.ld-logo span', { yPercent: 110, stagger: 0.12, duration: 0.8, ease: 'power4.out' })
      gsap.to(p, { v: 90, duration: 1.4, ease: 'power2.out', onUpdate: paint })
    }, el)

    const loaded = new Promise((r) => (document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true })))
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve()
    Promise.race([
      Promise.all([fonts, loaded, new Promise((r) => setTimeout(r, 1300))]),
      new Promise((r) => setTimeout(r, 4000)), // never get stuck
    ]).then(() => {
      if (dead) return
      ctx.add(() => {
        gsap.timeline()
          .to(p, { v: 100, duration: 0.35, ease: 'power1.out', onUpdate: paint })
          .to(el.querySelector('.ld-in'), { opacity: 0, y: -24, duration: 0.4, ease: 'power2.in' }, '+=0.15')
          .to(el, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.1')
          .add(() => onReveal(), '-=0.45')
          .add(() => onDone())
      })
    })

    return () => { dead = true; ctx.revert() }
  }, [])

  return (
    <div className="ld" ref={root} role="status" aria-label="Loading">
      <div className="ld-in">
        <div className="ld-logo" aria-hidden="true"><span>K</span><span>G</span></div>
        <div className="ld-bar"><i /></div>
        <div className="ld-num">0</div>
      </div>
    </div>
  )
}
