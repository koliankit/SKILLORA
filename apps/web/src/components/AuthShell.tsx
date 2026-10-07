"use client";

import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import { ease } from "@/lib/motion";

/** Shared frame for sign-in / sign-up: logo, title, and a card that settles into place. */
export default function AuthShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-[380px] w-[380px] -translate-x-1/2 animate-drift rounded-full bg-skillora-primary/15 blur-[110px]" />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Logo size={40} />
          <p className="text-sm text-slate-400">{title}</p>
        </div>
        <div className="skillora-card !animate-none space-y-5 p-8">{children}</div>
      </motion.div>
    </div>
  );
}

export function Field({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `f-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-slate-300">
        {label} {hint && <span className="text-slate-500">({hint})</span>}
      </label>
      <input id={id} className="input-field" {...props} />
    </div>
  );
}
