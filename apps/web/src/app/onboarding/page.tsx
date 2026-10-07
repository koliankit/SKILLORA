"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STAGES = ["idea", "validation", "early", "growth", "scale"] as const;
const TEAM_SIZES = ["1", "2-5", "6-20", "21-50", "51+"] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    business_name: "",
    business_type: "",
    industry: "",
    stage: "idea",
    location: "",
    team_size: "1",
    business_model: "",
    target_market: "",
    challenges: "",
    goals: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFinish() {
    // In production: POST to /organizations + business profile
    // Store in local context for demo
    if (typeof window !== "undefined") {
      localStorage.setItem("skillora-onboarding", JSON.stringify(form));
    }
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-skillora-primary/10 border border-skillora-primary/30">
              <span className="font-heading text-lg font-bold text-skillora-primary">N</span>
            </div>
          </Link>
          <p className="font-mono-label">Founder Onboarding</p>
          <h1 className="font-heading text-2xl font-bold text-white mt-2">
            Configure your AI business context
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Step {step} of 3 · Answers personalize recommendations
          </p>
        </div>

        <div className="skillora-card p-8">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Business name
                </label>
                <input
                  className="input-field"
                  value={form.business_name}
                  onChange={(e) => update("business_name", e.target.value)}
                  placeholder="Acme Labs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Business type
                </label>
                <input
                  className="input-field"
                  value={form.business_type}
                  onChange={(e) => update("business_type", e.target.value)}
                  placeholder="SaaS, D2C, Services, Marketplace…"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Industry
                </label>
                <input
                  className="input-field"
                  value={form.industry}
                  onChange={(e) => update("industry", e.target.value)}
                  placeholder="Fintech, Edtech, Healthcare…"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Current stage
                </label>
                <div className="flex flex-wrap gap-2">
                  {STAGES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => update("stage", s)}
                      className={`rounded-lg border px-3 py-1.5 text-xs capitalize transition-colors ${
                        form.stage === s
                          ? "border-skillora-primary bg-skillora-primary/10 text-skillora-primary"
                          : "border-skillora-border text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Location
                </label>
                <input
                  className="input-field"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="Bengaluru, India"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Team size
                </label>
                <div className="flex flex-wrap gap-2">
                  {TEAM_SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => update("team_size", s)}
                      className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                        form.team_size === s
                          ? "border-skillora-primary bg-skillora-primary/10 text-skillora-primary"
                          : "border-skillora-border text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Business model
                </label>
                <input
                  className="input-field"
                  value={form.business_model}
                  onChange={(e) => update("business_model", e.target.value)}
                  placeholder="Subscription, freemium, marketplace take-rate…"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Target market
                </label>
                <input
                  className="input-field"
                  value={form.target_market}
                  onChange={(e) => update("target_market", e.target.value)}
                  placeholder="SMBs in India, Gen-Z consumers…"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Current challenges
                </label>
                <textarea
                  className="input-field min-h-[80px]"
                  value={form.challenges}
                  onChange={(e) => update("challenges", e.target.value)}
                  placeholder="Finding product-market fit, cash flow, hiring…"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Primary goals (next 6–12 months)
                </label>
                <textarea
                  className="input-field min-h-[80px]"
                  value={form.goals}
                  onChange={(e) => update("goals", e.target.value)}
                  placeholder="Reach ₹50L ARR, hire 5 people, launch in 2 cities…"
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="btn-secondary"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="btn-primary"
              >
                Continue
              </button>
            ) : (
              <button type="button" onClick={handleFinish} className="btn-primary">
                Finish & open dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
