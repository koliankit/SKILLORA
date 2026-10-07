"""
Business domain endpoints for SKILLORA:
- Organization & Business Profile
- Business Health Score (Explainable)
- Financials & Cash Runway
- Operations & KPIs & Workflows
- Workforce & Employability
- Statutory Compliance & Audit Trail
- Grounded AI Insights
"""

import os
import json
from pathlib import Path
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional, List, Any

router = APIRouter()

# Load seed data from disk
_API_ROOT = Path(__file__).resolve().parents[2]  # services/api
_env_seed = os.environ.get("SEED_DIR", "").strip()
_candidates = ([Path(_env_seed)] if _env_seed else []) + [_API_ROOT / "data" / "seed"]
SEED_DIR = next((d for d in _candidates if d.is_dir()), _API_ROOT / "data" / "seed")

def load_seed_json(filename: str, default: Any):
    filepath = SEED_DIR / filename
    if filepath.exists():
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return default

# In-memory stores initialized from seed files
_company_data = load_seed_json("company_data.json", {})
_financials_data = load_seed_json("financials_data.json", {})
_operations_data = load_seed_json("operations_data.json", {})
_workforce_data = load_seed_json("workforce_data.json", {})
_compliance_data = load_seed_json("compliance_data.json", {})
_strategy_data = load_seed_json("strategy_data.json", {})
_insights_data = load_seed_json("insights_data.json", [])


@router.get("/profile")
async def get_business_profile():
    return _company_data.get("organization", {})


@router.get("/health-score")
async def get_health_score():
    return _company_data.get("health_score", {})


@router.get("/financials")
async def get_financials():
    return _financials_data


class AddTransactionRequest(BaseModel):
    month: str
    revenue: float
    expenses: float


@router.post("/financials/transactions")
async def add_transaction(payload: AddTransactionRequest):
    net_profit = payload.revenue - payload.expenses
    burn = abs(net_profit) if net_profit < 0 else 0
    new_entry = {
        "month": payload.month,
        "revenue": payload.revenue,
        "expenses": payload.expenses,
        "net_profit": net_profit,
        "burn": burn
    }
    monthly = _financials_data.setdefault("monthly_financials_2025_2026", [])
    monthly.append(new_entry)
    _financials_data["summary"]["monthly_recurring_revenue"] = payload.revenue
    _financials_data["summary"]["annual_recurring_revenue"] = payload.revenue * 12
    return {"status": "success", "entry": new_entry}


@router.get("/operations")
async def get_operations():
    return _operations_data


class AddKPIRequest(BaseModel):
    name: str
    category: str
    current_value: float
    target_value: float
    unit: str
    trend: str = "up"
    owner: str
    frequency: str = "monthly"


@router.post("/operations/kpis")
async def add_kpi(payload: AddKPIRequest):
    new_kpi = payload.dict()
    new_kpi["id"] = f"kpi_{len(_operations_data.get('kpis', [])) + 1:03d}"
    new_kpi["status"] = "on_track"
    new_kpi["change_pct"] = 0.0
    _operations_data.setdefault("kpis", []).insert(0, new_kpi)
    return new_kpi


@router.get("/workforce")
async def get_workforce():
    return _workforce_data


@router.get("/compliance")
async def get_compliance():
    return _compliance_data


@router.get("/strategy")
async def get_strategy():
    return _strategy_data


@router.get("/insights")
async def get_insights():
    return _insights_data


@router.post("/seed/reset")
async def reset_seed_data():
    global _company_data, _financials_data, _operations_data, _workforce_data, _compliance_data, _strategy_data, _insights_data
    _company_data = load_seed_json("company_data.json", {})
    _financials_data = load_seed_json("financials_data.json", {})
    _operations_data = load_seed_json("operations_data.json", {})
    _workforce_data = load_seed_json("workforce_data.json", {})
    _compliance_data = load_seed_json("compliance_data.json", {})
    _strategy_data = load_seed_json("strategy_data.json", {})
    _insights_data = load_seed_json("insights_data.json", [])
    return {"status": "reset_successful", "organization": _company_data.get("organization", {}).get("name")}
