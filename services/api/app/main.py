"""
SKILLORA — FastAPI Application Entry Point
AI-powered Entrepreneurship & Enterprise Management Platform
"""

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pathlib import Path

from app.core.config import settings
from app.api import auth, organizations, health, business, ai_copilot


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("SKILLORA API starting...")
    yield
    # Shutdown
    print("SKILLORA API shutting down...")


app = FastAPI(
    title="SKILLORA",
    description="AI-powered Entrepreneurship & Enterprise Management Platform",
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(health.router, tags=["Health"])
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(organizations.router, prefix="/organizations", tags=["Organizations"])
app.include_router(business.router, prefix="/business", tags=["Business"])
app.include_router(ai_copilot.router, prefix="/ai", tags=["AI Copilot"])


@app.get("/")
async def root():
    return {
        "product": "SKILLORA",
        "tagline": "Build smarter. Manage better. Grow with AI.",
        "version": settings.VERSION,
        "status": "operational",
        "apk_download": "/download-apk",
    }


@app.get("/download-apk")
async def download_apk():
    """Redirects to APK_URL, or serves the file at APK_PATH. Returns 404 when no build is configured."""
    if settings.APK_URL:
        return RedirectResponse(settings.APK_URL)
    candidates = [Path(settings.APK_PATH)] if settings.APK_PATH else []
    candidates.append(Path(__file__).resolve().parents[3] / "skillora-mobile.apk")
    for p in candidates:
        if p.is_file():
            return FileResponse(
                path=str(p),
                filename="skillora-mobile.apk",
                media_type="application/vnd.android.package-archive",
            )
    raise HTTPException(status_code=404, detail="No Android build is published yet. Build one with build-apk, then set APK_URL.")
