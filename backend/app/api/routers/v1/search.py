from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.db.dependencies import get_read_db

router = APIRouter(prefix="/search", tags=["search"])


@router.get("/")
async def read_search(
    current_user: Annotated[str, Depends(get_current_user)], db: Session = Depends(get_read_db)
):
    return {"search": "Test search result"}
