import { useCallback, useLayoutEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { STILL } from '../utils/env'

function read() {
  try { return localStorage.getItem('t') } catch { return null }
}

export default function useTheme() {
  const [theme, setTheme] = useState(read) // 'light' | 'dark' | null (follow system)

  // layout effect so <html data-theme> is set before children read CSS vars
  useLayoutEffect(() => {
    const R = document.documentElement
    if (theme) R.dataset.theme = theme
    else delete R.dataset.theme
  }, [theme])

  // toggle(event): with the View Transitions API the new theme spreads out from the button as a circle
  const toggle = useCallback((e) => {
    const cur = theme || (matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark')
    const next = cur === 'dark' ? 'light' : 'dark'
    try { localStorage.setItem('t', next) } catch { /* ignore */ }

    if (document.startViewTransition && !STILL && e?.currentTarget) {
      const r = e.currentTarget.getBoundingClientRect()
      const x = r.left + r.width / 2, y = r.top + r.height / 2
      const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      document.startViewTransition(() => flushSync(() => setTheme(next))).ready.then(() =>
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
        )
      )
    } else {
      setTheme(next)
    }
  }, [theme])

  return [theme, toggle]
}
