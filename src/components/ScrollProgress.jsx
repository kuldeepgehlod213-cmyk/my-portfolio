import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const f = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      ref.current.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%'
    }
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return <div id="pb" ref={ref} />
}
