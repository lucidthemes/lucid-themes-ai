from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.main import api_v1_router
from app.core.config import settings

app = FastAPI(
    title="Lucid Themes AI",
    summary="Backend API used for the Lucid Themes AI frontend",
    version="0.1.0",
    openapi_url="/api/v1/openapi.json",
)

frontend_url = settings.FRONTEND_URL

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello from FastAPI"}


app.include_router(api_v1_router, prefix="/api/v1")
