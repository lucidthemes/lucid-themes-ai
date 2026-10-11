from typing import Annotated

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_current_user
from app.db.dependencies import get_read_db

router = APIRouter(prefix="/search", tags=["search"])


class Result(BaseModel):
    name: str
    description: str | None


results = [
    Result(name="Plumbus", description="A multi-purpose household device."),
    Result(name="Portal Gun", description="A portal opening device."),
    Result(name="Meeseeks Box", description="A box that summons a Meeseeks."),
]


@router.get("/")
async def read_search(
    current_user: Annotated[str, Depends(get_current_user)], db: AsyncSession = Depends(get_read_db)
):
    return results
