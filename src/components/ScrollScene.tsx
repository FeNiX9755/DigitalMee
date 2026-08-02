import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import type { SpeechScene } from '../data/speech'

/** Extra scroll beyond one viewport — drives crossfade without a long “dead” pin. */
const SCENE_HEIGHT = 'calc(100dvh + 28dvh)'

type ScrollSceneProps = {
  scene: SpeechScene
  index: number
  total: number
}

export function ScrollScene({ scene, index, total }: ScrollSceneProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const useEntranceMotion = index >= 2

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const fadeOutRange = [0.38, 0.82] as const
  const opacity = useTransform(
    scrollYProgress,
    [0, fadeOutRange[0], fadeOutRange[1]],
    prefersReducedMotion ? [1, 1, 1] : [1, 1, 0],
  )

  const y = useTransform(
    scrollYProgress,
    useEntranceMotion && !prefersReducedMotion
      ? [0, 0.22, 0.55]
      : [0, 0.55],
    useEntranceMotion && !prefersReducedMotion
      ? [22, 0, -14]
      : [0, prefersReducedMotion ? 0 : -14],
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22],
    prefersReducedMotion || !useEntranceMotion ? [1, 1] : [0.98, 1],
  )
  const scrollHintOpacity = useTransform(
    scrollYProgress,
    index === 0 ? [0, 0.1, 0.28] : [0.05, 0.22],
    index === 0 ? [1, 0.55, 0] : [0.45, 0],
  )

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: SCENE_HEIGHT }}
      aria-label={`Chapter ${index + 1} of ${total}`}
    >
      <div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden"
        style={{ zIndex: index + 1 }}
      >
        <div
          className="absolute inset-0 bg-[length:200%_200%] animate-gradient-shift"
          style={{ backgroundImage: scene.gradient }}
          aria-hidden
        />
        <div className="grain absolute inset-0 opacity-60" aria-hidden />

        <div className="relative flex h-full items-center justify-center px-6 safe-top safe-bottom">
          <motion.div
            style={{ opacity, y, scale, willChange: 'opacity, transform' }}
            className="max-w-md text-center"
          >
            {scene.lines.map((line, lineIndex) => (
              <p
                key={line}
                className={`font-display leading-snug text-ink ${
                  lineIndex === 0
                    ? 'text-2xl sm:text-3xl'
                    : 'mt-3 text-xl sm:text-2xl text-ink-soft'
                } ${lineIndex === scene.lines.length - 1 ? 'italic' : ''}`}
              >
                {line}
              </p>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 safe-bottom">
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="flex flex-col items-center gap-2"
            aria-hidden
          >
            <span className="font-script text-base text-ink-faint">keep scrolling</span>
            <motion.span
              animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="block h-8 w-px bg-ink-faint/50"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
