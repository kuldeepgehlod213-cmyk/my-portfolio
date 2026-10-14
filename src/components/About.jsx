import { useEffect, useRef } from 'react'
import Section from './Section'
import photo from '../assets/photo.jpg'
import { STILL } from '../utils/env'
import { gsap } from '../utils/gsap'

export default function About() {
  const ph = useRef(null)

  // photo flies in from the side in 3D, scrubbed by scroll (GSAP ScrollTrigger)
  useEffect(() => {
    const el = ph.current
    if (STILL) { el.style.opacity = 1; return }
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { x: () => -(innerWidth < 700 ? 90 : 220), rotateY: 60, opacity: 0, transformPerspective: 1000 },
        { x: 0, rotateY: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 35%', scrub: true, invalidateOnRefresh: true } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <Section id="about" title="About">
      <div className="ab">
        <div className="ph" id="ph2" ref={ph}>
          <img src={photo} alt="Kuldeep Gehlod" />
        </div>
        <p style={{ maxWidth: 760, color: 'var(--mu)', fontSize: 18 }}>
          Final-year B.Tech CSE student and Full Stack Developer (MERN) with a strong foundation in Data
          Structures, OOP, DBMS and Computer Networks. I built and deployed a role-based job and service booking
          platform with secure REST APIs, and practise Data Structures &amp; Algorithms on LeetCode. I'm seeking
          Software Development roles in Backend and Full Stack.
        </p>
      </div>
    </Section>
  )
}
