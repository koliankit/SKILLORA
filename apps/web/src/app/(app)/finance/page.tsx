"use client";

import GrowBar from "@/components/motion/GrowBar";
import React, { useState } from "react";
import { useBusinessStore } from "@/store/businessStore";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  Plus,
  Sliders,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from "lucide-react";

export default function FinancePage() {
  const { financials, addTransaction, runScenario, addAuditLog } = useBusinessStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [month, setMonth] = useState("Oct 2026");
  const [revenue, setRevenue] = useState(122000);
  const [expenses, setExpenses] = useState(111000);

  // Scenario simulation state
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [hiringCount, setHiringCount] = useState(5);
  const [priceIncreasePct, setPriceIncreasePct] = useState(15);
  const [gpuOptimizationPct, setGpuOptimizationPct] = useState(18);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      month,
      revenue: Number(revenue),
      expenses: Number(expenses)
    });
    setModalOpen(false);
  };

  // Dynamic calculations based on active scenario
  const baseMRR = financials.summary.monthly_recurring_revenue;
  const baseBurn = financials.summary.monthly_net_burn;
  const baseRunway = financials.summary.runway_months;

  let simulatedMRR = baseMRR;
  let simulatedBurn = baseBurn;
  let simulatedRunway = baseRunway;

  if (activeScenario === "hiring") {
    const additionalPayroll = hiringCount * 7000;
    const additionalMRR = hiringCount * 4500;
    simulatedMRR = baseMRR + additionalMRR;
    simulatedBurn = baseBurn + additionalPayroll - additionalMRR;
    simulatedRunway = financials.summary.cash_balance / (simulatedBurn > 0 ? simulatedBurn : 1);
  } else if (activeScenario === "price") {
    const additionalRev = baseMRR * (priceIncreasePct / 100);
    simulatedMRR = baseMRR + additionalRev;
    simulatedBurn = Math.max(0, baseBurn - additionalRev);
    simulatedRunway = financials.summary.cash_balance / (simulatedBurn > 0 ? simulatedBurn : 1);
  } else if (activeScenario === "cloud") {
    const savedCloud = 21300 * (gpuOptimizationPct / 100);
    simulatedBurn = Math.max(0, baseBurn - savedCloud);
    simulatedRunway = financials.summary.cash_balance / (simulatedBurn > 0 ? simulatedBurn : 1);
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider text-skillora-primary">
                Finance & Runway Intelligence
              </span>
              <span className="rounded bg-skillora-primary/10 px-2 py-0.5 text-[10px] font-mono text-skillora-primary">
                Explainable Ledger
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Enterprise Financial Visibility
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              P&L summary, unit economics, revenue composition and scenario forecasting.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setModalOpen(true)} className="btn-primary text-xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">ARR</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-heading text-2xl font-bold text-white">
                ${(financials.summary.annual_recurring_revenue / 1000000).toFixed(2)}M
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono mt-1">
              +{financials.summary.mrr_growth_rate_pct}% MoM growth
            </span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Current MRR</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-heading text-2xl font-bold text-skillora-primary">
                ${(financials.summary.monthly_recurring_revenue / 1000).toFixed(1)}k
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">Active B2B subscriptions</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Cash In Bank</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-heading text-2xl font-bold text-white">
                ${(financials.summary.cash_balance / 1000000).toFixed(2)}M
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">HDFC & Silicon Valley escrow</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Net Monthly Burn</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-heading text-2xl font-bold text-white">
                ${(financials.summary.monthly_net_burn / 1000).toFixed(1)}k
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono mt-1">-22% vs Q1 burn</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Runway</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-heading text-2xl font-bold text-emerald-400">
                {financials.summary.runway_months.toFixed(1)} mo
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">Comfortable Series A window</span>
          </div>
        </div>

        {/* Revenue Breakdown & Unit Economics */}
        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          {/* Revenue Breakdown (1 col) */}
          <div className="skillora-card p-6">
            <h2 className="font-heading text-base font-semibold text-white mb-4">
              Revenue Streams
            </h2>
            <div className="space-y-4">
              {financials.revenue_breakdown.map((rev) => (
                <div key={rev.category}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">{rev.category}</span>
                    <span className="font-mono text-skillora-primary">
                      ${(rev.amount_monthly / 1000).toFixed(1)}k ({rev.share_pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-skillora-ink-light overflow-hidden">
                    <GrowBar pct={rev.share_pct} className="h-full bg-skillora-primary rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-skillora-border space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Gross Profit Margin:</span>
                <span className="text-white font-mono">{financials.summary.gross_margin_pct}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Customer LTV:</span>
                <span className="text-white font-mono">${financials.summary.lifetime_value.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Customer CAC:</span>
                <span className="text-white font-mono">${financials.summary.customer_acquisition_cost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>LTV / CAC Ratio:</span>
                <span className="text-emerald-400 font-bold font-mono">{financials.summary.ltv_cac_ratio}x (Excellent)</span>
              </div>
            </div>
          </div>

          {/* Expense Categories (1 col) */}
          <div className="skillora-card p-6">
            <h2 className="font-heading text-base font-semibold text-white mb-4">
              Monthly Expense Distribution
            </h2>
            <div className="space-y-4">
              {financials.expense_categories.map((exp) => (
                <div key={exp.category}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">{exp.category}</span>
                    <span className="font-mono text-slate-400">
                      ${(exp.amount / 1000).toFixed(1)}k ({exp.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-skillora-ink-light overflow-hidden">
                    <GrowBar pct={exp.percentage} className="h-full bg-slate-500 rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[11px] text-slate-400">
              R&D payroll and cloud GPU servers account for 74.8% of operating budget.
            </p>
          </div>

          {/* AI Financial Recommendation (1 col) */}
          <div className="ai-insight-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-skillora-primary uppercase">AI Financial Audit</span>
                <span className="rounded bg-skillora-primary/10 px-2 py-0.5 text-[10px] font-mono text-skillora-primary">
                  High Confidence
                </span>
              </div>
              <p className="ai-insight-observation font-semibold text-white text-sm mb-2">
                AeroSync Dynamics has reached positive operating cashflow at the current scale of 4,450 flight hours/mo.
              </p>
              <p className="text-xs text-slate-400 mb-3">
                <strong>Evidence:</strong> Gross margin expanded from 68% to 74.2% over last 4 quarters due to telemetry payload compression.
              </p>
              <div className="rounded-lg bg-skillora-ink-light p-3 border border-skillora-border">
                <p className="text-xs text-skillora-primary">
                  ⚡ <strong>Recommended Action:</strong> Avoid broad marketing ad spend; re-invest $25k monthly into edge hardware gateway inventory to fulfill 3 waiting enterprise mining pilots.
                </p>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-mono mt-4">
              Limitation: Assumes enterprise client hardware delivery lead time stays below 4 weeks.
            </p>
          </div>
        </div>

        {/* Interactive Scenario Planning Simulator */}
        <div className="skillora-card p-6 mb-8 border-skillora-primary/40 bg-gradient-to-br from-skillora-ink-card to-skillora-ink-light/60">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-skillora-primary" />
                <h2 className="font-heading text-lg font-bold text-white">
                  Financial Scenario Planning Simulator
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Model decisions in real-time before committing capital or hiring.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveScenario("hiring")}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  activeScenario === "hiring"
                    ? "bg-skillora-primary text-skillora-ink font-bold border-skillora-primary"
                    : "border-skillora-border bg-skillora-ink-card text-slate-300 hover:text-white"
                }`}
              >
                Hire Engineers
              </button>
              <button
                onClick={() => setActiveScenario("price")}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  activeScenario === "price"
                    ? "bg-skillora-primary text-skillora-ink font-bold border-skillora-primary"
                    : "border-skillora-border bg-skillora-ink-card text-slate-300 hover:text-white"
                }`}
              >
                Price Adjustment
              </button>
              <button
                onClick={() => setActiveScenario("cloud")}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  activeScenario === "cloud"
                    ? "bg-skillora-primary text-skillora-ink font-bold border-skillora-primary"
                    : "border-skillora-border bg-skillora-ink-card text-slate-300 hover:text-white"
                }`}
              >
                Cloud Optimization
              </button>
              {activeScenario && (
                <button
                  onClick={() => setActiveScenario(null)}
                  className="text-xs text-slate-400 hover:text-white px-2"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Interactive Slider Area */}
          {activeScenario === "hiring" && (
            <div className="mb-6 rounded-lg bg-skillora-ink-card p-4 border border-skillora-border">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-300">New Senior AI/Robotics Engineers to Hire:</span>
                <span className="font-bold text-skillora-primary text-sm">{hiringCount} Engineers</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={hiringCount}
                onChange={(e) => setHiringCount(Number(e.target.value))}
                className="w-full accent-skillora-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>1 Engineer (+$7k/mo)</span>
                <span>15 Engineers (+$105k/mo)</span>
              </div>
            </div>
          )}

          {activeScenario === "price" && (
            <div className="mb-6 rounded-lg bg-skillora-ink-card p-4 border border-skillora-border">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-300">Enterprise SaaS Subscription Price Increase:</span>
                <span className="font-bold text-emerald-400 text-sm">+{priceIncreasePct}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={priceIncreasePct}
                onChange={(e) => setPriceIncreasePct(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>+5% ($124k MRR)</span>
                <span>+40% ($165k MRR)</span>
              </div>
            </div>
          )}

          {activeScenario === "cloud" && (
            <div className="mb-6 rounded-lg bg-skillora-ink-card p-4 border border-skillora-border">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-300">GPU Spot Instance & Auto-scaling Optimization:</span>
                <span className="font-bold text-skillora-primary text-sm">{gpuOptimizationPct}% Reduction</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                value={gpuOptimizationPct}
                onChange={(e) => setGpuOptimizationPct(Number(e.target.value))}
                className="w-full accent-skillora-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>5% (-$1k/mo)</span>
                <span>35% (-$7.4k/mo)</span>
              </div>
            </div>
          )}

          {/* Modeled Output Display */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-skillora-ink-card p-4 border border-skillora-border">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Simulated MRR</span>
              <p className="font-heading text-xl font-bold text-white mt-1">
                ${(simulatedMRR / 1000).toFixed(1)}k / mo
              </p>
              <span className="text-[10px] text-slate-400 font-mono">
                Baseline: ${(baseMRR / 1000).toFixed(1)}k
              </span>
            </div>

            <div className="rounded-lg bg-skillora-ink-card p-4 border border-skillora-border">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Simulated Monthly Burn</span>
              <p className="font-heading text-xl font-bold text-white mt-1">
                ${(simulatedBurn / 1000).toFixed(1)}k / mo
              </p>
              <span className="text-[10px] text-slate-400 font-mono">
                Baseline: ${(baseBurn / 1000).toFixed(1)}k
              </span>
            </div>

            <div className="rounded-lg bg-skillora-ink-card p-4 border border-skillora-border">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Simulated Runway</span>
              <p className="font-heading text-xl font-bold text-emerald-400 mt-1">
                {simulatedRunway.toFixed(1)} months
              </p>
              <span className="text-[10px] text-slate-400 font-mono">
                Baseline: {baseRunway.toFixed(1)} months
              </span>
            </div>
          </div>
        </div>

        {/* 12-Month Detailed Ledger Table */}
        <div className="skillora-card p-6">
          <h2 className="font-heading text-base font-semibold text-white mb-4">
            12-Month Financial Ledger Records
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-skillora-border text-[11px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="pb-3">Period</th>
                  <th className="pb-3">Monthly Revenue</th>
                  <th className="pb-3">Operating Expenses</th>
                  <th className="pb-3">Net Profit / (Loss)</th>
                  <th className="pb-3">Burn Rate</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-skillora-border/50 text-slate-300">
                {financials.monthly_financials_2025_2026.map((row) => (
                  <tr key={row.month} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-semibold text-white">{row.month}</td>
                    <td className="py-3 font-mono text-skillora-primary">
                      ${row.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 font-mono text-slate-400">
                      ${row.expenses.toLocaleString()}
                    </td>
                    <td className={`py-3 font-mono font-semibold ${row.net_profit >= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                      {row.net_profit >= 0 ? `+$${row.net_profit.toLocaleString()}` : `-$${Math.abs(row.net_profit).toLocaleString()}`}
                    </td>
                    <td className="py-3 font-mono text-slate-400">
                      {row.burn > 0 ? `$${row.burn.toLocaleString()}` : "$0 (Cashflow +)"}
                    </td>
                    <td className="py-3">
                      <span className={`rounded px-2 py-0.5 text-[10px] font-mono ${
                        row.net_profit >= 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                      }`}>
                        {row.net_profit >= 0 ? "PROFITABLE" : "INVESTING"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md skillora-card p-6 shadow-2xl border-skillora-primary/40">
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Insert Transaction Entry
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter verified monthly figures to update ARR, MRR, and cash runway.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Month & Year</label>
                <input
                  type="text"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Revenue ($)</label>
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Expenses ($)</label>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="input-field"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-skillora-border">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-ghost text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
