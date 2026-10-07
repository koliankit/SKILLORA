"use client";

import React, { useState } from "react";
import { useBusinessStore } from "@/store/businessStore";
import {
  ShieldCheck,
  Calendar,
  AlertCircle,
  FileCheck,
  Plus,
  Lock,
  Clock,
  History
} from "lucide-react";

export default function CompliancePage() {
  const { complianceItems, auditTrail, addComplianceItem } = useBusinessStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [cat, setCat] = useState("Corporate Law (MCA)");
  const [dueDate, setDueDate] = useState("2026-10-15");
  const [owner, setOwner] = useState("Sneha Iyer (Compliance)");
  const [crit, setCrit] = useState<"Critical" | "High" | "Medium" | "Low">("High");
  const [evidence, setEvidence] = useState("");

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addComplianceItem({
      name,
      category: cat,
      due_date: dueDate,
      owner,
      status: "In Progress",
      criticality: crit,
      evidence_ref: evidence || `DOC-${Date.now().toString().slice(-6)}`
    });

    setName("");
    setEvidence("");
    setModalOpen(false);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider text-skillora-primary">
                Compliance, Governance & Audit Trail
              </span>
              <span className="rounded bg-emerald-400/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                Layer 56-60
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Statutory Governance & Audit Vault
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Regulatory compliance filings, evidence references, and tamper-evident administrative audit logs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setModalOpen(true)} className="btn-primary text-xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Add Compliance Item</span>
            </button>
          </div>
        </div>

        {/* Status Score Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Compliance Index</span>
            <p className="font-heading text-3xl font-extrabold text-emerald-400 mt-1">85 / 100</p>
            <span className="text-[11px] text-slate-400 font-mono mt-1">Audit Ready</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Completed Filings</span>
            <p className="font-heading text-3xl font-extrabold text-white mt-1">14 Items</p>
            <span className="text-[11px] text-emerald-400 font-mono mt-1">100% On-Time Record</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">In Progress / Pending</span>
            <p className="font-heading text-3xl font-extrabold text-amber-400 mt-1">2 Items</p>
            <span className="text-[11px] text-slate-400 font-mono mt-1">ROC AOC-4 & GSTR-3B</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Overdue Items</span>
            <p className="font-heading text-3xl font-extrabold text-white mt-1">0 Overdue</p>
            <span className="text-[11px] text-emerald-400 font-mono mt-1">Zero Statutory Penalties</span>
          </div>
        </div>

        {/* Regulatory Items Table */}
        <div className="skillora-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-base font-semibold text-white">
              Active Regulatory & Statutory Requirements
            </h2>
            <span className="text-xs font-mono text-skillora-primary">{complianceItems.length} Tracks</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-skillora-border text-[11px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="pb-3">Requirement</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Statutory Due Date</th>
                  <th className="pb-3">Owner</th>
                  <th className="pb-3">Criticality</th>
                  <th className="pb-3">Evidence Ref</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-skillora-border/50 text-slate-300">
                {complianceItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-semibold text-white">{item.name}</td>
                    <td className="py-3 text-slate-400">{item.category}</td>
                    <td className="py-3 font-mono text-amber-300">{item.due_date}</td>
                    <td className="py-3">{item.owner}</td>
                    <td className="py-3">
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-mono uppercase font-bold ${
                        item.criticality === "Critical"
                          ? "bg-red-500/20 text-red-400"
                          : item.criticality === "High"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-skillora-accent/20 text-skillora-accent"
                      }`}>
                        {item.criticality}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-skillora-primary">{item.evidence_ref}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                        item.status.includes("Compliant")
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-300"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tamper-Evident Administrative Audit Trail */}
        <div className="skillora-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-skillora-primary" />
              <h2 className="font-heading text-base font-semibold text-white">
                Tamper-Evident Audit Trail
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">SOC2 & ISO 27001 Certified Log</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-skillora-border text-[11px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="pb-3">Timestamp (UTC)</th>
                  <th className="pb-3">Actor</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Action Recorded</th>
                  <th className="pb-3">IP Address</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-skillora-border/50 text-slate-300">
                {auditTrail.map((log, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-mono text-slate-400 text-[11px]">
                      {log.timestamp.replace("T", " ").slice(0, 19)}
                    </td>
                    <td className="py-3 font-medium text-white">{log.actor}</td>
                    <td className="py-3 text-slate-400 text-[11px]">{log.role}</td>
                    <td className="py-3 text-slate-200">{log.action}</td>
                    <td className="py-3 font-mono text-slate-400 text-[11px]">{log.ip_address}</td>
                    <td className="py-3">
                      <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-mono text-emerald-400">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Compliance Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md skillora-card p-6 shadow-2xl border-skillora-primary/40">
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Add Statutory Compliance Item
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Track statutory deadlines, regulatory forms and internal proof references.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Requirement / Form Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Form 15CA/15CB Foreign Inward Remittance"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="input-field"
                >
                  <option value="Corporate Law (MCA)">Corporate Law (MCA)</option>
                  <option value="Taxation (GST)">Taxation (GST)</option>
                  <option value="Direct Tax (TDS/Income Tax)">Direct Tax (TDS/Income Tax)</option>
                  <option value="Information Security">Information Security</option>
                  <option value="Civil Aviation (DGCA)">Civil Aviation (DGCA)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Criticality</label>
                  <select
                    value={crit}
                    onChange={(e: any) => setCrit(e.target.value)}
                    className="input-field"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Responsible Owner</label>
                <input
                  type="text"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Evidence / Certificate Ref</label>
                <input
                  type="text"
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
                  placeholder="e.g. DOC-CA-CERT-2026"
                  className="input-field"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-skillora-border">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-ghost text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Save Compliance Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
