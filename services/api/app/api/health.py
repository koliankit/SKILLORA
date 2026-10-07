from fastapi import APIRouter
from datetime import datetime, timezone

router = APIRouter()


@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "skillora-api",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "0.2.0",
    }


@router.get("/ready")
async def readiness():
    # In production: check DB, Redis, etc.
    return {"ready": True}
