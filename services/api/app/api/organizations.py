"""
Organization & Workspace endpoints.
Supports solo founder → multi-team enterprise scaling.
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone

router = APIRouter()

_orgs: dict = {}


class CreateOrgRequest(BaseModel):
    name: str = Field(..., min_length=2)
    industry: Optional[str] = None
    stage: Optional[str] = None  # idea | validation | early | growth | scale
    team_size: Optional[str] = None


class OrgResponse(BaseModel):
    id: str
    name: str
    industry: Optional[str]
    stage: Optional[str]
    team_size: Optional[str]
    created_at: str
    member_count: int


@router.post("/", response_model=OrgResponse, status_code=status.HTTP_201_CREATED)
async def create_organization(payload: CreateOrgRequest):
    org_id = f"org_{len(_orgs) + 1:04d}"
    org = {
        "id": org_id,
        "name": payload.name,
        "industry": payload.industry,
        "stage": payload.stage or "idea",
        "team_size": payload.team_size or "1",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "members": [],
    }
    _orgs[org_id] = org
    return OrgResponse(
        id=org_id,
        name=org["name"],
        industry=org["industry"],
        stage=org["stage"],
        team_size=org["team_size"],
        created_at=org["created_at"],
        member_count=0,
    )


@router.get("/{org_id}", response_model=OrgResponse)
async def get_organization(org_id: str):
    org = _orgs.get(org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return OrgResponse(
        id=org["id"],
        name=org["name"],
        industry=org["industry"],
        stage=org["stage"],
        team_size=org["team_size"],
        created_at=org["created_at"],
        member_count=len(org.get("members", [])),
    )
