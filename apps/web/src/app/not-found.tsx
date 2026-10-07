import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <h1 className="font-heading text-3xl font-bold text-white">This page doesn&apos;t exist</h1>
      <p className="max-w-sm text-sm text-slate-400">
        The link may be old or mistyped. Head back to your workspace and pick up where you left off.
      </p>
      <div className="flex gap-3">
        <Link href="/dashboard" className="btn-primary">Open dashboard</Link>
        <Link href="/" className="btn-secondary">Go to home</Link>
      </div>
    </main>
  );
}
