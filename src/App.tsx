import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { LandingPage } from './components/LandingPage'
import { ScrollyNarrative } from './components/ScrollyNarrative'

type View = 'landing' | 'narrative'

export default function App() {
  const [view, setView] = useState<View>('landing')
  const prefersReducedMotion = useReducedMotion()

  const handleStart = useCallback(() => {
    setView('narrative')
  }, [])

  useEffect(() => {
    if (view === 'narrative') {
      window.scrollTo(0, 0)
      document.body.style.overflow = ''
    }
  }, [view])

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        <motion.div
          key="landing"
          initial={false}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.98, filter: 'blur(4px)' }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <LandingPage onStart={handleStart} />
        </motion.div>
      ) : (
        <motion.div
          key="narrative"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <ScrollyNarrative />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
