import { Fragment, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '../utils/gsap'
import { STILL } from '../utils/env'

// Letter-by-letter slide-up reveal.
// mode="load"   -> plays when `ready` becomes true (hero, after the loading screen)
// mode="scroll" -> plays when the heading scrolls into view (ScrollTrigger)
export default function SplitText({ as: Tag = 'h2', text, mode = 'scroll', ready = true, delay = 0, className }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (STILL) return
    gsap.set(ref.current.querySelectorAll('.ch'), { yPercent: 115, rotate: 8, transformOrigin: '0% 100%' })
  }, [])

  useEffect(() => {
    if (STILL || (mode === 'load' && !ready)) return
    const ctx = gsap.context(() => {
      gsap.to('.ch', {
        yPercent: 0,
        rotate: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: mode === 'load' ? 0.04 : 0.025,
        delay: mode === 'load' ? delay : 0,
        ...(mode === 'scroll' ? { scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } } : {}),
      })
    }, ref)
    return () => ctx.revert()
  }, [ready])

  if (STILL) return <Tag className={className}>{text}</Tag>

  const words = text.split(' ')
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span className="w" aria-hidden="true">
            {[...w].map((c, i) => (
              <span className="cm" key={i}><span className="ch">{c}</span></span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
