import { useEffect, useState } from 'react'
import { STILL } from '../utils/env'

export default function Typewriter({ words, className = '' }) {
  const [text, setText] = useState(STILL ? words[0] : '')

  useEffect(() => {
    if (STILL) return
    let wi = 0, ci = 0, del = false, timer
    const tick = () => {
      const w = words[wi]
      ci += del ? -1 : 1
      setText(w.slice(0, ci))
      let d = del ? 35 : 75
      if (!del && ci === w.length) { del = true; d = 1400 }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; d = 300 }
      timer = setTimeout(tick, d)
    }
    tick()
    return () => clearTimeout(timer)
  }, [words])

  return (
    <p className={`ty ${className}`.trim()}>
      Into <b>{text}</b><i className="cr">|</i>
    </p>
  )
}
