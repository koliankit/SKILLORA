"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import Logo from "@/components/Logo";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { ease, rise, stagger } from "@/lib/motion";

const JOURNEY = ["Idea", "Validate", "Plan", "Build", "Operate", "Measure", "Optimize", "Scale"];

const FEATURES = [
  { title: "Business health & KPIs", desc: "An explainable health score, operational metrics and insights grounded in your own data." },
  { title: "AI business copilot", desc: "Ask questions, analyze connected data, get structured recommendations and trigger workflows." },
  { title: "Strategy & planning", desc: "Idea validation, business model canvas, OKRs, scenario planning and risk registers." },
  { title: "Finance visibility", desc: "Revenue, expenses, forecasting and scenario modeling with transparent assumptions." },
  { title: "Workforce & employability", desc: "HR profiles, skill gaps, candidate matching and training plans for your organization." },
  { title: "Compliance & workflows", desc: "Configurable checklists, approval flows, audit trails and document intelligence." },
];

/* The hero's one orchestrated moment: an AI insight assembling in the same order a reader should trust it. */
const INSIGHT = [
  { k: "Observation", v: "Operating expenses rose 18% month-over-month while revenue stayed flat." },
  { k: "Evidence", v: "Expense ledger · last 30 days · compared with the 90-day average." },
  { k: "Interpretation", v: "Cost growth is outpacing revenue, mainly in marketing and contractors." },
  { k: "Recommended action", v: "Review marketing spend and pause non-critical contractor renewals this week." },
];

