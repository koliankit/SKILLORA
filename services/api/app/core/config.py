import json
import logging
import secrets
from typing import List, Union

from pydantic import AliasChoices, Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

log = logging.getLogger("skillora")

_DEFAULT_SECRET = "change-me-to-a-long-random-secret-in-production"


class Settings(BaseSettings):
    APP_NAME: str = "SKILLORA"
    VERSION: str = "0.2.0"
    ENVIRONMENT: str = "development"  # development | production
    DEBUG: bool = False

    # Auth. SECRET_KEY (render.yaml / Vercel) and JWT_SECRET (.env.example) are both accepted.
    JWT_SECRET: str = Field(default=_DEFAULT_SECRET, validation_alias=AliasChoices("SECRET_KEY", "JWT_SECRET"))
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # CORS: comma-separated list or JSON array
    CORS_ORIGINS: Union[str, List[str]] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    # Optional public URL of the Android build (served by /download-apk)
    APK_URL: str = ""
    APK_PATH: str = ""

    # AI
    LLM_PROVIDER: str = "openai"
    OPENAI_API_KEY: str = ""
    LLM_MODEL: str = "gpt-4o-mini"
    ENABLE_DEMO_MODE: bool = True

    model_config = SettingsConfigDict(env_file=".env", extra="ignore", case_sensitive=False)

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def _parse_origins(cls, v):
        if isinstance(v, str):
            v = v.strip()
            if v.startswith("["):
                try:
                    return json.loads(v)
                except ValueError:
                    pass
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() == "production"


settings = Settings()

if settings.JWT_SECRET == _DEFAULT_SECRET and settings.is_production:
    # Never sign production tokens with a publicly known default.
    settings.JWT_SECRET = secrets.token_urlsafe(48)
    log.warning(
        "SECRET_KEY is not set: using a temporary random key. "
        "Sessions will be invalidated on every restart/instance. Set SECRET_KEY in your host's environment."
    )
