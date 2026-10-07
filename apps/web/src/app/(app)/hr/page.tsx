"use client";

import React, { useState } from "react";
import { useBusinessStore } from "@/store/businessStore";
import {
  Users,
  UserPlus,
  BrainCircuit,
  Award,
  Search,
  Sparkles,
  MapPin,
  CheckCircle2,
  Briefcase
} from "lucide-react";

export default function HRPage() {
  const { employees, addEmployee } = useBusinessStore();

  const [search, setSearch] = useState("");
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [dept, setDept] = useState("AI & Robotics Engineering");
  const [skillsStr, setSkillsStr] = useState("ROS2, C++, Embedded Linux");
  const [loc, setLoc] = useState("Bengaluru");

  // AI Interview Question Generator state
  const [targetRole, setTargetRole] = useState("Staff Rust & Telemetry Engineer");
  const [seniority, setSeniority] = useState("Senior / Staff");
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([
    "1. How do you handle non-blocking asynchronous I/O in Rust when ingesting thousands of high-frequency UDP telemetry packets without heap allocations?",
    "2. Explain your approach to RTOS task prioritization when dealing with concurrent sensor fusion (IMU, LiDAR) vs safety-critical motor fail-safes.",
    "3. Describe a production incident where an edge system experienced an unhandled network partition. How did your telemetry queue prevent data loss?"
  ]);

  const handleGenerateQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetRole.toLowerCase().includes("infosec") || targetRole.toLowerCase().includes("compliance")) {
      setGeneratedQuestions([
        "1. How would you design continuous evidence collection for SOC2 Type II compliance in a multi-tenant Kubernetes and edge-device environment?",
        "2. Walk through your protocol for rotating asymmetric cryptographic keys across 500+ deployed autonomous edge hardware gateways without downtime.",
        "3. How do you balance DGCA DigitalSky statutory airspace regulations with zero-trust RBAC access policies?"
      ]);
    } else {
      setGeneratedQuestions([
        `1. [${seniority}] For a ${targetRole}, describe your architecture for low-latency telemetry streaming under 40ms SLA constraint.`,
        `2. [${seniority}] How do you implement automated unit and hardware-in-the-loop (HIL) testing for mission-critical robotics firmwares?`,
        `3. [${seniority}] Tell us about a complex trade-off between edge compute power consumption and on-device neural network inference accuracy.`
      ]);
    }
  };

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role) return;

    addEmployee({
      name,
      role,
      department: dept,
      skills: skillsStr.split(",").map((s) => s.trim()).filter(Boolean),
      status: "Active",
      location: loc
    });

    setName("");
    setRole("");
    setOnboardModalOpen(false);
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-wider text-skillora-primary">
                Workforce & Employability Intelligence
              </span>
              <span className="rounded bg-skillora-primary/10 px-2 py-0.5 text-[10px] font-mono text-skillora-primary">
                Layer 47-55
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Team, Skills & Talent Pipeline
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Employee profiles, critical skill inventory, recruitment pipeline and AI interview generator.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setOnboardModalOpen(true)} className="btn-primary text-xs">
              <UserPlus className="h-3.5 w-3.5" />
              <span>Onboard Employee</span>
            </button>
          </div>
        </div>

        {/* Headcount & Department Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Total Team Size</span>
            <p className="font-heading text-3xl font-extrabold text-white mt-1">{employees.length} FTEs</p>
            <span className="text-[11px] text-emerald-400 font-mono mt-1">Zero involuntary turnover</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Engineering & AI</span>
            <p className="font-heading text-3xl font-extrabold text-skillora-primary mt-1">68%</p>
            <span className="text-[11px] text-slate-400 font-mono mt-1">18 specialized engineers</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Office Locations</span>
            <p className="font-heading text-2xl font-bold text-white mt-1">Bengaluru / Hyd</p>
            <span className="text-[11px] text-slate-400 font-mono mt-1">Dual R&D & Test Labs</span>
          </div>

          <div className="metric-tile">
            <span className="text-xs font-mono text-slate-400 uppercase">Hiring Pipeline</span>
            <p className="font-heading text-3xl font-extrabold text-emerald-400 mt-1">2 Offers</p>
            <span className="text-[11px] text-slate-400 font-mono mt-1">Staff Rust & InfoSec</span>
          </div>
        </div>

        {/* Skill Inventory & Critical Gaps */}
        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          {/* Skill Inventory */}
          <div className="skillora-card p-6">
            <h2 className="font-heading text-base font-semibold text-white mb-4">
              Organizational Skill Matrix
            </h2>
            <div className="space-y-3">
              {[
                { skill: "ROS2 & Robotics Middleware", level: "Advanced", coverage: "8 Engineers", crit: "Critical" },
                { skill: "Edge AI & ONNX Runtime", level: "Advanced", coverage: "6 Engineers", crit: "Critical" },
                { skill: "Distributed Systems & Rust", level: "Intermediate", coverage: "4 Engineers", crit: "High" },
                { skill: "ISO 27001 & InfoSec Compliance", level: "Advanced", coverage: "3 Specialists", crit: "High" },
                { skill: "DGCA & Aerospace Regulations", level: "Intermediate", coverage: "2 Specialists", crit: "High" }
              ].map((item) => (
                <div key={item.skill} className="flex items-center justify-between p-3 rounded-lg bg-skillora-ink-card border border-skillora-border">
                  <div>
                    <span className="text-xs font-semibold text-white block">{item.skill}</span>
                    <span className="text-[10px] font-mono text-slate-400">{item.coverage}</span>
                  </div>
                  <div className="text-right">
                    <span className="rounded bg-skillora-primary/10 px-2 py-0.5 text-[10px] font-mono text-skillora-primary">
                      {item.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Skill Gaps */}
          <div className="skillora-card p-6 border-amber-500/30">
            <h2 className="font-heading text-base font-semibold text-white mb-4">
              Identified Strategic Skill Gaps
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-skillora-ink-card p-4 border border-amber-500/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-300">Satellite Telemetry Systems Architect</span>
                  <span className="text-[10px] font-mono text-red-400 uppercase font-bold">Priority: High</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Impact: Required for BVLOS (Beyond Visual Line of Sight) certifications on defense border missions.
                </p>
                <div className="mt-2 rounded bg-skillora-ink-light p-2 border border-skillora-border text-[11px] text-skillora-primary font-medium">
                  ⚡ Recommendation: Recruit 1 Principal Satellite Systems Engineer in Q4.
                </div>
              </div>

              <div className="rounded-lg bg-skillora-ink-card p-4 border border-skillora-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">AS9100 Aerospace Quality Lead</span>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Priority: Medium</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Impact: Expedites commercial aerospace hardware qualification with Tier-1 defense contractors.
                </p>
                <div className="mt-2 rounded bg-skillora-ink-light p-2 border border-skillora-border text-[11px] text-skillora-primary font-medium">
                  ⚡ Recommendation: Sponsor internal certification for 2 senior ops engineers.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Interview Question Generator Tool */}
        <div className="skillora-card p-6 mb-8 border-skillora-primary/40 bg-gradient-to-br from-skillora-ink-card to-skillora-ink-light/70">
          <div className="flex items-center gap-2 mb-2">
            <BrainCircuit className="h-5 w-5 text-skillora-primary" />
            <h2 className="font-heading text-lg font-bold text-white">
              AI Interview Question & Evaluation Generator
            </h2>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Generate role-tailored technical & behavioral interview prompts with objective grading criteria.
          </p>

          <form onSubmit={handleGenerateQuestions} className="grid gap-4 sm:grid-cols-3 mb-6">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Position</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Seniority Level</label>
              <select
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
                className="input-field"
              >
                <option value="Junior / Associate">Junior / Associate</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior / Staff">Senior / Staff</option>
                <option value="Principal / Director">Principal / Director</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" className="btn-primary w-full text-xs">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Generate Questions</span>
              </button>
            </div>
          </form>

          {/* Generated Questions Output */}
          <div className="space-y-3 pt-4 border-t border-skillora-border">
            <span className="text-xs font-mono uppercase text-skillora-primary tracking-wider">
              Tailored Interview Prompts & Rubrics ({targetRole})
            </span>
            {generatedQuestions.map((q, idx) => (
              <div key={idx} className="rounded-lg bg-skillora-ink-card p-3 border border-skillora-border text-xs text-slate-200">
                {q}
              </div>
            ))}
          </div>
        </div>

        {/* Employee Directory */}
        <div className="skillora-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="font-heading text-base font-semibold text-white">
              Employee Directory ({filteredEmployees.length})
            </h2>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search team member..."
                className="input-field pl-9 py-1.5 text-xs"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEmployees.map((emp) => (
              <div key={emp.id} className="rounded-lg border border-skillora-border bg-skillora-ink-card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-white text-sm">{emp.name}</h3>
                    <p className="text-xs text-skillora-primary mt-0.5">{emp.role}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{emp.department}</p>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-mono text-emerald-400">
                    {emp.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {emp.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="rounded bg-skillora-ink-light px-1.5 py-0.5 text-[10px] text-slate-300 border border-skillora-border/60">
                      {skill}
                    </span>
                  ))}
                  {emp.skills.length > 3 && (
                    <span className="text-[10px] text-slate-500 font-mono self-center">
                      +{emp.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-skillora-border/40 pt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {emp.location}
                  </span>
                  <span>Joined {emp.join_date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Onboard Employee Modal */}
      {onboardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md skillora-card p-6 shadow-2xl border-skillora-primary/40">
            <h3 className="font-heading text-lg font-bold text-white mb-2">
              Onboard Team Member
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Add a new team member and register their skill set into the organization inventory.
            </p>

            <form onSubmit={handleOnboardSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Role Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="input-field"
                >
                  <option value="AI & Robotics Engineering">AI & Robotics Engineering</option>
                  <option value="Cloud & Platform Infrastructure">Cloud & Platform Infrastructure</option>
                  <option value="Operations & Hardware Quality">Operations & Hardware Quality</option>
                  <option value="Sales, Enterprise & Marketing">Sales, Enterprise & Marketing</option>
                  <option value="Finance, Legal & People">Finance, Legal & People</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Key Skills (comma-separated)</label>
                <input
                  type="text"
                  value={skillsStr}
                  onChange={(e) => setSkillsStr(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Office Location</label>
                <input
                  type="text"
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-skillora-border">
                <button type="button" onClick={() => setOnboardModalOpen(false)} className="btn-ghost text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Complete Onboarding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
