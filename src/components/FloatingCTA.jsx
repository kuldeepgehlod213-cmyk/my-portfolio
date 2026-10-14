import { useEffect, useState } from 'react'
import Btn from './Btn'

export default function FloatingCTA() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const f = () => {
      const ct = document.getElementById('contact')
      setOn(scrollY > innerHeight * 0.7 && ct.getBoundingClientRect().top > innerHeight * 0.6)
    }
    f()
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return <Btn href="#contact" className={`fab${on ? ' on' : ''}`}>Get in touch</Btn>
}
