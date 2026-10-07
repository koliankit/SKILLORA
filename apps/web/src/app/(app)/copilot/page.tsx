"use client";

import React, { useState } from "react";
import { useBusinessStore } from "@/store/businessStore";
import {
  Bot,
  Sparkles,
  Send,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Cpu,
  ShieldAlert,
  HelpCircle,
  Clock
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "copilot";
  timestamp: string;
  text?: string;
  card?: {
    intent: string;
    answer: string;
    observation: string;
    evidence: string;
    interpretation: string;
    action: string;
    confidence: "high" | "medium" | "low";
    limitation: string;
  };
}

export default function CopilotPage() {
  const { organization, financials, healthScore, employees, workflows, complianceItems } = useBusinessStore();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg_welcome",
      sender: "copilot",
      timestamp: "Just now",
      card: {
        intent: "system_orientation",
        answer: `Hello Ankit! I am SKILLORA Copilot, your intelligent business operating partner grounded in real data from ${organization.name}.`,
        observation: "Current Business Health is 84/100 (A- Robust), with $1.42M ARR and 25.7 months of cash runway.",
        evidence: "6 connected organizational databases: Ledger, Telemetry Mesh, HR Matrix, MCA Compliance, Pipeline CRM.",
        interpretation: "The enterprise has achieved near-break-even operational efficiency. Q4 priority is scaling enterprise client POCs.",
        action: "Select any domain inquiry below or type a custom strategic question.",
        confidence: "high",
        limitation: "All recommendations are data-grounded and explainable."
      }
    }
  ]);

  const presetQuestions = [
    "What is our current cash runway and net burn?",
    "How can we reduce our $21.3k cloud GPU expenditure?",
    "Are there any pending ROC statutory filings?",
    "Simulate hiring 5 Senior AI/Robotics Engineers",
    "Identify key-person risks in engineering team",
    "Generate weekly executive review summary"
  ];

  const handleAsk = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: queryText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const q = queryText.toLowerCase();

    // Generate grounded response
    setTimeout(() => {
      let card: any;

      if (q.includes("runway") || q.includes("burn") || q.includes("cash")) {
        card = {
          intent: "finance_cash_analysis",
          answer: `AeroSync Dynamics maintains a cash reserve of $1,240,000 USD with a net monthly burn of $48,200. This provides approximately 25.7 months of runway under current expansion trajectories.`,
          observation: "Net burn reduced by 22% over the last 3 quarters as SaaS recurring revenue approached $118.4K/month.",
          evidence: "General Ledger + Bank reconciliation data (Last assessed: September 2026)",
          interpretation: "The company has reached near-break-even operational efficiency before considering non-linear fleet scale expenses.",
          action: "Maintain current hiring pacing while accelerating Series A institutional investor conversations for early 2027.",
          confidence: "high",
          limitation: "Assumes enterprise SaaS gross margin remains above 74%."
        };
      } else if (q.includes("gpu") || q.includes("cloud") || q.includes("cost")) {
        card = {
          intent: "operations_infrastructure",
          answer: `Cloud GPU infrastructure expenditures reached $21,300 in August/September (19% of total expenses). Anomaly analysis reveals idle cluster capacity during night shifts (01:00-06:00 IST).`,
          observation: "Telemetry processing clusters remain allocated even when zero active client drone flights are logged.",
          evidence: "AWS CloudWatch & GCP billing metrics across 8 spot & on-demand nodes",
          interpretation: "Batch inference queues can be spun down dynamically during off-peak hours without impacting mission-critical alerts.",
          action: "Implement dynamic cluster downscaling to reduce monthly cloud expenditure by approximately $3,200 to $4,000.",
          confidence: "high",
          limitation: "Requires warm-up buffer of 90 seconds for sudden unscheduled emergency flight deployments."
        };
      } else if (q.includes("compliance") || q.includes("roc") || q.includes("filing") || q.includes("gst")) {
        card = {
          intent: "compliance_regulatory",
          answer: `AeroSync Dynamics has 2 upcoming statutory deadlines: GSTR-3B monthly return due September 20th, and MCA Form AOC-4/MGT-7 due September 30th.`,
          observation: "ROC documentation has been audited by external CA; awaiting board digital signature token sign-off.",
          evidence: "MCA V3 Portal records & Internal Compliance Checklist (comp_001)",
          interpretation: "No penalties will be incurred if board signs off prior to September 18th.",
          action: "Trigger director DSC signature workflow through SKILLORA automated document portal.",
          confidence: "high",
          limitation: "Subject to MCA government portal server availability during peak quarter-end filing."
        };
      } else if (q.includes("hire") || q.includes("engineer") || q.includes("team") || q.includes("workforce")) {
        card = {
          intent: "workforce_planning",
          answer: `Current team headcount is 28 FTEs across Bengaluru and Hyderabad. Key-person vulnerability detected on PX4 firmware and low-latency avionics stack.`,
          observation: "Vikram Sen authors 91% of firmware PRs; candidate Arjun Menon is currently in final technical rounds.",
          evidence: "HR Skills Inventory + GitHub commit telemetry",
          interpretation: "Expanding the embedded telemetry engineering group by 2 engineers will protect BVLOS defense deliverable deadlines.",
          action: "Extend offer to candidate Arjun Menon and sponsor AS9100 aerospace certification for internal leads.",
          confidence: "medium",
          limitation: "Market salary expectations for staff Rust/ROS2 talent currently index 15% above 2024 baselines."
        };
      } else if (q.includes("weekly") || q.includes("review") || q.includes("summary")) {
        card = {
          intent: "executive_briefing",
          answer: `Weekly Executive Briefing: ARR reached $1.42M (+11.8% MoM), Mission SLA maintained at 99.88%, and zero critical telemetry incidents were recorded.`,
          observation: "1,842 autonomous flights completed; enterprise sales pipeline added $180k in weighted proposal volume.",
          evidence: "Executive KPI telemetry & sales pipeline records for week ending 12 Sep 2026",
          interpretation: "Operational execution is strong; sales pilot conversion velocity is the critical path to Q4 targets.",
          action: "Review MCA ROC filing with board members by Friday and clear procurement roadblock on edge hardware components.",
          confidence: "high",
          limitation: "Pipeline weighted forecasts depend on timely client procurement committee sign-offs."
        };
      } else {
        card = {
          intent: "general_business_analysis",
          answer: `SKILLORA has cross-referenced your inquiry with AeroSync Dynamics operational and financial data. Business Health is rated 84/100 (A- Robust), supported by healthy ARR growth and 99.88% SLA uptime.`,
          observation: "Operating metrics are outperforming initial business plan targets across all core stages.",
          evidence: "Unified Enterprise Data Hub: 6 interconnected databases (AeroSync Dynamics 2026)",
          interpretation: "The company has established strong product-market fit in enterprise robotics infrastructure.",
          action: "Prioritize customer retention and accelerate SOC-2 Type II audit completion.",
          confidence: "high",
          limitation: "Forecast assumptions assume stable market pricing for industrial telemetry."
        };
      }

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: "copilot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        card
      };

      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 450);
  };

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 flex flex-col h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between pb-3 border-b border-skillora-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-skillora-primary/15 border border-skillora-primary/40 shadow-glow">
              <Bot className="h-5 w-5 text-skillora-primary" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                SKILLORA Copilot
                <span className="rounded-full bg-skillora-primary/20 px-2 py-0.5 text-[10px] font-mono text-skillora-primary">
                  Decision Operating Layer
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Grounded in <strong className="text-slate-200">{organization.name}</strong> verified data · Explainable AI
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Context Engine Connected
          </span>
        </div>

        {/* Preset Prompt Chips */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {presetQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleAsk(q)}
              className="rounded-full border border-skillora-border bg-skillora-ink-card px-3 py-1 text-xs text-slate-300 hover:border-skillora-primary hover:text-skillora-primary transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Message Scrollable Container */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "user" ? (
                <div className="rounded-xl bg-skillora-primary text-skillora-ink font-medium px-4 py-2.5 max-w-lg text-sm shadow-md">
                  {msg.text}
                </div>
              ) : (
                <div className="w-full max-w-2xl ai-insight-card space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-skillora-border/60">
                    <span className="text-[10px] font-mono text-skillora-primary uppercase tracking-wider">
                      INTENT: {msg.card?.intent}
                    </span>
                    <span className="rounded bg-skillora-primary/10 px-2 py-0.5 text-[9px] font-mono text-skillora-primary capitalize">
                      Confidence: {msg.card?.confidence}
                    </span>
                  </div>

                  <p className="text-sm text-slate-100 font-medium leading-relaxed">
                    {msg.card?.answer}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-300 bg-skillora-ink-light/60 p-3 rounded-lg border border-skillora-border/60">
                    <p>
                      <strong className="text-white">Observation:</strong> {msg.card?.observation}
                    </p>
                    <p>
                      <strong className="text-white">Evidence:</strong> {msg.card?.evidence}
                    </p>
                    <p>
                      <strong className="text-white">Analysis:</strong> {msg.card?.interpretation}
                    </p>
                  </div>

                  <div className="rounded-lg bg-skillora-primary/10 border border-skillora-primary/30 p-3">
                    <p className="text-xs text-skillora-primary font-semibold">
                      ⚡ <strong>Recommended Next Action:</strong> {msg.card?.action}
                    </p>
                    {msg.card?.limitation && (
                      <p className="text-[10px] text-slate-400 font-mono mt-1 italic">
                        Limitation: {msg.card.limitation}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="skillora-card p-4 flex items-center gap-2 text-xs text-slate-400">
                <Sparkles className="h-4 w-4 text-skillora-primary animate-spin" />
                <span>SKILLORA is querying connected business databases and synthesizing explainable recommendations...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleAsk(input); }} className="mt-2 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about finance, operations, compliance, workforce or strategy..."
            className="input-field flex-1"
          />
          <button type="submit" disabled={loading || !input.trim()} className="btn-primary px-5">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
