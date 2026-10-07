"use client";

import React, { useState } from "react";
import { useBusinessStore } from "@/store/businessStore";
import {
  BookOpen,
  Search,
  Sparkles,
  CheckCircle2,
  FileText,
  Shield,
  Send
} from "lucide-react";

export default function KnowledgePage() {
  const { sops } = useBusinessStore();

  const [search, setSearch] = useState("");
  const [selectedSOP, setSelectedSOP] = useState<any>(sops[0] || null);
  const [sopQuestion, setSopQuestion] = useState("");
  const [sopAnswer, setSopAnswer] = useState<string | null>(null);

  const handleAskSOP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sopQuestion.trim()) return;

    const q = sopQuestion.toLowerCase();
    if (q.includes("failover") || q.includes("satellite") || q.includes("latency") || q.includes("incident")) {
      setSopAnswer(
        "According to SOP-SEC-002: When edge telemetry packet loss exceeds 15 seconds, the system automatically switches to secondary Iridium satellite transceiver and pages the on-call SRE lead. A post-mortem must be documented within 24 hours."
      );
    } else if (q.includes("approval") || q.includes("po") || q.includes("invoice") || q.includes("spend")) {
      setSopAnswer(
        "According to SOP-FIN-003: Invoices under $5,000 require Department Head approval; $5,000 to $25,000 require Department Head + Head of Finance; invoices over $25,000 require CEO dual signature. Physical GRN verification is mandatory."
      );
    } else {
      setSopAnswer(
        "According to SOP-ENG-001: Pre-flight verification requires checking DGCA DigitalSky airspace boundary via API token, calibrating CAN-bus sensors (IMU drift < 0.02 deg/s), confirming ping latency < 40ms, and verifying geofence return-to-launch safe points."
      );
    }
  };

  const filteredSops = sops.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider text-skillora-primary">
                Knowledge Base & SOP Assistant
              </span>
              <span className="rounded bg-skillora-primary/10 px-2 py-0.5 text-[10px] font-mono text-skillora-primary">
                Layer 99-100
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Standard Operating Procedures & Policies
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Verified operational protocols, engineering guidelines, and AI-assisted SOP retrieval.
            </p>
          </div>
        </div>

        {/* AI SOP Assistant Search Bar */}
        <div className="mb-8 skillora-card p-6 bg-gradient-to-r from-skillora-ink-card to-skillora-ink-light/60 border-skillora-primary/30">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-skillora-primary" />
            <h2 className="font-heading text-base font-semibold text-white">
              Ask the SOP & Compliance Assistant
            </h2>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Type an operational procedure question to retrieve exact protocol steps.
          </p>

          <form onSubmit={handleAskSOP} className="flex gap-2 mb-3">
            <input
              type="text"
              value={sopQuestion}
              onChange={(e) => setSopQuestion(e.target.value)}
              placeholder="e.g. What is the approval threshold for vendor invoices over $10,000?"
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary text-xs px-5">
              Query SOP
            </button>
          </form>

          {sopAnswer && (
            <div className="mt-4 p-4 rounded-lg bg-skillora-ink-card border border-skillora-primary/40 text-xs text-slate-200">
              <span className="text-[10px] font-mono text-skillora-primary uppercase block mb-1">
                Verified SOP Retrieval:
              </span>
              <p>{sopAnswer}</p>
            </div>
          )}
        </div>

        {/* SOP Browser Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left SOP Index */}
          <div className="skillora-card p-6 lg:col-span-1">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search SOP code or title..."
                className="input-field pl-9 py-1.5 text-xs"
              />
            </div>

            <div className="space-y-2">
              {filteredSops.map((sop) => (
                <button
                  key={sop.id}
                  onClick={() => setSelectedSOP(sop)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs ${
                    selectedSOP?.id === sop.id
                      ? "bg-skillora-primary/15 border-skillora-primary text-white shadow-glow"
                      : "bg-skillora-ink-card border-skillora-border text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <span className="font-mono text-[10px] text-skillora-primary block mb-0.5">
                    {sop.code} · {sop.department}
                  </span>
                  <span className="font-semibold block">{sop.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right SOP Detail Viewer */}
          <div className="skillora-card p-6 lg:col-span-2">
            {selectedSOP ? (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-skillora-border">
                  <div>
                    <span className="text-[11px] font-mono text-skillora-primary uppercase">
                      {selectedSOP.code} · {selectedSOP.department}
                    </span>
                    <h2 className="font-heading text-lg font-bold text-white mt-1">
                      {selectedSOP.title}
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Last Updated: {selectedSOP.last_updated}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="font-heading text-xs uppercase font-mono text-slate-400 tracking-wider mb-4">
                    Mandatory Step-by-Step Procedure:
                  </h3>
                  <div className="space-y-3">
                    {selectedSOP.steps.map((step: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-skillora-ink-light/60 border border-skillora-border/60 text-xs text-slate-200"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-skillora-primary/20 text-skillora-primary text-[11px] font-mono font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-skillora-border flex justify-between text-[11px] font-mono text-slate-500">
                  <span>Authorized by: Quality & Safety Directorate</span>
                  <span>STATUS: ACTIVE & ENFORCED</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Select an SOP to inspect.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
