"""
Authentication endpoints: sign-up, login, logout and current user.
Demo store is in-memory (resets on restart / serverless cold start). Swap `_users`
for a database table before real users depend on it.
"""

import base64
import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional

import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, EmailStr, Field

from app.core.config import settings

router = APIRouter()
_bearer = HTTPBearer(auto_error=False)

# scrypt: memory-hard, in the standard library, per-user random salt.
_N, _R, _P = 2**14, 8, 1


def get_password_hash(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=_N, r=_R, p=_P, dklen=32)
    return "scrypt$" + base64.b64encode(salt).decode() + "$" + base64.b64encode(digest).decode()


def verify_password(plain_password: str, stored: str) -> bool:
    try:
        _, salt_b64, digest_b64 = stored.split("$")
        salt, expected = base64.b64decode(salt_b64), base64.b64decode(digest_b64)
        actual = hashlib.scrypt(plain_password.encode(), salt=salt, n=_N, r=_R, p=_P, dklen=32)
        return hmac.compare_digest(actual, expected)
    except Exception:
        return False


# Demo accounts exist only while ENABLE_DEMO_MODE is on.
_users: dict = {}
if settings.ENABLE_DEMO_MODE:
    _users["ankit@aerosync.ai"] = {
        "id": "usr_0001",
        "email": "ankit@aerosync.ai",
        "full_name": "Ankit Sharma",
        "hashed_password": get_password_hash("Skillora@2026"),
        "roles": ["founder", "owner", "admin"],
        "organization_name": "AeroSync Dynamics Pvt Ltd",
        "created_at": "2024-03-15T09:30:00Z",
    }


class SignUpRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str = Field(..., min_length=2)
    organization_name: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: dict


class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    roles: list[str]


_DUMMY_HASH = get_password_hash("not-a-real-password")


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(payload: SignUpRequest):
    email = payload.email.lower()
    if email in _users:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = f"usr_{len(_users) + 1:04d}"
    hashed = get_password_hash(payload.password)

    user = {
        "id": user_id,
        "email": email,
        "full_name": payload.full_name,
        "hashed_password": hashed,
        "roles": ["founder"],
        "organization_name": payload.organization_name,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    _users[email] = user

    token = create_access_token({"sub": user_id, "email": email, "roles": user["roles"]})
    return TokenResponse(
        access_token=token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user={
            "id": user_id,
            "email": email,
            "full_name": payload.full_name,
            "roles": user["roles"],
        },
    )


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest):
    email = payload.email.lower()
    user = _users.get(email)
    # Always run one hash check so response time does not reveal whether the email exists.
    ok = verify_password(payload.password, user["hashed_password"] if user else _DUMMY_HASH)
    if not user or not ok:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(
        {"sub": user["id"], "email": email, "roles": user["roles"]}
    )
    return TokenResponse(
        access_token=token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user={
            "id": user["id"],
            "email": email,
            "full_name": user["full_name"],
            "roles": user["roles"],
        },
    )


@router.post("/logout")
async def logout():
    # Client discards token; server-side blacklist can be added later
    return {"message": "Logged out successfully"}


def current_user(creds: Optional[HTTPAuthorizationCredentials] = Depends(_bearer)) -> dict:
    if creds is None:
        raise HTTPException(status_code=401, detail="Authentication required")
    try:
        claims = jwt.decode(creds.credentials, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    user = _users.get(claims.get("email", ""))
    if not user:
        raise HTTPException(status_code=401, detail="Account not found")
    return user


@router.get("/me", response_model=UserResponse)
async def me(user: dict = Depends(current_user)):
    return UserResponse(id=user["id"], email=user["email"], full_name=user["full_name"], roles=user["roles"])
