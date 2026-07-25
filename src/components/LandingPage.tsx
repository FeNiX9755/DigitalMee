import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

type LandingPageProps = {
  onStart: () => void
}

function PolaroidStack() {
  const prefersReducedMotion = useReducedMotion()
  const [photo2OnTop, setPhoto2OnTop] = useState(true)

  const springTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 260, damping: 22 }

  // Position presets
  const frontPos = { rotate: 10, x: 0,   y: 0,  scale: 1    }
  const backPos  = { rotate: -6, x: -20, y: 14, scale: 0.88 }

  return (
    <motion.button
      type="button"
      onClick={() => setPhoto2OnTop(v => !v)}
      initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-4 top-[10%] z-20 focus:outline-none"
      style={{ width: 132, height: 200 }}
      aria-label="Tap to flip photos"
    >
      {/* photo_1 — starts behind */}
      <motion.div
        animate={photo2OnTop ? backPos : frontPos}
        transition={springTransition}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: photo2OnTop ? 10 : 20,
        }}
        className="w-28 rounded-sm bg-white p-2 pb-7 border border-ink/15"
      >
        <div className="tape absolute -top-2.5 left-1/2 z-10 h-4 w-12 -translate-x-1/2 -rotate-1 rounded-sm" />
        <div className="overflow-hidden rounded-[2px] aspect-[3/4]">
          <img
            src="/photo_1.jpg"
            alt="us"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
        <p className="mt-1 text-center font-script text-sm text-ink-faint">us ♡</p>
      </motion.div>

      {/* photo_2 — starts on top, same position as before */}
      <motion.div
        animate={photo2OnTop ? frontPos : backPos}
        transition={springTransition}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: photo2OnTop ? 20 : 10,
        }}
        className="w-28 rounded-sm bg-white p-2 pb-7 border border-ink/15"
      >
        <div className="tape absolute -top-2.5 left-1/2 z-10 h-4 w-14 -translate-x-1/2 rotate-2 rounded-sm" />
        <div className="overflow-hidden rounded-[2px] aspect-[3/4]">
          <img
            src="/photo_2.jpg"
            alt="always"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
        <p className="mt-1 text-center font-script text-sm text-ink-faint">always ♡</p>
      </motion.div>

      {/* Tap hint — clearly visible with bounce */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
        <motion.span
          animate={prefersReducedMotion ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-base"
          aria-hidden
        >
          ↺
        </motion.span>
        <p className="whitespace-nowrap font-script text-sm text-ink-soft">
          tap to swap
        </p>
      </div>
    </motion.button>
  )
}

export function LandingPage({ onStart }: LandingPageProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-paper-50 px-6 safe-top safe-bottom">
      <div className="grain pointer-events-none absolute inset-0 opacity-70" aria-hidden />

      {/* Soft vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(61,47,40,0.06)_100%)]"
        aria-hidden
      />

      {/* Interactive polaroid stack — top right, photo_2 on top by default */}
      <PolaroidStack />

      {/* "Our story" card */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        <article className="relative z-10 mx-auto max-w-xs rounded-sm bg-white px-8 py-10 shadow-polaroid">
          <div className="tape absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-1 rounded-sm" />
          <p className="font-script text-3xl text-rose">our story</p>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            A little book
            <br />
            <span className="italic text-ink-soft">just for you</span>
          </h1>
          <p className="mt-5 font-body text-sm leading-relaxed text-ink-faint">
            Private pages. Soft light. Words I have been saving.
          </p>
        </article>
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-12 w-full max-w-xs"
      >
        <button
          type="button"
          onClick={onStart}
          className="w-full rounded-full border border-ink/10 bg-ink px-8 py-4 font-body text-sm font-medium tracking-widest text-paper-50 uppercase shadow-polaroid transition-all duration-300 hover:bg-ink-soft active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-paper-50"
        >
          Start
        </button>
        <p className="mt-4 text-center font-script text-lg text-ink-faint">
          turn the page when you are ready
        </p>
      </motion.div>
    </div>
  )
}
