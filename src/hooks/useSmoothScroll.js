import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '../utils/gsap'
import { STILL } from '../utils/env'
import { setLenis } from '../utils/lenis'

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
// Starts stopped; the loading screen calls lenis.start() when it finishes.
export default function useSmoothScroll() {
  useEffect(() => {
    if (STILL) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.stop()
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // in-page anchors scroll smoothly through Lenis
    const click = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length < 2) return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -64 })
    }
    document.addEventListener('click', click)

    return () => {
      document.removeEventListener('click', click)
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])
}
