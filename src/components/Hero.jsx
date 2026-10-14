import { useEffect, useLayoutEffect, useRef } from 'react'
import HeroCanvas from './HeroCanvas'
import Typewriter from './Typewriter'
import Btn from './Btn'
import SplitText from './SplitText'
import photo from '../assets/photo.jpg'
import { TYPED_WORDS } from '../data'
import { STILL } from '../utils/env'
import { gsap } from '../utils/gsap'

export default function Hero({ theme, ready }) {
  const root = useRef(null)
  const photoRef = useRef(null)

  // hide intro elements until the loading screen is done
  useLayoutEffect(() => {
    if (STILL) return
    gsap.set(root.current.querySelectorAll('.hi'), { opacity: 0, y: 30 })
    gsap.set(root.current.querySelector('.fly'), { opacity: 0 })
  }, [])

  // intro: text slides up, photo flies in from the side in 3D
  useEffect(() => {
    if (STILL || !ready) return
    const ctx = gsap.context(() => {
      gsap.to('.hi', { opacity: 1, y: 0, stagger: 0.1, delay: 0.5, duration: 0.8, ease: 'power3.out' })
      gsap.fromTo('.fly',
        { x: 180, rotateY: -50, opacity: 0, transformPerspective: 900 },
        { x: 0, rotateY: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: 'expo.out' })
    }, root)
    return () => ctx.revert()
  }, [ready])

  // photo drifts away in 3D as you scroll (ScrollTrigger scrub)
  useEffect(() => {
    if (STILL) return
    const ctx = gsap.context(() => {
      gsap.to(photoRef.current, {
        x: 130, y: -30, rotateY: -38, opacity: 0.3, transformPerspective: 900, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <header id="hero" ref={root}>
      <HeroCanvas theme={theme} />
      <div className="hw">
        <div>
          <div className="bd hi"><i></i>Open to Backend &amp; Full Stack roles</div><br />
          <div className="tag hi">Full Stack Developer · MERN</div>
          <SplitText as="h1" text="Kuldeep Gehlod" mode="load" ready={ready} delay={0.2} />
          <p className="sub hi">
            Final-year B.Tech CSE student building secure, role-based web apps with React, Node.js and MongoDB.
          </p>
          <Typewriter words={TYPED_WORDS} className="hi" />
          <div className="cta hi">
            <Btn href="#projects">View Projects</Btn>
            <Btn href="#contact" ghost>Contact Me</Btn>
          </div>
        </div>
        <div className="fly">
          <div className="ph" id="photo" ref={photoRef}>
            <img src={photo} alt="Kuldeep Gehlod" />
          </div>
        </div>
      </div>
    </header>
  )
}
