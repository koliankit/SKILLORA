"""
SKILLORA Copilot & Decision Support Endpoints.
Intent routing, context grounding, explainable cards, and scenario modeling.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

router = APIRouter()


class CopilotQuery(BaseModel):
    query: str
    context_filters: Optional[List[str]] = None


class CopilotResponse(BaseModel):
    intent: str
    answer: str
    observation: str
    evidence: str
    interpretation: str
    recommended_action: str
    confidence: str
    limitation: str


@router.post("/chat", response_model=CopilotResponse)
async def chat_copilot(payload: CopilotQuery):
    q = payload.query.lower()

    if "runway" in q or "burn" in q or "cash" in q:
        return CopilotResponse(
            intent="finance_cash_analysis",
            answer="AeroSync Dynamics currently maintains a cash balance of $1,240,000 USD with a net monthly burn of $48,200. This provides approximately 25.7 months of runway under current expansion trajectories.",
            observation="Net burn reduced by 22% over the last 3 quarters as SaaS recurring revenue approached $118.4K/month.",
            evidence="General Ledger + Bank reconciliation data (Last assessed: September 2026)",
            interpretation="The company has reached near-break-even operational efficiency before considering non-linear fleet scale expenses.",
            recommended_action="Maintain current hiring pacing while accelerating Series A institutional investor conversations for early 2027.",
            confidence="high",
            limitation="Assumes enterprise SaaS gross margin remains above 74%."
        )
    elif "gpu" in q or "cloud" in q or "cost" in q:
        return CopilotResponse(
            intent="operations_infrastructure",
            answer="Cloud GPU infrastructure expenditures reached $21,300 in August/September (19% of total expenses). Anomaly analysis reveals idle cluster capacity during night shifts (01:00-06:00 IST).",
            observation="Telemetry processing clusters remain allocated even when zero active client drone flights are logged.",
            evidence="AWS CloudWatch & GCP billing metrics across 8 spot & on-demand nodes",
            interpretation="Batch inference queues can be spun down dynamically during off-peak hours without impacting mission-critical alerts.",
            recommended_action="Implement dynamic cluster downscaling to reduce monthly cloud expenditure by approximately $3,200 to $4,000.",
            confidence="high",
            limitation="Requires warm-up buffer of 90 seconds for sudden unscheduled emergency flight deployments."
        )
    elif "compliance" in q or "roc" in q or "filing" in q or "gst" in q:
        return CopilotResponse(
            intent="compliance_regulatory",
            answer="AeroSync Dynamics has 2 upcoming statutory deadlines: GSTR-3B monthly return due September 20th, and MCA Form AOC-4/MGT-7 due September 30th.",
            observation="ROC documentation has been audited by external CA; awaiting board digital signature token sign-off.",
            evidence="MCA V3 Portal records & Internal Compliance Checklist (comp_001)",
            interpretation="No penalties will be incurred if board signs off prior to September 18th.",
            recommended_action="Trigger director DSC signature workflow through SKILLORA automated document portal.",
            confidence="high",
            limitation="Subject to MCA government portal server availability during peak quarter-end filing."
        )
    elif "hire" in q or "engineer" in q or "team" in q or "workforce" in q:
        return CopilotResponse(
            intent="workforce_planning",
            answer="Current team headcount is 28 FTEs across Bengaluru and Hyderabad. Key-person vulnerability detected on PX4 firmware and low-latency avionics stack.",
            observation="Vikram Sen authors 91% of firmware PRs; candidate Arjun Menon is currently in final technical rounds.",
            evidence="HR Skills Inventory + GitHub commit telemetry",
            interpretation="Expanding the embedded telemetry engineering group by 2 engineers will protect BVLOS defense deliverable deadlines.",
            recommended_action="Extend offer to candidate Arjun Menon and sponsor AS9100 aerospace certification for internal leads.",
            confidence="medium",
            limitation="Market salary expectations for staff Rust/ROS2 talent currently index 15% above 2024 baselines."
        )
    else:
        return CopilotResponse(
            intent="general_business_analysis",
            answer="SKILLORA has analyzed AeroSync Dynamics across Strategy, Finance, Operations, Workforce, and Compliance. Business Health is rated 84/100 (A- Robust), supported by healthy ARR growth (+11.8% MoM) and 99.88% SLA uptime.",
            observation="Operational metrics are outperforming plan, while market competition from FlytBase and DroneDeploy is intensifying in the automated inspection sector.",
            evidence="Unified Data Hub: 6 interconnected business databases (AeroSync Dynamics 2026)",
            interpretation="The company has successfully transitioned from the 'Operate' stage to 'Measure & Optimize', poised for Series A expansion.",
            recommended_action="Focus on closing the 4 enterprise pipeline pilots currently in security review.",
            confidence="high",
            limitation="Forecasts depend on timely renewal of 3 key mining inspection contracts in Q4."
        )


class ScenarioSimulateRequest(BaseModel):
    scenario: str
    parameters: Optional[Dict[str, Any]] = None


@router.post("/simulate")
async def simulate_scenario(payload: ScenarioSimulateRequest):
    if payload.scenario == "hiring":
        return {
            "scenario": "Hire 5 Senior ML/Robotics Engineers",
            "cost_delta_monthly": 35000,
            "projected_arr_impact": 400000,
            "new_runway_months": 17.8,
            "recommendation": "Feasible; recommend staging hires across 2 cohorts."
        }
    elif payload.scenario == "price_increase":
        return {
            "scenario": "15% Enterprise SaaS Price Increase",
            "cost_delta_monthly": 0,
            "projected_arr_impact": 213000,
            "new_runway_months": 34.0,
            "recommendation": "Low risk; grandfather existing pilot accounts for 6 months."
        }
    else:
        return {
            "scenario": "GPU Spot Instance Pooling",
            "cost_delta_monthly": -3600,
            "projected_arr_impact": 0,
            "new_runway_months": 28.1,
            "recommendation": "Immediate positive ROI with zero impact on SLAs."
        }
