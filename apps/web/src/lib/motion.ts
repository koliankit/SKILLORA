import type { Transition, Variants } from "framer-motion";

/** Shared easing so every animation in SKILLORA feels like the same product. */
export const ease = [0.2, 0.7, 0.2, 1] as const;
export const spring: Transition = { type: "spring", stiffness: 380, damping: 30 };

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
