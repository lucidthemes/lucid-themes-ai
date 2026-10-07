from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Environment
    PROJECT_ENVIRONMENT: str | None = None

    # General
    FRONTEND_URL: str

    # Database
    DATABASE_URL: str
    DIRECT_DATABASE_URL: str

    # Authentication
    JWKS_URL: str | None = None
    JWT_ALGORITHM: str = "ES256"
    JWT_AUDIENCE: str = "authenticated"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
