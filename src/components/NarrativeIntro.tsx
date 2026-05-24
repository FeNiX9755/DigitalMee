import { motion, useReducedMotion } from "framer-motion";

const INTRO_GRADIENT = "linear-gradient(165deg, #f5ebe3 0%, #edd4d8 40%, #dcc8e0 100%)";

export function NarrativeIntro() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden" aria-label="Story begins">
      <div className="absolute inset-0 bg-[length:200%_200%] animate-gradient-shift" style={{ backgroundImage: INTRO_GRADIENT }} aria-hidden />
      <div className="grain absolute inset-0 opacity-60" aria-hidden />

      <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 safe-top safe-bottom">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md text-center"
        >
          <p className="font-script text-3xl text-rose">you made it here</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">This is for you.</h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink-soft">
            Slow down. Scroll gently.
            <br />
            <span className="italic opacity-80 block mt-1">Please don't turn around yet.</span>
            <br />
            Each line is something I meant to say out loud.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 safe-bottom"
          aria-hidden
        >
          <span className="font-script text-base text-ink-faint">keep scrolling</span>
          <motion.span
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-8 w-px bg-ink-faint/50"
          />
        </motion.div>
      </div>
    </section>
  );
}
