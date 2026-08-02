import { useRef, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const FINAL_GRADIENT =
  "linear-gradient(145deg, #e8d0dc 0%, #c97b84 35%, #9a7a9e 70%, #7d6b8a 100%)";

const CELEBRATION_GRADIENT =
  "linear-gradient(145deg, #f5d0dc 0%, #e8a0b0 30%, #c97b84 65%, #9a7a9e 100%)";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  opacity: number;
};

const COLORS = [
  "#c97b84",
  "#e8b4b8",
  "#9a7a9e",
  "#7d6b8a",
  "#fdf8f2",
  "#d4a8b4",
  "#f5ebe3",
];

function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: 6 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * 360,
      speed: 1.2 + Math.random() * 2,
      opacity: 0.7 + Math.random() * 0.3,
    }));
    setParticles(generated);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            rotate: p.angle,
            opacity: p.opacity,
          }}
          animate={{
            y: "110vh",
            rotate: p.angle + 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: [p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.speed + 2.5,
            delay: Math.random() * 1.2,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

export function FinalScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [celebrated, setCelebrated] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85],
    prefersReducedMotion ? [1, 1, 1] : [0.6, 1, 1],
  );
  const cardY = useTransform(
    scrollYProgress,
    [0, 0.25],
    prefersReducedMotion ? [0, 0] : [40, 0],
  );
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.25],
    prefersReducedMotion ? [1, 1] : [0.94, 1],
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: 'calc(100dvh + 36dvh)' }}
      aria-label="Final moment"
    >
      <div className="sticky top-0 z-10 h-[100dvh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {!celebrated ? (
            <motion.div
              key="proposal"
              className="absolute inset-0"
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.04, filter: "blur(6px)" }
              }
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
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
                  <p className="font-script text-2xl text-rose">
                    one last thing
                  </p>
                  <div
                    className="mx-auto my-5 h-px w-12 bg-blush/60"
                    aria-hidden
                  />
                  <p className="font-display text-xl leading-relaxed text-ink sm:text-2xl">
                    Slowly
                    <br />
                    Take a deep breath.
                    <br />
                    When you are ready
                  </p>

                  <motion.div className="mt-8 flex flex-col items-center gap-2">
                    <motion.span
                      animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="font-script text-sm text-rose/70"
                      aria-hidden
                    >
                      ↓
                    </motion.span>
                    <button
                      type="button"
                      onClick={() => setCelebrated(true)}
                      className="w-full rounded-full bg-rose px-6 py-4 font-body text-base font-medium tracking-wide text-paper-50 shadow-polaroid transition-transform duration-300 active:scale-[0.98] animate-pulse-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-paper-50"
                    >
                      tap here ♡
                    </button>
                  </motion.div>
                </motion.article>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute inset-0 bg-[length:200%_200%] animate-gradient-shift"
                style={{ backgroundImage: CELEBRATION_GRADIENT }}
                aria-hidden
              />
              <div className="grain absolute inset-0 opacity-40" aria-hidden />
              <Confetti />

              <div className="relative flex h-full flex-col items-center justify-center px-6 safe-top safe-bottom text-center">
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 24, scale: 0.92 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full max-w-sm rounded-2xl bg-paper-50/95 px-8 py-12 shadow-card backdrop-blur-sm"
                >
                  {/* The question — leads everything, biggest text */}
                  <motion.h2
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 16, scale: 0.95 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-display text-4xl font-medium leading-tight text-ink sm:text-5xl"
                  >
                    Will you
                    <br />
                    <span className="italic text-rose">marry me?</span>
                  </motion.h2>

                  {/* Ring emoji — below the question */}
                  <motion.p
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, scale: 0.7 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="mt-4 text-4xl"
                    aria-hidden
                  >
                    💍
                  </motion.p>

                  {/* Divider */}
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="mx-auto mt-5 h-px w-12 bg-blush/60"
                    aria-hidden
                  />

                  {/* Full name */}
                  <motion.p
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.25 }}
                    className="mt-4 font-display text-sm font-medium tracking-widest text-ink-soft uppercase"
                  >
                    Maria Caterina Olivier
                  </motion.p>

                  {/* Final instruction — quiet, at the bottom */}
                  <motion.p
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="mt-3 font-script text-lg text-rose"
                  >
                    Now, turn around. I am right here.
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
