"""
SKILLORA — Vercel Serverless Entry Point
Both Next.js (frontend) and FastAPI (backend) run in ONE Vercel project.
Vercel routes /api/* here; FastAPI is mounted at /api so all paths match.
"""

import sys
import os

# Add parent directory (services/api/) to Python path so 'app' package is found
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from app.main import app as _api_app

# Wrapper: mount the full FastAPI app at /api to match Vercel's route prefix
app = FastAPI(title="SKILLORA Gateway")
app.mount("/api", _api_app)
