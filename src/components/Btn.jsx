import { gsap } from '../utils/gsap'
import { FINE, STILL } from '../utils/env'

// Link-button with a magnetic hover (GSAP, elastic snap-back). Renders nothing if href is falsy and `optional` is set.
export default function Btn({ href, ghost, optional, external, className = '', children, ...rest }) {
  if (optional && !href) return null
  const magnetic = FINE && !STILL
  const onMove = (e) => {
    const b = e.currentTarget, r = b.getBoundingClientRect()
    gsap.to(b, {
      x: ((e.clientX - r.left) / r.width - 0.5) * 14,
      y: ((e.clientY - r.top) / r.height - 0.5) * 10,
      duration: 0.3, ease: 'power3.out', overwrite: 'auto',
    })
  }
  const onLeave = (e) => gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)', overwrite: 'auto' })
  const ext = external ? { target: '_blank', rel: 'noopener' } : {}
  return (
    <a
      className={`btn${ghost ? ' ghost' : ''} ${className}`.trim()}
      href={href || '#'}
      onPointerMove={magnetic ? onMove : undefined}
      onPointerLeave={magnetic ? onLeave : undefined}
      {...ext}
      {...rest}
    >
      {children}
    </a>
  )
}
