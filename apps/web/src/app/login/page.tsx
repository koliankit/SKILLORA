"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Zap } from "lucide-react";
import AuthShell, { Field } from "@/components/AuthShell";
import { useAuthStore } from "@/store/auth";
import { ApiError, postJson } from "@/lib/api";
import type { User } from "@/types";

const DEMO_USER: User = {
  id: "usr_0001",
  email: "ankit@aerosync.ai",
  full_name: "Ankit Sharma",
  roles: ["founder", "owner", "admin"],
};

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await postJson<{ user: User; access_token: string }>("/auth/login", { email, password });
      setAuth(data.user, data.access_token);
      router.push("/dashboard");
    } catch (err) {
      // A real answer from the server (wrong password, bad input) is shown as-is.
      if (err instanceof ApiError && err.status < 500 && err.status !== 404) {
        setError(err.status === 401 ? "That email and password don't match. Check them and try again." : err.message);
        setLoading(false);
        return;
      }
      // Server unreachable (static/mobile build, or backend not deployed): open a local demo session.
      setAuth(
        { id: "usr_local", email, full_name: email.split("@")[0].replace(/[._]/g, " "), roles: ["founder"] },
        "local_demo_session"
      );
      router.push("/dashboard");
    }
  }

  return (
    <AuthShell title="Sign in to your workspace">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          setAuth(DEMO_USER, "demo_session");
          router.push("/dashboard");
        }}
        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border border-skillora-primary/50 bg-skillora-primary/10 p-3.5 text-sm font-semibold text-skillora-primary shadow-glow transition-colors hover:bg-skillora-primary/20"
      >
        <span aria-hidden className="absolute inset-y-0 w-1/3 animate-sheen bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <Zap className="h-4 w-4" />
        Open the demo workspace
      </motion.button>

      <div className="flex items-center gap-3" aria-hidden>
        <div className="h-px flex-1 bg-skillora-border" />
        <span className="text-[11px] text-slate-500">or sign in with email</span>
        <div className="h-px flex-1 bg-skillora-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence>
          {error && (
            <motion.div
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        <Field label="Email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
        <Field label="Password" type="password" required minLength={8} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-center text-sm text-slate-400">
          New to SKILLORA?{" "}
          <Link href="/signup" className="text-skillora-primary hover:underline">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  );
}
