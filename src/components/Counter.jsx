import { useEffect, useRef, useState } from 'react'

// Counts up from 0 when scrolled into view (shows final value until then / without JS animation)
export default function Counter({ n, d = 0 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(n)

  useEffect(() => {
    const el = ref.current
    let raf
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const f = (now) => {
        const k = Math.min(1, (now - t0) / 1200)
        setVal(n * (1 - Math.pow(1 - k, 3)))
        if (k < 1) raf = requestAnimationFrame(f)
      }
      raf = requestAnimationFrame(f)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [n])

  return <div className="num" ref={ref}>{val.toFixed(d)}</div>
}
