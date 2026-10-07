"use client";

import { MotionConfig } from "framer-motion";

/** Respects the OS "reduce motion" setting for every framer-motion animation. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
