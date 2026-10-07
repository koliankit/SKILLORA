import Link from "next/link";

/** SKILLORA mark: an "S" built from two ascending steps (skill → opportunity). */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sk-g" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgb(var(--sk-primary))" />
          <stop offset="1" stopColor="rgb(var(--sk-accent))" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#sk-g)" />
      <path
        d="M27 13.5c-1.4-1.6-3.7-2.5-6.3-2.5-3.7 0-6 1.8-6 4.4 0 2.8 2.4 3.7 6 4.5 3.7.8 6.3 1.8 6.3 4.8 0 2.8-2.6 4.8-6.4 4.8-2.9 0-5.4-1.1-6.9-3"
        stroke="rgb(var(--sk-ink))"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({
  href = "/",
  size = 36,
  subtitle,
}: {
  href?: string;
  size?: number;
  subtitle?: string;
}) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2.5" aria-label="SKILLORA home">
      <span className="transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
        <LogoMark size={size} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-xl font-bold tracking-tight text-white">SKILLORA</span>
        {subtitle && (
          <span className="mt-1 hidden text-[10px] tracking-wide text-slate-400 sm:block">{subtitle}</span>
        )}
      </span>
    </Link>
  );
}
