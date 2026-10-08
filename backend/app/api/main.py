from fastapi import APIRouter

from app.api.v1 import search

api_v1_router = APIRouter()

api_v1_router.include_router(search.router)
