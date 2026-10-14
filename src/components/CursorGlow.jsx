import { useEffect, useRef } from 'react'
import { FINE, STILL } from '../utils/env'

export default function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    if (!FINE || STILL) return
    const f = (e) => {
      const c = ref.current
      c.style.opacity = 1
      c.style.left = e.clientX + 'px'
      c.style.top = e.clientY + 'px'
    }
    addEventListener('pointermove', f)
    return () => removeEventListener('pointermove', f)
  }, [])
  return <div id="cur" ref={ref} />
}
