import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsap'
import { STILL } from '../utils/env'

// Scroll-triggered stagger reveal (GSAP ScrollTrigger) for the cards / timeline items inside a section
export default function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    if (STILL) return
    const el = ref.current
    const targets = el.querySelectorAll('.card, .ti, .ab > p, .flow > span, .flow + .chips')
    if (!targets.length) return
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: 50,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        onStart: () => targets.forEach((t) => { t.style.transition = 'none' }),
        onComplete: () => targets.forEach((t) => { t.style.transition = '' }),
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])
  return ref
}
