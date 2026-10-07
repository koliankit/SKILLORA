"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/** Progress bar fill that grows to its value the first time it is seen. */
export default function GrowBar({ pct, className = "" }: { pct: number; className?: string }) {
  const value = Math.max(0, Math.min(100, pct));
  return (
    <motion.div
      className={className}
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.9, ease }}
    />
  );
}
