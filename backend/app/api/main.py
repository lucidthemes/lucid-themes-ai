from fastapi import APIRouter

from app.api.routers.v1 import utils
from app.api.routers.v1.search import router as search_router

api_v1_router = APIRouter()

api_v1_router.include_router(search_router.router)
api_v1_router.include_router(utils.router)
