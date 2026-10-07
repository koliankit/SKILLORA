"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useBusinessStore } from "@/store/businessStore";

export default function DemoPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const resetToSeedData = useBusinessStore((s) => s.resetToSeedData);

  useEffect(() => {
    // Initialize full demo user and seed state
    setAuth(
      {
        id: "usr_0001",
        email: "ankit@aerosync.ai",
        full_name: "Ankit Sharma",
        roles: ["founder", "owner", "admin"]
      },
      "demo_jwt_token_2026"
    );
    resetToSeedData();
    router.replace("/dashboard");
  }, [setAuth, resetToSeedData, router]);

  return (
    <div className="min-h-screen bg-skillora-ink flex items-center justify-center p-4">
      <div className="skillora-card p-8 text-center max-w-sm border-skillora-primary/40">
        <div className="h-10 w-10 mx-auto mb-4 rounded-xl bg-skillora-primary/20 border border-skillora-primary flex items-center justify-center animate-pulse">
          <span className="font-heading text-lg font-bold text-skillora-primary">N</span>
        </div>
        <h2 className="font-heading text-lg font-bold text-white mb-1">
          Loading Demo Workspace
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          Connecting to AeroSync Dynamics enterprise seed data...
        </p>
      </div>
    </div>
  );
}
