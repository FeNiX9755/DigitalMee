import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

const FINAL_GRADIENT =
  'linear-gradient(145deg, #e8d0dc 0%, #c97b84 35%, #9a7a9e 70%, #7d6b8a 100%)'

export function FinalScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85],
    prefersReducedMotion ? [1, 1, 1] : [0.6, 1, 1],
  )
  const cardY = useTransform(
    scrollYProgress,
    [0, 0.25],
    prefersReducedMotion ? [0, 0] : [40, 0],
  )
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.25],
    prefersReducedMotion ? [1, 1] : [0.94, 1],
  )

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '160vh' }}
      aria-label="Final moment"
    >
      <div className="sticky top-0 z-10 h-[100dvh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-[length:200%_200%] animate-gradient-shift"
          style={{ backgroundImage: FINAL_GRADIENT }}
          aria-hidden
        />
        <div className="grain absolute inset-0 opacity-50" aria-hidden />

        <div className="relative flex h-full items-center justify-center px-5 safe-top safe-bottom">
          <motion.article
            style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
            className="w-full max-w-sm rounded-2xl bg-paper-50/95 px-8 py-10 text-center shadow-card backdrop-blur-sm"
          >
            <p className="font-script text-2xl text-rose">one last thing</p>
            <div className="mx-auto my-5 h-px w-12 bg-blush/60" aria-hidden />
            <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
              When you are ready,
              <br />
              I will be right here.
            </p>

            <button
              type="button"
              className="mt-8 w-full rounded-full bg-rose px-6 py-4 font-body text-base font-medium tracking-wide text-paper-50 shadow-polaroid transition-transform duration-300 active:scale-[0.98] animate-pulse-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-paper-50"
            >
              Now, turnaround.
            </button>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
