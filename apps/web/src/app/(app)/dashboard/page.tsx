"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CountUp from "@/components/motion/CountUp";
import GrowBar from "@/components/motion/GrowBar";
import { useAuthStore } from "@/store/auth";
import { useBusinessStore } from "@/store/businessStore";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Cpu,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
  Plus,
  Compass
} from "lucide-react";

export default function DashboardPage() {
  const { user, isAuthenticated, setAuth } = useAuthStore();
  const {
    organization,
    healthScore,
    financials,
    kpis,
    workflows,
    complianceItems,
    insights,
    addTransaction,
    runScenario
  } = useBusinessStore();

  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [newMonth, setNewMonth] = useState("Oct 2026");
  const [newRevenue, setNewRevenue] = useState(124000);
  const [newExpenses, setNewExpenses] = useState(113500);

  // Auto-login to demo user if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      setAuth(
        {
          id: "usr_0001",
          email: "ankit@aerosync.ai",
          full_name: "Ankit Sharma",
          roles: ["founder", "owner", "admin"]
        },
        "demo_jwt_token_2026"
      );
    }
  }, [isAuthenticated, setAuth]);

  const handleAddTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      month: newMonth,
      revenue: Number(newRevenue),
      expenses: Number(newExpenses)
    });
    setTransactionModalOpen(false);
  };

  const maxFinancialValue = Math.max(
    ...financials.monthly_financials_2025_2026.map((m) => Math.max(m.revenue, m.expenses))
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Welcome Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs tracking-wider uppercase text-skillora-primary">
                Executive Command Dashboard
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-400/20">
                Live Data Connected
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Welcome back, {user ? user.full_name.split(" ")[0] : "Founder"}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Overview of <span className="text-slate-200 font-semibold">{organization.name}</span> across financial, operational and workforce health.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setTransactionModalOpen(true)}
              className="btn-primary text-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Insert Financial Entry</span>
            </button>
            <Link href="/copilot" className="btn-secondary text-xs">
              <Sparkles className="h-3.5 w-3.5 text-skillora-primary" />
              <span>Ask AI Copilot</span>
            </Link>
          </div>
        </div>

        {/* Core Journey Progress Bar */}
        <div className="mb-8 skillora-card p-4 bg-skillora-ink-light/40 border-skillora-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">ENTREPRENEUR LIFECYCLE PROGRESS</span>
            <span className="text-xs font-mono text-skillora-primary">STAGE: OPERATE → MEASURE → SCALE</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 text-center">
            {[
              { stage: "IDEA", status: "completed" },
              { stage: "VALIDATE", status: "completed" },
              { stage: "PLAN", status: "completed" },
              { stage: "BUILD", status: "completed" },
              { stage: "OPERATE", status: "active" },
              { stage: "MEASURE", status: "active" },
              { stage: "OPTIMIZE", status: "upcoming" },
              { stage: "SCALE", status: "upcoming" }
            ].map((s) => (
              <div
                key={s.stage}
                className={`py-1.5 px-1 rounded text-[11px] font-mono font-medium transition-colors ${
                  s.status === "completed"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : s.status === "active"
                    ? "bg-skillora-primary/20 text-skillora-primary border border-skillora-primary/50 shadow-glow"
                    : "bg-skillora-ink-card/60 text-slate-500 border border-skillora-border"
                }`}
              >
                {s.stage}
              </div>
            ))}
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Overall Health Score Card */}
          <div className="metric-tile relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase">Business Health</span>
              <span className="rounded bg-skillora-primary/15 px-2 py-0.5 text-[10px] font-mono text-skillora-primary font-bold">
                {healthScore.grade}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <CountUp value={healthScore.overall} className="font-heading text-3xl font-extrabold text-white" />
              <span className="text-xs text-slate-400">/ 100</span>
              <span className="text-xs text-emerald-400 font-mono ml-auto">{healthScore.trend}</span>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-1.5 w-full rounded-full bg-skillora-ink-light overflow-hidden">
              <GrowBar pct={healthScore.overall} className="h-full rounded-full bg-gradient-to-r from-skillora-primary to-skillora-accent" />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Explainable multi-variate assessment</p>
          </div>

          {/* ARR Card */}
          <div className="metric-tile">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase">Annual Recurring Rev (ARR)</span>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-heading text-3xl font-extrabold text-white">
                ${(financials.summary.annual_recurring_revenue / 1000000).toFixed(2)}M
              </span>
              <span className="text-xs text-emerald-400 font-mono ml-auto">
                +{financials.summary.mrr_growth_rate_pct}% MoM
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              MRR: ${(financials.summary.monthly_recurring_revenue / 1000).toFixed(1)}k / month
            </p>
          </div>

          {/* Cash Runway Card */}
          <div className="metric-tile">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase">Cash Runway</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-heading text-3xl font-extrabold text-white">
                {financials.summary.runway_months.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">months</span>
              <span className="text-xs text-slate-300 font-mono ml-auto">
                ${(financials.summary.cash_balance / 1000000).toFixed(2)}M in bank
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Net burn: ${(financials.summary.monthly_net_burn / 1000).toFixed(1)}k / mo
            </p>
          </div>

          {/* Fleet Ops & Telemetry Card */}
          <div className="metric-tile">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase">Mission SLA Uptime</span>
              <Cpu className="h-4 w-4 text-skillora-primary" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-heading text-3xl font-extrabold text-white">99.88%</span>
              <span className="text-xs text-emerald-400 font-mono ml-auto">Target: 99.50%</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Avg Edge Latency: <span className="text-skillora-primary font-mono font-semibold">34.2 ms</span>
            </p>
          </div>
        </div>

        {/* 5-Dimensional Business Health Breakdown */}
        <div className="skillora-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-base font-semibold text-white">
                5-Dimensional Business Health Breakdown
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Every dimension is weighted and grounded in real operational records
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">STATUS: AUDITED</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Finance Health", val: healthScore.finance, target: "80+", status: "Robust", icon: DollarSign, color: "text-emerald-400" },
              { label: "Fleet & Ops", val: healthScore.operations, target: "85+", status: "Exceeding", icon: Cpu, color: "text-skillora-primary" },
              { label: "Pipeline & Sales", val: healthScore.sales, target: "75+", status: "On Track", icon: TrendingUp, color: "text-skillora-accent" },
              { label: "Workforce & Talent", val: healthScore.workforce, target: "80+", status: "Healthy", icon: Users, color: "text-purple-400" },
              { label: "Statutory Compliance", val: healthScore.compliance, target: "85+", status: "Audited", icon: ShieldCheck, color: "text-amber-400" }
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-skillora-border bg-skillora-ink-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-300">{item.label}</span>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-2xl font-bold text-white">{item.val}</span>
                  <span className="text-xs text-slate-500">/100</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-skillora-ink-light overflow-hidden">
                  <GrowBar pct={item.val} className="h-full rounded-full bg-skillora-primary" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-2 block">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section: Financial Visual Bar Chart & Active Workflows */}
        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          {/* Financial Chart (2 cols) */}
          <div className="skillora-card p-6 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <h2 className="font-heading text-base font-semibold text-white">
                  Monthly Revenue vs Expenses Trajectory
                </h2>
                <p className="text-xs text-slate-400">
                  Last 12 months actuals showing path to cashflow positivity
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-sm bg-skillora-primary" />
                  <span className="text-slate-300">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-sm bg-slate-600" />
                  <span className="text-slate-300">Expenses</span>
                </div>
              </div>
            </div>

            {/* Custom Bar Visualization */}
            <div className="h-64 flex items-end gap-2 pt-6 pb-2 border-b border-skillora-border">
              {financials.monthly_financials_2025_2026.map((m) => {
                const revHeight = (m.revenue / maxFinancialValue) * 100;
                const expHeight = (m.expenses / maxFinancialValue) * 100;
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip */}
                    <div className="hidden group-hover:block absolute -top-12 z-20 bg-skillora-ink-card border border-skillora-primary/50 p-2 rounded shadow-lg text-[10px] whitespace-nowrap text-white">
                      <p className="font-bold">{m.month}</p>
                      <p className="text-skillora-primary">Rev: ${m.revenue.toLocaleString()}</p>
                      <p className="text-slate-400">Exp: ${m.expenses.toLocaleString()}</p>
                    </div>

                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      {/* Revenue Bar */}
                      <div
                        className="w-1/2 bg-skillora-primary rounded-t transition-all hover:brightness-110"
                        style={{ height: `${revHeight}%` }}
                      />
                      {/* Expense Bar */}
                      <div
                        className="w-1/2 bg-slate-600 rounded-t transition-all hover:brightness-120"
                        style={{ height: `${expHeight}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 mt-2 rotate-45 sm:rotate-0 origin-left">
                      {m.month.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-400">
              <p>Break-even achieved in Jun 2026; net positive monthly margin since Q3.</p>
              <Link href="/finance" className="text-skillora-primary hover:underline flex items-center gap-1">
                <span>View Full Finance & Scenarios</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Active Automated Workflows (1 col) */}
          <div className="skillora-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-base font-semibold text-white">
                Automated Workflows
              </h2>
              <Link href="/operations" className="text-xs text-skillora-primary hover:underline">
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {workflows.slice(0, 3).map((wf) => (
                <div key={wf.id} className="rounded-lg border border-skillora-border bg-skillora-ink-card p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-white line-clamp-1">{wf.name}</span>
                    <span className="inline-flex items-center rounded-full bg-emerald-400/10 px-1.5 py-0.2 text-[9px] font-mono text-emerald-400">
                      {wf.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    <strong className="text-slate-300">Trigger:</strong> {wf.trigger}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-skillora-border/40 pt-1.5">
                    <span>{wf.runs_this_month} runs this mo</span>
                    <span className="text-emerald-400 font-semibold">{wf.success_rate}% success</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/operations"
              className="mt-4 block w-full text-center rounded-lg border border-dashed border-skillora-border py-2 text-xs text-slate-400 hover:border-skillora-primary/50 hover:text-skillora-primary transition-colors"
            >
              + Create Automated Workflow
            </Link>
          </div>
        </div>

        {/* Explainable AI Insights Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-skillora-primary" />
              <h2 className="font-heading text-lg font-bold text-white">
                Explainable AI Insights & Recommendations
              </h2>
            </div>
            <Link href="/copilot" className="text-xs text-skillora-primary hover:underline">
              Open Decision Copilot →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight) => (
              <div key={insight.id} className="ai-insight-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-skillora-primary uppercase tracking-wider">
                    {insight.category}
                  </span>
                  <span className="rounded bg-skillora-primary/10 px-2 py-0.5 text-[10px] font-mono text-skillora-primary capitalize">
                    Confidence: {insight.confidence}
                  </span>
                </div>
                <p className="ai-insight-observation font-semibold text-white mb-2">
                  {insight.observation}
                </p>
                <div className="text-xs text-slate-400 space-y-1 mb-3">
                  <p><strong className="text-slate-300">Evidence:</strong> {insight.evidence}</p>
                  <p><strong className="text-slate-300">Analysis:</strong> {insight.interpretation}</p>
                </div>
                <div className="rounded-lg bg-skillora-ink-light/80 border border-skillora-primary/20 p-3">
                  <p className="ai-insight-action text-xs text-skillora-primary font-medium">
                    ⚡ <strong>Recommended Action:</strong> {insight.recommended_action}
                  </p>
                  {insight.limitation && (
                    <p className="text-[10px] text-slate-500 mt-1 italic font-mono">
                      Limitation: {insight.limitation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Compliance & Regulatory Tracker Alert */}
        <div className="skillora-card p-6 bg-gradient-to-r from-skillora-ink-card to-skillora-ink-light/80 border-amber-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-white">
                  Statutory Regulatory Compliance Alert
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Upcoming filing: <strong className="text-amber-300">ROC Form AOC-4 & MGT-7</strong> due by September 30, 2026.
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  CA Audit verified · Awaiting Board Digital Signature Certificate (DSC)
                </p>
              </div>
            </div>
            <Link href="/compliance" className="btn-secondary text-xs shrink-0">
              Review Compliance Vault →
            </Link>
          </div>
        </div>
      </div>

      {/* Insert Transaction Modal */}
      {transactionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md skillora-card p-6 shadow-2xl border-skillora-primary/40">
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Insert Financial Entry
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Add real revenue and expense data into AeroSync Dynamics general ledger.
            </p>

            <form onSubmit={handleAddTransactionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Month & Year</label>
                <input
                  type="text"
                  value={newMonth}
                  onChange={(e) => setNewMonth(e.target.value)}
                  placeholder="e.g. Oct 2026"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Monthly Revenue (USD)</label>
                <input
                  type="number"
                  value={newRevenue}
                  onChange={(e) => setNewRevenue(Number(e.target.value))}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Monthly Expenses (USD)</label>
                <input
                  type="number"
                  value={newExpenses}
                  onChange={(e) => setNewExpenses(Number(newExpenses))}
                  className="input-field"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-skillora-border">
                <button
                  type="button"
                  onClick={() => setTransactionModalOpen(false)}
                  className="btn-ghost text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Insert Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
