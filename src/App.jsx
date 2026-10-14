import { useCallback, useState } from 'react'
import useTheme from './hooks/useTheme'
import useSmoothScroll from './hooks/useSmoothScroll'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Projects from './components/Projects'
import Flow from './components/Flow'
import Skills from './components/Skills'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import FloatingCTA from './components/FloatingCTA'
import { STILL } from './utils/env'
import { ScrollTrigger } from './utils/gsap'
import { getLenis } from './utils/lenis'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [loading, setLoading] = useState(!STILL) // loading screen (skipped for reduced-motion)
  const [ready, setReady] = useState(STILL) // hero intro can play

  useSmoothScroll()

  const done = useCallback(() => {
    setLoading(false)
    getLenis()?.start()
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      {loading && <Loader onReveal={() => setReady(true)} onDone={done} />}
      <div className="aurora" aria-hidden="true"><i /><i /></div>
      <Cursor />
      <ScrollProgress />
      <CursorGlow />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero theme={theme} ready={ready} />
      <About />
      <Stats />
      <Projects />
      <Flow />
      <Skills />
      <Education />
      <Achievements />
      <Contact />
      <FloatingCTA />
      <footer>© Kuldeep Gehlod</footer>
    </>
  )
}
