import { useEffect, useRef } from 'react'
import { FINE, STILL } from '../utils/env'

// Card with cursor-follow glow and optional 3D tilt
export default function Card({ as: Tag = 'div', tilt = false, className = '', style, children }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!FINE || STILL) return
    const c = ref.current
    const glow = (e) => {
      const r = c.getBoundingClientRect()
      c.style.setProperty('--mx', e.clientX - r.left + 'px')
      c.style.setProperty('--my', e.clientY - r.top + 'px')
    }
    const move = (e) => {
      const r = c.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      c.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(6px)`
    }
    const leave = () => { c.style.transform = '' }
    c.addEventListener('pointermove', glow)
    if (tilt) {
      c.addEventListener('mousemove', move)
      c.addEventListener('mouseleave', leave)
    }
    return () => {
      c.removeEventListener('pointermove', glow)
      c.removeEventListener('mousemove', move)
      c.removeEventListener('mouseleave', leave)
    }
  }, [tilt])

  return (
    <Tag ref={ref} className={`card${tilt ? ' tilt' : ''} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  )
}
