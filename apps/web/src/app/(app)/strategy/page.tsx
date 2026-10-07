"use client";

import GrowBar from "@/components/motion/GrowBar";
import React from "react";
import {
  Compass,
  Target,
  Layers,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Users,
  Shield,
  Zap
} from "lucide-react";

export default function StrategyPage() {
  const canvasSections = [
    {
      title: "1. Key Partners",
      items: [
        "Cloud Providers (AWS & GCP Cloud credits)",
        "Drone Airframe OEMs & Avionics Suppliers",
        "DGCA DigitalSky regulatory technical bodies",
        "IISc Robotics Research Labs"
      ]
    },
    {
      title: "2. Key Activities",
      items: [
        "Continuous sub-40ms telemetry engine optimization",
        "Enterprise security hardening & SOC2 compliance",
        "Hardware edge gateway QA & OTA updates",
        "High-touch client onboarding & pilot integration"
      ]
    },
    {
      title: "3. Value Propositions",
      highlight: true,
      items: [
        "Sub-40ms real-time AI telemetry across edge & cloud",
        "Predictive motor and sensor fault detection before flight failure",
        "Hardware-agnostic pane of glass controlling heterogeneous fleets",
        "Automated DGCA & ISO 27001 audit recording"
      ]
    },
    {
      title: "4. Customer Relationships",
      items: [
        "Dedicated Solutions Architect & 24/7 SLA Support",
        "Executive Quarterly Business Reviews (QBRs)",
        "Self-service Telemetry Portal & Developer Sandbox"
      ]
    },
    {
      title: "5. Customer Segments",
      highlight: true,
      items: [
        "Tier-1 Mining & Infrastructure Survey Enterprises",
        "Defense & Border Surveillance Drone Contractors",
        "Renewable Solar & Wind Farm Inspection Providers",
        "Autonomous Agricultural Logistics Fleets"
      ]
    },
    {
      title: "6. Key Resources",
      items: [
        "Proprietary telemetry compression algorithms",
        "Edge AI model registry & on-device runtime",
        "Specialized robotics, Rust & CV engineering talent",
        "Cloud GPU cluster for fleet anomaly retraining"
      ]
    },
    {
      title: "7. Channels",
      items: [
        "Direct Enterprise B2B Sales",
        "OEM Drone Manufacturer Bundling",
        "Systems Integrator Alliances (L&T, Tata)",
        "Developer API & Free Sandbox Tier"
      ]
    },
    {
      title: "8. Cost Structure",
      items: [
        "R&D & Engineering Compensation (55.8%)",
        "Cloud & GPU Infrastructure (19.0%)",
        "Enterprise Marketing & Trade Events (11.4%)",
        "Hardware Gateway Assembly & Logistics (8.6%)",
        "Regulatory Certifications & Legal (5.2%)"
      ]
    },
    {
      title: "9. Revenue Streams",
      highlight: true,
      items: [
        "Enterprise Cloud SaaS ($48k - $180k / enterprise)",
        "Per-Device Telemetry Metering ($35/drone/mo)",
        "Hardware Gateway Leases ($1,200/unit/yr)",
        "Custom Edge AI Training Engagements ($25,000/deal)"
      ]
    }
  ];

  const okrs = [
    {
      id: "okr_1",
      objective: "Scale ARR to $1.5M with sustainable gross margins exceeding 75%",
      owner: "Ankit Sharma (CEO)",
      progress: 82,
      keyResults: [
        { kr: "Close 4 new enterprise contracts valued at >= $60k ARR", current: "3 / 4 Deals", pct: 75 },
        { kr: "Reduce cloud GPU compute unit cost per fleet telemetry hour by 15%", current: "12.8% Saved", pct: 85 },
        { kr: "Expand net revenue retention (NRR) to > 120%", current: "124% NRR", pct: 100 }
      ]
    },
    {
      id: "okr_2",
      objective: "Complete SOC2 Type II and AS9100 Enterprise Certifications",
      owner: "Sneha Iyer (Compliance)",
      progress: 90,
      keyResults: [
        { kr: "Complete 3-month observation window with zero critical audit findings", current: "Completed", pct: 100 },
        { kr: "Automate 100% of RBAC access logs and key rotations", current: "100% Automated", pct: 100 },
        { kr: "Obtain final attestation report from accredited third-party auditor", current: "Final Review", pct: 70 }
      ]
    }
  ];

  const competitors = [
    {
      name: "AeroSync Dynamics (Us)",
      latency: "< 35 ms (Edge Native)",
      hardware: "Hardware Agnostic (Any Drone)",
      compliance: "Built-in DGCA & ISO 27001",
      pricing: "$48k - $120k / yr",
      us_advantage: "Leader in edge offline AI & Indian telecom tolerance"
    },
    {
      name: "DroneDeploy Enterprise",
      latency: "150 - 300 ms (Cloud Only)",
      hardware: "Select Supported Drones",
      compliance: "FAA Focused",
      pricing: "$150k+ / yr",
      us_advantage: "We are 40% cheaper with real-time edge streaming"
    },
    {
      name: "Skydio Fleet Manager",
      latency: "Sub-50 ms",
      hardware: "Locked to Skydio Hardware Only",
      compliance: "US DoD Blue UAS",
      pricing: "Very High (Proprietary)",
      us_advantage: "We work with any Indian or global drone airframe"
    },
    {
      name: "FlytBase",
      latency: "80 - 120 ms",
      hardware: "Drone-in-a-box focus",
      compliance: "General",
      pricing: "$30k - $80k / yr",
      us_advantage: "We provide complete enterprise operating layer (finance, HR, compliance)"
    }
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider text-skillora-primary">
                Strategy, Business Model & OKRs
              </span>
              <span className="rounded bg-skillora-primary/10 px-2 py-0.5 text-[10px] font-mono text-skillora-primary">
                Layer 21-29
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Strategic Planning & Market Positioning
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Business Model Canvas, quarterly OKR tracking and competitive differentiation matrix.
            </p>
          </div>
        </div>

        {/* Business Model Canvas (9-Box Grid) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-lg font-bold text-white">
                Interactive Business Model Canvas
              </h2>
              <p className="text-xs text-slate-400">
                Core commercial architecture for AeroSync Dynamics enterprise fleet operations
              </p>
            </div>
            <span className="text-xs font-mono text-skillora-primary">9 Building Blocks</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {canvasSections.map((sec) => (
              <div
                key={sec.title}
                className={`rounded-xl p-5 border transition-all ${
                  sec.highlight
                    ? "bg-skillora-ink-card border-skillora-primary/50 shadow-glow"
                    : "bg-skillora-ink-card/80 border-skillora-border"
                }`}
              >
                <h3 className={`font-heading text-sm font-semibold mb-3 ${sec.highlight ? "text-skillora-primary" : "text-white"}`}>
                  {sec.title}
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {sec.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-skillora-primary text-sm leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic OKRs Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-lg font-bold text-white">
                Quarterly Strategic Objectives & Key Results (OKRs)
              </h2>
              <p className="text-xs text-slate-400">Q3–Q4 2026 executive execution focus</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">2 Active OKRs</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {okrs.map((okr) => (
              <div key={okr.id} className="skillora-card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-skillora-primary">
                      Objective · Owner: {okr.owner}
                    </span>
                    <h3 className="font-heading text-base font-bold text-white mt-1">
                      {okr.objective}
                    </h3>
                  </div>
                  <span className="font-heading text-xl font-bold text-emerald-400">
                    {okr.progress}%
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-skillora-ink-light overflow-hidden mb-5">
                  <GrowBar pct={okr.progress} className="h-full rounded-full bg-gradient-to-r from-skillora-primary to-emerald-400" />
                </div>

                <div className="space-y-3 pt-3 border-t border-skillora-border">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Key Results</span>
                  {okr.keyResults.map((kr, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>{kr.kr}</span>
                        <span className="font-mono text-skillora-primary">{kr.current}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-skillora-ink-light overflow-hidden">
                        <GrowBar pct={kr.pct} className="h-full rounded-full bg-skillora-primary/80" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Intelligence Matrix */}
        <div className="skillora-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-base font-semibold text-white">
                Competitive Positioning & Moat Analysis
              </h2>
              <p className="text-xs text-slate-400">
                Ground truth comparison vs global and regional solutions
              </p>
            </div>
            <span className="text-xs font-mono text-skillora-primary">Updated September 2026</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-skillora-border text-[11px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="pb-3">Platform</th>
                  <th className="pb-3">Telemetry Latency</th>
                  <th className="pb-3">Hardware Flexibility</th>
                  <th className="pb-3">Compliance Integration</th>
                  <th className="pb-3">Enterprise Pricing</th>
                  <th className="pb-3">Our Competitive Moat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-skillora-border/50 text-slate-300">
                {competitors.map((comp, idx) => (
                  <tr key={comp.name} className={idx === 0 ? "bg-skillora-primary/10 font-medium" : "hover:bg-white/5"}>
                    <td className="py-3 text-white font-semibold flex items-center gap-1.5">
                      {idx === 0 && <span className="text-skillora-primary">★</span>}
                      {comp.name}
                    </td>
                    <td className="py-3 font-mono">{comp.latency}</td>
                    <td className="py-3">{comp.hardware}</td>
                    <td className="py-3">{comp.compliance}</td>
                    <td className="py-3 font-mono">{comp.pricing}</td>
                    <td className="py-3 text-skillora-primary">{comp.us_advantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
