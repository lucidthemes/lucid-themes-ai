from fastapi import APIRouter

from app.api.routers.v1 import search, utils

api_v1_router = APIRouter()

api_v1_router.include_router(search.router)
api_v1_router.include_router(utils.router)
