"use client";

import React, { useState } from "react";
import { useBusinessStore } from "@/store/businessStore";
import {
  Cpu,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Play,
  TrendingUp,
  Activity,
  ArrowRight
} from "lucide-react";

export default function OperationsPage() {
  const { kpis, workflows, processes, addKPI, addWorkflow } = useBusinessStore();

  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
  const [wfName, setWfName] = useState("");
  const [wfTrigger, setWfTrigger] = useState("");
  const [wfCondition, setWfCondition] = useState("");
  const [wfAction, setWfAction] = useState("");

  const [kpiModalOpen, setKpiModalOpen] = useState(false);
  const [kpiName, setKpiName] = useState("");
  const [kpiCategory, setKpiCategory] = useState("Operations");
  const [kpiVal, setKpiVal] = useState(99.9);
  const [kpiTarget, setKpiTarget] = useState(99.5);
  const [kpiUnit, setKpiUnit] = useState("%");
  const [kpiOwner, setKpiOwner] = useState("Ops Team");

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wfName || !wfTrigger || !wfAction) return;

    addWorkflow({
      name: wfName,
      trigger: wfTrigger,
      condition: wfCondition || "Always verified",
      action: wfAction,
      status: "active"
    });

    setWfName("");
    setWfTrigger("");
    setWfCondition("");
    setWfAction("");
    setWorkflowModalOpen(false);
  };

  const handleCreateKPI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kpiName) return;

    addKPI({
      name: kpiName,
      category: kpiCategory,
      current_value: Number(kpiVal),
      target_value: Number(kpiTarget),
      unit: kpiUnit,
      trend: "up",
      change_pct: 0.1,
      owner: kpiOwner,
      frequency: "monthly",
      status: "on_track"
    });

    setKpiName("");
    setKpiModalOpen(false);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider text-skillora-primary">
                Operations & Automated Workflows
              </span>
              <span className="rounded bg-emerald-400/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                Active Telemetry Mesh
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Mission Operations & Process Engine
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Fleet telemetry SLA, trigger-based task automations, process cycle times and KPI tracking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setWorkflowModalOpen(true)} className="btn-primary text-xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Create Workflow</span>
            </button>
            <button onClick={() => setKpiModalOpen(true)} className="btn-secondary text-xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Add KPI</span>
            </button>
          </div>
        </div>

        {/* Live Mission Status Banner */}
        <div className="mb-8 rounded-xl border border-skillora-primary/30 bg-skillora-ink-card p-6 shadow-glow">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase">Active Telemetry Fleet</span>
              <p className="font-heading text-2xl font-bold text-white mt-1">142 Drones</p>
              <span className="text-[11px] text-emerald-400 font-mono">100% Signal Coverage</span>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase">Avg Edge Latency</span>
              <p className="font-heading text-2xl font-bold text-skillora-primary mt-1">34.2 ms</p>
              <span className="text-[11px] text-slate-400 font-mono">Target: &lt;45 ms</span>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase">Automated Clearance</span>
              <p className="font-heading text-2xl font-bold text-white mt-1">1,842 Flights</p>
              <span className="text-[11px] text-emerald-400 font-mono">DGCA DigitalSky Verified</span>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase">Mission SLA Uptime</span>
              <p className="font-heading text-2xl font-bold text-emerald-400 mt-1">99.88%</p>
              <span className="text-[11px] text-slate-400 font-mono">Zero Critical Failures</span>
            </div>
          </div>
        </div>

        {/* Automated Workflows Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-lg font-bold text-white">
                Automated Business Workflows
              </h2>
              <p className="text-xs text-slate-400">
                Trigger → Condition → Action workflows executing autonomously with audit trails
              </p>
            </div>
            <span className="text-xs font-mono text-skillora-primary">{workflows.length} Active Workflows</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {workflows.map((wf) => (
              <div key={wf.id} className="skillora-card p-5 hover:border-skillora-primary/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-skillora-primary" />
                    <h3 className="font-heading font-semibold text-white text-sm">{wf.name}</h3>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                    {wf.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs mt-3">
                  <div className="rounded bg-skillora-ink-light/60 p-2 border border-skillora-border/60">
                    <span className="text-[10px] font-mono uppercase text-skillora-primary block mb-0.5">Trigger</span>
                    <span className="text-slate-300">{wf.trigger}</span>
                  </div>
                  <div className="rounded bg-skillora-ink-light/60 p-2 border border-skillora-border/60">
                    <span className="text-[10px] font-mono uppercase text-skillora-accent block mb-0.5">Condition</span>
                    <span className="text-slate-300">{wf.condition}</span>
                  </div>
                  <div className="rounded bg-skillora-ink-light/60 p-2 border border-skillora-border/60">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-0.5">Automated Action</span>
                    <span className="text-slate-300">{wf.action}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-skillora-border">
                  <span>Runs this month: <strong className="text-white">{wf.runs_this_month}</strong></span>
                  <span className="text-emerald-400 font-semibold">{wf.success_rate}% Success Rate</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Mapping & Cycle Times */}
        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          <div className="skillora-card p-6">
            <h2 className="font-heading text-base font-semibold text-white mb-2">
              Process Mapping & Cycle Times
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Enterprise customer delivery pipeline with bottleneck identification
            </p>

            <div className="space-y-3">
              {processes.map((proc, i) => (
                <div key={proc.stage} className="rounded-lg border border-skillora-border bg-skillora-ink-card p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-white">{proc.stage}</span>
                    <span className="text-xs font-mono text-skillora-primary">{proc.lead_time}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>Owner: <strong className="text-slate-300">{proc.owner}</strong></span>
                    <span>Automation: <strong className="text-emerald-400">{proc.automation_level}</strong></span>
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-slate-400">
                    Risk: <span className={proc.bottleneck_risk.includes("Medium") ? "text-amber-400 font-semibold" : "text-slate-400"}>{proc.bottleneck_risk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Performance Indicators Grid */}
          <div className="skillora-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-base font-semibold text-white">
                Enterprise KPI Directory
              </h2>
              <span className="text-xs font-mono text-slate-400">{kpis.length} Tracked</span>
            </div>

            <div className="space-y-3">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="rounded-lg border border-skillora-border bg-skillora-ink-card p-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">{kpi.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Target: {kpi.target_value} {kpi.unit} · Owner: {kpi.owner}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-heading text-base font-bold text-skillora-primary block">
                      {kpi.current_value} {kpi.unit}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      ▲ +{kpi.change_pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Modal */}
      {workflowModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg skillora-card p-6 shadow-2xl border-skillora-primary/40">
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Create Automated Workflow
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Define event-driven logic to automate enterprise operations and approvals.
            </p>

            <form onSubmit={handleCreateWorkflow} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Workflow Title</label>
                <input
                  type="text"
                  value={wfName}
                  onChange={(e) => setWfName(e.target.value)}
                  placeholder="e.g. Edge Hardware Temperature Overheat Auto-Throttling"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Trigger Event</label>
                <input
                  type="text"
                  value={wfTrigger}
                  onChange={(e) => setWfTrigger(e.target.value)}
                  placeholder="e.g. Gateway core temperature exceeds 85°C for 30 seconds"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Condition</label>
                <input
                  type="text"
                  value={wfCondition}
                  onChange={(e) => setWfCondition(e.target.value)}
                  placeholder="e.g. Mission status is ACTIVE and ambient temp > 38°C"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Automated Action</label>
                <input
                  type="text"
                  value={wfAction}
                  onChange={(e) => setWfAction(e.target.value)}
                  placeholder="e.g. Reduce onboard neural network frame rate to 15fps & alert ground pilot"
                  className="input-field"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-skillora-border">
                <button type="button" onClick={() => setWorkflowModalOpen(false)} className="btn-ghost text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Deploy Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* KPI Modal */}
      {kpiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md skillora-card p-6 shadow-2xl border-skillora-primary/40">
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Add New Business KPI
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Configure a measurable operational or financial metric.
            </p>

            <form onSubmit={handleCreateKPI} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">KPI Name</label>
                <input
                  type="text"
                  value={kpiName}
                  onChange={(e) => setKpiName(e.target.value)}
                  placeholder="e.g. Hardware Gateway Battery Health"
                  className="input-field"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Current Value</label>
                  <input
                    type="number"
                    value={kpiVal}
                    onChange={(e) => setKpiVal(Number(e.target.value))}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Value</label>
                  <input
                    type="number"
                    value={kpiTarget}
                    onChange={(e) => setKpiTarget(Number(e.target.value))}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Unit</label>
                  <input
                    type="text"
                    value={kpiUnit}
                    onChange={(e) => setKpiUnit(e.target.value)}
                    placeholder="%, ms, USD, etc."
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Owner</label>
                  <input
                    type="text"
                    value={kpiOwner}
                    onChange={(e) => setKpiOwner(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-skillora-border">
                <button type="button" onClick={() => setKpiModalOpen(false)} className="btn-ghost text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Save KPI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
