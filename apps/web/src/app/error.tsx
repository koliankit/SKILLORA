"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="font-heading text-2xl font-bold text-white">Something went wrong</h1>
      <p className="max-w-sm text-sm text-slate-400">
        The page hit an unexpected error. Your data is safe — try loading it again.
      </p>
      <button onClick={reset} className="btn-primary">Reload page</button>
    </main>
  );
}
