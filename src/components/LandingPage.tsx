import { motion, useReducedMotion } from 'framer-motion'

type LandingPageProps = {
  onStart: () => void
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

      {/* Scrapbook polaroids */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        <div
          className="absolute -left-2 top-8 z-0 h-28 w-24 -rotate-6 rounded-sm bg-white shadow-polaroid"
          aria-hidden
        >
          <div className="tape absolute -top-2 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-2 rounded-sm" />
          <div className="flex h-full items-end justify-center pb-3">
            <span className="font-script text-lg text-ink-faint">us</span>
          </div>
        </div>

        <div
          className="absolute -right-1 top-20 z-0 h-24 w-20 rotate-8 rounded-sm bg-white shadow-polaroid"
          aria-hidden
        >
          <div className="tape absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-3 rounded-sm" />
          <div className="flex h-full items-end justify-center pb-2">
            <span className="font-script text-base text-ink-faint">♥</span>
          </div>
        </div>

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