function Header() {
  const { scrollY } = useScroll();
  const border = useTransform(scrollY, [0, 80], [0, 1]);
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-skillora-ink/70">
      <motion.div style={{ opacity: border }} className="absolute inset-x-0 bottom-0 h-px bg-skillora-border" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {[["#features", "Platform"], ["#journey", "Journey"], ["#ai", "AI copilot"]].map(([h, l]) => (
            <a key={h} href={h} className="group relative text-sm text-slate-300 transition-colors hover:text-white">
              {l}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-skillora-primary transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-ghost">Sign in</Link>
          <Link href="/signup" className="btn-primary">Get started</Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
      {/* ambient glow — slow, behind content, never competes with the insight card */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] animate-drift rounded-full bg-skillora-primary/15 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-40 h-[360px] w-[360px] animate-drift rounded-full bg-skillora-accent/10 blur-[110px] [animation-delay:-6s]" />

      <motion.div variants={stagger(0.1)} initial="hidden" animate="show" className="relative">
        <motion.p variants={rise} className="font-mono-label mb-5">Entrepreneurship &amp; enterprise management</motion.p>
        <h1 className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl">
          {["Build smarter.", "Manage better.", "Grow with AI."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className={`block ${i === 2 ? "text-brand-gradient" : ""}`}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300">
          SKILLORA is the business operating layer for founders and growing teams. It takes you from validating an idea to running and scaling the company, with every recommendation explained.
        </motion.p>
        <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/signup" className="btn-primary px-6 py-3 text-base">Start your business journey</Link>
          <Link href="/demo" className="btn-secondary px-6 py-3 text-base">Open the demo workspace</Link>
        </motion.div>
        <motion.p variants={rise} className="mt-6 text-sm text-slate-400">
          The demo uses sample data. Nothing in it is a real customer, revenue figure or accuracy claim.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28, rotate: 1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.5 }}
        className="relative"
      >
        <div className="ai-insight-card !animate-none space-y-4 p-6 shadow-glow-lg" aria-label="Example AI insight">
          <div className="flex items-center justify-between">
            <p className="font-mono-label">Example AI insight</p>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-skillora-primary opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-skillora-primary" />
            </span>
          </div>
          <motion.dl variants={stagger(0.35, 1.0)} initial="hidden" animate="show" className="space-y-3.5">
            {INSIGHT.map((row, i) => (
              <motion.div key={row.k} variants={rise} className={i === 3 ? "rounded-lg bg-skillora-primary/10 p-3" : ""}>
                <dt className="text-xs text-slate-400">{row.k}</dt>
                <dd className={`mt-0.5 text-sm ${i === 3 ? "font-medium text-skillora-primary" : "text-slate-100"}`}>{row.v}</dd>
              </motion.div>
            ))}
            <motion.div variants={rise}>
              <div className="mb-1.5 flex justify-between text-xs text-slate-400">
                <span>Confidence</span><span>Medium — confirm against the latest invoices</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-skillora-ink-light">
                <motion.div
                  className="h-full rounded-full bg-brand-gradient"
                  initial={{ width: 0 }}
                  animate={{ width: "58%" }}
                  transition={{ duration: 1.1, ease, delay: 2.6 }}
                />
              </div>
            </motion.div>
          </motion.dl>
        </div>
      </motion.div>
    </section>
  );
}

function Journey() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setActive(Math.min(JOURNEY.length - 1, Math.max(0, Math.round(v * (JOURNEY.length - 1)))))
  );
  return (
    <section id="journey" ref={ref} className="border-y border-skillora-border/60 bg-skillora-ink-light/50">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="mb-2 text-center font-heading text-2xl font-bold text-white">One journey, from first idea to scale</h2>
        <p className="mb-8 text-center text-sm text-slate-400">Scroll to follow the path. SKILLORA supports every stage with the same data.</p>
        <div className="relative mx-auto mb-8 h-1 max-w-3xl overflow-hidden rounded-full bg-skillora-border">
          <motion.div className="h-full origin-left rounded-full bg-brand-gradient" style={{ scaleX: scrollYProgress }} />
        </div>
        <ol className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {JOURNEY.map((step, i) => (
            <motion.li
              key={step}
              animate={{ scale: i === active ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              className={`rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 ${
                i <= active
                  ? "border-skillora-primary/50 bg-skillora-primary/10 text-white"
                  : "border-skillora-border bg-skillora-ink-card text-slate-400"
              }`}
            >
              {step}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Header />
      <Hero />
      <Journey />

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 max-w-2xl">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">One operating layer for the whole business</h2>
          <p className="mt-4 text-slate-400">
            Management tools, AI decision support, finance visibility and workforce intelligence share one set of data, so answers stay consistent across teams.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <SpotlightCard key={f.title} className="p-6">
              <h3 className="mb-2 font-heading text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section id="ai" className="border-t border-skillora-border/50 bg-skillora-ink-light/40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Not a chatbot. An operating partner.</h2>
            <p className="mt-5 leading-relaxed text-slate-300">
              SKILLORA uses structured business context, intent routing, tool access and retrieval to give company-specific recommendations. Every important insight follows one pattern: observation, evidence, interpretation, recommended action, confidence.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {[
                "Never fabricates financial figures or market facts",
                "Says so when the data it needs is unavailable",
                "Keeps critical workflows running when AI is offline",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-skillora-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="skillora-card p-8 text-center">
            <p className="font-heading text-2xl font-bold text-white">See it with sample data</p>
            <p className="mx-auto mt-3 max-w-sm text-sm text-slate-400">
              The demo workspace is a fully populated company. Open it, ask the copilot a question and explore every module.
            </p>
            <Link href="/demo" className="btn-primary mt-6 px-7 py-3 text-base">Open the demo workspace</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Ready to run on better information?</h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          Create your organization, complete founder onboarding and let SKILLORA set up your business context.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/signup" className="btn-primary px-8 py-3 text-base">Create account</Link>
          <Link href="/login" className="btn-secondary px-8 py-3 text-base">Sign in</Link>
        </div>
      </section>

      <footer className="border-t border-skillora-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <Logo size={28} />
          <p className="text-xs text-slate-400">© 2026 SKILLORA · Build smarter. Manage better. Grow with AI.</p>
        </div>
      </footer>
    </div>
  );
}
