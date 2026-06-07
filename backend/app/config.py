from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

_PROJECT_ROOT = Path(__file__).resolve().parents[2]
_ENV_FILES = (_PROJECT_ROOT / ".env", Path(".env"))


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=[str(f) for f in _ENV_FILES if f.exists()] or ".env",
        extra="ignore",
    )

    database_url: str = (
        "postgresql+psycopg://homelab:homelab@localhost:5432/homelab_dashboard"
    )
    cors_origins: str = "http://localhost:5173"
    backend_host: str = "0.0.0.0"
    backend_port: int = 8000
    auth_username: str = "admin"
    auth_password: str = "change-me"
    jwt_secret: str = "dev-secret-change-in-production"
    jwt_expire_hours: int = 24
    cookie_secure: bool = False

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]


settings = Settings()
