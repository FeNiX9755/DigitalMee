import { speechScenes } from '../data/speech'
import { FinalScene } from './FinalScene'
import { ScrollScene } from './ScrollScene'
import { useScroll, useTransform, motion } from 'framer-motion'

function ProgressDots({ total }: { total: number }) {
  const { scrollYProgress } = useScroll()

  return (
    <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2.5" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <ProgressDot
          key={i}
          scrollYProgress={scrollYProgress}
          index={i}
          total={total}
        />
      ))}
    </div>
  )
}

function ProgressDot({
  scrollYProgress,
  index,
  total,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  index: number
  total: number
}) {
  const segmentStart = index / total
  const segmentEnd = (index + 1) / total
  const midpoint = (segmentStart + segmentEnd) / 2

  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, midpoint - 0.12),
      midpoint,
      Math.min(1, midpoint + 0.12),
    ],
    [1, 1.8, 1],
  )

  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, midpoint - 0.15),
      midpoint,
      Math.min(1, midpoint + 0.15),
    ],
    [0.3, 1, 0.3],
  )

  return (
    <motion.div
      style={{ scale, opacity }}
      className="h-1.5 w-1.5 rounded-full bg-white shadow-sm"
    />
  )
}

export function ScrollyNarrative() {
  return (
    <main className="relative w-full touch-pan-y bg-paper-50">
      <ProgressDots total={speechScenes.length} />
      {speechScenes.map((scene, index) => (
        <ScrollScene
          key={scene.id}
          scene={scene}
          index={index}
          total={speechScenes.length}
        />
      ))}
      <FinalScene />
    </main>
  )
}
