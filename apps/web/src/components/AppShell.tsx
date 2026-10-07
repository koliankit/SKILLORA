"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import { spring } from "@/lib/motion";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useBusinessStore } from "@/store/businessStore";
import {
  LayoutDashboard,
  DollarSign,
  Cpu,
  Users,
  Compass,
  ShieldCheck,
  Bot,
  Sparkles,
  LogOut,
  ChevronDown,
  FolderCheck,
  BookOpen,
  FileSpreadsheet,
  Zap,
  RefreshCw,
  Bell,
  Menu,
  X
} from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, setAuth } = useAuthStore();
  const { organization, healthScore, resetToSeedData } = useBusinessStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copilotModalOpen, setCopilotModalOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState("");
  const [quickAnswer, setQuickAnswer] = useState<any>(null);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/finance", label: "Finance & Runway", icon: DollarSign },
    { href: "/operations", label: "Operations", icon: Cpu },
    { href: "/hr", label: "Workforce", icon: Users },
    { href: "/strategy", label: "Strategy & OKRs", icon: Compass },
    { href: "/growth", label: "Growth & Risks", icon: Zap },
    { href: "/documents", label: "Documents", icon: FolderCheck },
    { href: "/compliance", label: "Compliance", icon: ShieldCheck },
    { href: "/knowledge", label: "SOPs & Policies", icon: BookOpen },
    { href: "/reports", label: "AI Reports", icon: FileSpreadsheet },
    { href: "/copilot", label: "AI Copilot", icon: Bot, badge: "AI" }
  ];

  // If user is not authenticated, let them auto-login to demo
  const handleDemoSignIn = () => {
    setAuth(
      {
        id: "usr_0001",
        email: "ankit@aerosync.ai",
        full_name: "Ankit Sharma",
        roles: ["founder", "owner", "admin"]
      },
      "demo_jwt_token_2026"
    );
  };

  const handleAskQuickCopilot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuery.trim()) return;

    const q = quickQuery.toLowerCase();
    if (q.includes("runway") || q.includes("burn") || q.includes("cash")) {
      setQuickAnswer({
        observation: "Current cash balance is $1.24M with net burn of $48.2K/month.",
        evidence: "General Ledger & Bank Statement reconciliations (September 2026)",
        interpretation: "Runway is approximately 25.7 months; company is on track for Q1 2027 profitability.",
        action: "Maintain current hiring pacing while accelerating Series A conversations.",
        confidence: "high"
      });
    } else if (q.includes("cloud") || q.includes("gpu") || q.includes("cost")) {
      setQuickAnswer({
        observation: "Cloud GPU compute expenditure rose to $21,300/mo (19% of budget).",
        evidence: "AWS/GCP billing logs & telemetry cluster metrics",
        interpretation: "Idle spot instance nodes during off-peak hours (01:00 - 06:00 IST) can be downscaled.",
        action: "Enable dynamic telemetry auto-scaling sleep thresholds to save $3,200/mo.",
        confidence: "high"
      });
    } else {
      setQuickAnswer({
        observation: "Business Health is 84/100 (A- Robust) across 5 core operational dimensions.",
        evidence: "Unified Enterprise Hub: 6 interconnected databases (AeroSync Dynamics)",
        interpretation: "Operating metrics are outperforming plan; enterprise sales pilot conversion is the key Q4 priority.",
        action: "Close the 4 enterprise POCs currently in legal and security review.",
        confidence: "high"
      });
    }
  };

  return (
    <div className="min-h-screen bg-skillora-ink text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-skillora-border/80 bg-skillora-ink/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Left Brand & Org */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Logo subtitle="Enterprise operating layer" />

            {/* Org Switcher */}
            <div className="hidden lg:flex items-center gap-2 rounded-lg border border-skillora-border bg-skillora-ink-light/60 px-3 py-1.5 ml-4">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-200">{organization.name}</span>
              <span className="rounded bg-skillora-primary/10 px-1.5 py-0.5 text-[10px] font-mono text-skillora-primary uppercase">
                {organization.stage}
              </span>
            </div>
          </div>

          {/* Center Health Badge */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full border border-skillora-primary/30 bg-skillora-primary/10 px-3 py-1 text-xs transition-colors hover:bg-skillora-primary/20"
            >
              <span className="text-slate-300">Business Health:</span>
              <span className="font-bold text-skillora-primary">{healthScore.overall}/100</span>
              <span className="text-[10px] text-slate-400">({healthScore.grade})</span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Quick AI Ask Button */}
            <button
              onClick={() => setCopilotModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-skillora-primary/40 bg-skillora-ink-card px-3 py-1.5 text-xs font-medium text-skillora-primary hover:bg-skillora-primary/10 transition-all shadow-glow"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask Copilot</span>
            </button>

            {/* Reset Data Button */}
            <button
              onClick={() => {
                if (confirm("Reset to comprehensive AeroSync Dynamics seed data?")) {
                  resetToSeedData();
                }
              }}
              title="Reset to Initial Seed Data"
              className="p-2 text-slate-400 hover:text-skillora-primary transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            {/* Auth / Profile */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2.5">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-medium text-slate-200">{user.full_name}</span>
                  <span className="text-[10px] text-slate-400 capitalize">{user.roles[0]}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  title="Sign Out"
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleDemoSignIn}
                className="btn-primary text-xs py-1.5 px-3"
              >
                Demo Login
              </button>
            )}
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <div className="hidden md:block border-t border-skillora-border/40 bg-skillora-ink-light/40">
          <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium transition-colors ${
                    isActive ? "text-skillora-primary font-semibold" : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-skillora-primary" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="rounded bg-skillora-primary/20 px-1 py-0.2 text-[9px] font-mono text-skillora-primary uppercase">
                      {item.badge}
                    </span>
                  )}
                {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={spring}
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-gradient"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          className="md:hidden fixed inset-0 z-50 bg-skillora-ink/95 backdrop-blur-lg pt-16 px-6 pb-8 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-4 border-b border-skillora-border">
              <span className="text-xs font-mono text-slate-400">NAVIGATION</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400">
                <X className="h-6 w-6" />
              </button>
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-skillora-primary/15 text-skillora-primary border border-skillora-primary/30"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="pt-6 border-t border-skillora-border">
            <p className="text-xs text-slate-400 mb-2">Connected as {organization.name}</p>
            <button
              onClick={() => {
                resetToSeedData();
                setMobileMenuOpen(false);
              }}
              className="btn-secondary w-full text-xs"
            >
              Reset Seed Data
            </button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-6">{children}</main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-skillora-ink/95 backdrop-blur-xl border-t border-skillora-border/80 px-2 py-1.5 shadow-2xl safe-bottom">
        <div className="flex items-center justify-around">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
              pathname === "/dashboard"
                ? "text-skillora-primary font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <LayoutDashboard className="h-5 w-5 mb-0.5" />
            <span className="text-[10px]">Dashboard</span>
          </Link>

          <Link
            href="/finance"
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
              pathname === "/finance"
                ? "text-skillora-primary font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <DollarSign className="h-5 w-5 mb-0.5" />
            <span className="text-[10px]">Finance</span>
          </Link>

          {/* Center Copilot AI FAB button */}
          <Link
            href="/copilot"
            className="flex flex-col items-center justify-center -mt-4 relative group"
          >
            <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-skillora-primary to-skillora-accent flex items-center justify-center shadow-lg shadow-skillora-primary/30 border-2 border-skillora-ink transform active:scale-95 transition-transform">
              <Bot className="h-5 w-5 text-slate-950 font-bold" />
            </div>
            <span className="text-[10px] font-semibold text-skillora-primary mt-0.5">Copilot</span>
          </Link>

          <Link
            href="/operations"
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
              pathname === "/operations"
                ? "text-skillora-primary font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Cpu className="h-5 w-5 mb-0.5" />
            <span className="text-[10px]">Operations</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2 rounded-lg text-slate-400 hover:text-slate-200 transition-all"
          >
            <Menu className="h-5 w-5 mb-0.5" />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <footer className="border-t border-skillora-border/60 bg-skillora-ink-light/30 py-6 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 SKILLORA — Build smarter. Manage better. Grow with AI.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
            <span>SEED DATA: ACTIVE</span>
            <span>•</span>
            <span>AIRSPACE & FLEET TELEMETRY: READY</span>
            <span>•</span>
            <span>EXPLAINABLE AI ENGINE</span>
          </div>
        </div>
      </footer>

      {/* Quick Copilot Modal */}
      <AnimatePresence>
        {copilotModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => { setCopilotModalOpen(false); setQuickAnswer(null); }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="SKILLORA Copilot"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg skillora-card !animate-none p-6 shadow-2xl border-skillora-primary/40"
          >
            <div className="flex items-center justify-between pb-4 border-b border-skillora-border">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-skillora-primary" />
                <h3 className="font-heading font-semibold text-white">SKILLORA Copilot</h3>
              </div>
              <button
                onClick={() => {
                  setCopilotModalOpen(false);
                  setQuickAnswer(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAskQuickCopilot} className="mt-4">
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Ask anything about your business data, runway, operations or compliance:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="e.g. What is our current runway and cash burn?"
                  className="input-field flex-1"
                />
                <button type="submit" className="btn-primary text-xs px-4">
                  Ask
                </button>
              </div>
            </form>

            {quickAnswer && (
              <motion.div
                key={quickAnswer.observation}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 ai-insight-card !animate-none space-y-2 text-xs"
              >
                <p className="ai-insight-observation font-semibold text-white">{quickAnswer.observation}</p>
                <p className="ai-insight-evidence text-slate-400"><strong>Evidence:</strong> {quickAnswer.evidence}</p>
                <p className="text-slate-300"><strong>Analysis:</strong> {quickAnswer.interpretation}</p>
                <p className="ai-insight-action text-skillora-primary"><strong>Action:</strong> {quickAnswer.action}</p>
                <div className="flex justify-end pt-2">
                  <Link href="/copilot" className="text-xs text-skillora-primary hover:underline">
                    Open the full copilot workspace
                  </Link>
                </div>
              </motion.div>
            )}

            <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-skillora-border/40">
              <span className="text-[11px] text-slate-400">Try asking:</span>
              {[
                "What is our cash runway?",
                "How to reduce GPU cloud costs?",
                "Are there pending ROC compliance filings?"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setQuickQuery(suggestion);
                  }}
                  className="rounded-full bg-skillora-ink-light px-2.5 py-1 text-[11px] text-slate-300 hover:text-skillora-primary hover:border-skillora-primary border border-skillora-border"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
