"use client";

import React, { useState } from "react";
import { useBusinessStore } from "@/store/businessStore";
import {
  TrendingUp,
  AlertTriangle,
  Zap,
  Target,
  Plus,
  Shield,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function GrowthPage() {
  const { risks, opportunities, addRisk, addOpportunity } = useBusinessStore();

  const [riskModalOpen, setRiskModalOpen] = useState(false);
  const [riskTitle, setRiskTitle] = useState("");
  const [riskCat, setRiskCat] = useState<"Technical" | "Financial" | "Regulatory" | "Market" | "People">("Technical");
  const [riskProb, setRiskProb] = useState<"High" | "Medium" | "Low">("Medium");
  const [riskImp, setRiskImp] = useState<"High" | "Medium" | "Low">("High");
  const [riskOwner, setRiskOwner] = useState("Ops Lead");
  const [riskMit, setRiskMit] = useState("");

  const [oppModalOpen, setOppModalOpen] = useState(false);
  const [oppTitle, setOppTitle] = useState("");
  const [oppCat, setOppCat] = useState<"Partnership" | "Product Expansion" | "Cost Reduction" | "Enterprise Contract">("Enterprise Contract");
  const [oppVal, setOppVal] = useState("$150,000 ARR");
  const [oppOwner, setOppOwner] = useState("Sales Lead");
  const [oppNext, setOppNext] = useState("");

  const handleAddRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskTitle) return;

    addRisk({
      risk: riskTitle,
      category: riskCat,
      probability: riskProb,
      impact: riskImp,
      owner: riskOwner,
      mitigation: riskMit || "Continuous monitoring and proactive redundancy.",
      status: "Active"
    });

    setRiskTitle("");
    setRiskMit("");
    setRiskModalOpen(false);
  };

  const handleAddOpp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oppTitle) return;

    addOpportunity({
      opportunity: oppTitle,
      category: oppCat,
      potential_value: oppVal,
      probability: "High",
      owner: oppOwner,
      next_step: oppNext || "Initial executive discovery call",
      status: "Evaluating"
    });

    setOppTitle("");
    setOppNext("");
    setOppModalOpen(false);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider text-skillora-primary">
                Growth Planner, Risks & Opportunities
              </span>
              <span className="rounded bg-skillora-primary/10 px-2 py-0.5 text-[10px] font-mono text-skillora-primary">
                Layer 95-98
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Growth Acceleration & Risk Register
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Structured assessment of expansion opportunities, risk probability matrices, and mitigation playbooks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setOppModalOpen(true)} className="btn-primary text-xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Log Opportunity</span>
            </button>
            <button onClick={() => setRiskModalOpen(true)} className="btn-secondary text-xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Log Risk</span>
            </button>
          </div>
        </div>

        {/* Growth Roadmap Milestones */}
        <div className="mb-8 skillora-card p-6 bg-gradient-to-r from-skillora-ink-card to-skillora-ink-light/60 border-skillora-primary/30">
          <h2 className="font-heading text-base font-semibold text-white mb-4">
            AeroSync Dynamics — 6-Month Scale Milestones
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { milestone: "Milestone 1: $1.5M ARR Gate", time: "Q4 2026", status: "82% Achieved", desc: "Close 4 enterprise mining & energy surveillance contracts." },
              { milestone: "Milestone 2: SOC2 Type II Attestation", time: "Oct 2026", status: "Audit Complete", desc: "Third-party auditor review by BSI Group; zero non-conformities." },
              { milestone: "Milestone 3: 500+ Active Fleets Ingested", time: "Q1 2027", status: "In Progress", desc: "Deploy edge gateways to IdeaForge & Throttle OEM batches." },
              { milestone: "Milestone 4: Series A Institutional Round", time: "Q1 2027", status: "Targeting $6M", desc: "Accelerate global expansion across GCC & Southeast Asia." }
            ].map((m) => (
              <div key={m.milestone} className="rounded-lg bg-skillora-ink-card p-4 border border-skillora-border">
                <span className="text-[10px] font-mono text-skillora-primary uppercase">{m.time}</span>
                <h3 className="font-heading text-sm font-bold text-white mt-1">{m.milestone}</h3>
                <span className="text-[11px] font-mono text-emerald-400 block mt-1">{m.status}</span>
                <p className="text-xs text-slate-400 mt-2">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunity Register */}
        <div className="mb-8 skillora-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-400" />
              <h2 className="font-heading text-base font-semibold text-white">
                Enterprise Opportunity Register
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-400">{opportunities.length} Pipeline Tracks</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-skillora-border text-[11px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="pb-3">Opportunity</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Potential Value</th>
                  <th className="pb-3">Probability</th>
                  <th className="pb-3">Owner</th>
                  <th className="pb-3">Next Action</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-skillora-border/50 text-slate-300">
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-semibold text-white">{opp.opportunity}</td>
                    <td className="py-3 text-slate-400">{opp.category}</td>
                    <td className="py-3 font-mono text-emerald-400 font-bold">{opp.potential_value}</td>
                    <td className="py-3 font-mono text-skillora-primary">{opp.probability}</td>
                    <td className="py-3">{opp.owner}</td>
                    <td className="py-3 text-slate-300">{opp.next_step}</td>
                    <td className="py-3">
                      <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                        {opp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Register */}
        <div className="skillora-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <h2 className="font-heading text-base font-semibold text-white">
                Enterprise Risk Register & Mitigation Matrix
              </h2>
            </div>
            <span className="text-xs font-mono text-amber-400">{risks.length} Logged Risks</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-skillora-border text-[11px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="pb-3">Risk Description</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Probability</th>
                  <th className="pb-3">Impact</th>
                  <th className="pb-3">Owner</th>
                  <th className="pb-3">Mitigation Strategy</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-skillora-border/50 text-slate-300">
                {risks.map((risk) => (
                  <tr key={risk.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-semibold text-white">{risk.risk}</td>
                    <td className="py-3 text-slate-400">{risk.category}</td>
                    <td className="py-3 font-mono">
                      <span className={risk.probability === "High" ? "text-red-400" : "text-amber-300"}>
                        {risk.probability}
                      </span>
                    </td>
                    <td className="py-3 font-mono">
                      <span className={risk.impact === "High" ? "text-red-400" : "text-amber-300"}>
                        {risk.impact}
                      </span>
                    </td>
                    <td className="py-3">{risk.owner}</td>
                    <td className="py-3 text-slate-300">{risk.mitigation}</td>
                    <td className="py-3">
                      <span className={`rounded px-2 py-0.5 text-[10px] font-mono ${
                        risk.status === "Mitigated"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-amber-500/15 text-amber-300"
                      }`}>
                        {risk.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Log Opportunity Modal */}
      {oppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md skillora-card p-6 shadow-2xl border-skillora-primary/40">
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Log Growth Opportunity
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Track strategic partnerships, revenue expansions, or cost-saving initiatives.
            </p>

            <form onSubmit={handleAddOpp} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Opportunity Title</label>
                <input
                  type="text"
                  value={oppTitle}
                  onChange={(e) => setOppTitle(e.target.value)}
                  placeholder="e.g. State Electricity Board Drone Inspection RFP"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={oppCat}
                  onChange={(e: any) => setOppCat(e.target.value)}
                  className="input-field"
                >
                  <option value="Enterprise Contract">Enterprise Contract</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Product Expansion">Product Expansion</option>
                  <option value="Cost Reduction">Cost Reduction</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Potential Value</label>
                  <input
                    type="text"
                    value={oppVal}
                    onChange={(e) => setOppVal(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Owner</label>
                  <input
                    type="text"
                    value={oppOwner}
                    onChange={(e) => setOppOwner(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Next Action</label>
                <input
                  type="text"
                  value={oppNext}
                  onChange={(e) => setOppNext(e.target.value)}
                  placeholder="e.g. Submit technical proposal by Friday"
                  className="input-field"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-skillora-border">
                <button type="button" onClick={() => setOppModalOpen(false)} className="btn-ghost text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Register Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Risk Modal */}
      {riskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md skillora-card p-6 shadow-2xl border-amber-500/40">
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Log Business / Operational Risk
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Document risk vectors, probability ratings, and mitigation actions.
            </p>

            <form onSubmit={handleAddRisk} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Risk Description</label>
                <input
                  type="text"
                  value={riskTitle}
                  onChange={(e) => setRiskTitle(e.target.value)}
                  placeholder="e.g. GPS spoofing vulnerability in border survey zone"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={riskCat}
                  onChange={(e: any) => setRiskCat(e.target.value)}
                  className="input-field"
                >
                  <option value="Technical">Technical</option>
                  <option value="Financial">Financial</option>
                  <option value="Regulatory">Regulatory</option>
                  <option value="People">People</option>
                  <option value="Market">Market</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Probability</label>
                  <select
                    value={riskProb}
                    onChange={(e: any) => setRiskProb(e.target.value)}
                    className="input-field"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Impact</label>
                  <select
                    value={riskImp}
                    onChange={(e: any) => setRiskImp(e.target.value)}
                    className="input-field"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Mitigation Plan</label>
                <input
                  type="text"
                  value={riskMit}
                  onChange={(e) => setRiskMit(e.target.value)}
                  placeholder="e.g. Implement multi-constellation RTK + visual odometry fallback"
                  className="input-field"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-skillora-border">
                <button type="button" onClick={() => setRiskModalOpen(false)} className="btn-ghost text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Save Risk Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
