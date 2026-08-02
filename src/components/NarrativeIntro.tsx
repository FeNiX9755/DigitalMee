import { motion, useReducedMotion } from "framer-motion";

const INTRO_GRADIENT =
  "linear-gradient(165deg, #f5ebe3 0%, #edd4d8 40%, #dcc8e0 100%)";

type NarrativeIntroProps = {
  onContinue: () => void;
};

export function NarrativeIntro({ onContinue }: NarrativeIntroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-[100dvh] w-full overflow-hidden"
      aria-label="Story begins"
    >
      <div
        className="absolute inset-0 bg-[length:200%_200%] animate-gradient-shift"
        style={{ backgroundImage: INTRO_GRADIENT }}
        aria-hidden
      />
      <div className="grain absolute inset-0 opacity-60" aria-hidden />

      <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 safe-top safe-bottom">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md text-center"
        >
          <p className="font-script text-3xl text-rose">for you, Bunny</p>
          <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            I have been saving these words.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink-soft">
            Slow down.
            <br />
            <span className="italic opacity-80 block mt-1">
              Please don't turn around until the end.
            </span>
            <br />
            Every word here is something I have been meaning to say.
          </p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10"
          >
            <p className="mt-4 font-script text-3xl text-ink-faint">
              when you are ready,
            </p>
            <p className="mt-4 font-script text-2xl text-ink-faint">
              Click here
            </p>
            <button
              type="button"
              onClick={onContinue}
              className="w-full max-w-xs rounded-full bg-rose px-6 py-4 font-body text-base font-medium tracking-wide text-paper-50 shadow-polaroid transition-transform duration-300 active:scale-[0.98] animate-pulse-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-paper-50"
            >
              Turn the page
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
