import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { LandingPage } from './components/LandingPage'
import { NarrativeIntro } from './components/NarrativeIntro'
import { ScrollyNarrative } from './components/ScrollyNarrative'

type View = 'landing' | 'intro' | 'speeches'

const pageTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
}

export default function App() {
  const [view, setView] = useState<View>('landing')
  const prefersReducedMotion = useReducedMotion()

  const handleStart = useCallback(() => {
    setView('intro')
  }, [])

  const handleEnterSpeeches = useCallback(() => {
    setView('speeches')
  }, [])

  useLayoutEffect(() => {
    if (view === 'speeches') {
      window.scrollTo(0, 0)
    }
  }, [view])

  useEffect(() => {
    const root = document.documentElement
    if (view === 'intro') {
      document.body.style.overflow = 'hidden'
      root.style.overflow = 'hidden'
    } else if (view === 'speeches') {
      document.body.style.overflow = ''
      root.style.overflow = ''
    }
    return () => {
      if (view === 'intro') {
        document.body.style.overflow = ''
        root.style.overflow = ''
      }
    }
  }, [view])

  const exitMotion = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.98, filter: 'blur(4px)' }

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' && (
        <motion.div
          key="landing"
          initial={false}
          exit={exitMotion}
          transition={pageTransition}
        >
          <LandingPage onStart={handleStart} />
        </motion.div>
      )}
      {view === 'intro' && (
        <motion.div
          key="intro"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={exitMotion}
          transition={pageTransition}
        >
          <NarrativeIntro onContinue={handleEnterSpeeches} />
        </motion.div>
      )}
      {view === 'speeches' && (
        <motion.div key="speeches" initial={false} animate={{ opacity: 1 }}>
          <ScrollyNarrative />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
