import uuid
from typing import Annotated

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_current_user
from app.api.routers.v1.search.schemas import DocumentationIngestJob
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


ingest_job = DocumentationIngestJob(
    id="00000599-a0b0-4ec2-80de-ec7bc5fbe76d",
    type="document",
    status="completed",
    created_at="2026-09-06 11:52:33",
)

ingest_jobs = [
    DocumentationIngestJob(
        id="00000599-a0b0-4ec2-80de-ec7bc5fbe76d",
        type="document",
        status="completed",
        created_at="2026-09-06 11:52:33",
    ),
    DocumentationIngestJob(
        id="00fa61ce-1505-42f1-b119-601663dad1dc",
        type="document",
        status="completed",
        created_at="2026-09-06 11:52:33",
    ),
]


@router.get("/documentation/ingest/jobs", response_model=list[DocumentationIngestJob])
async def read_search_documentation_ingest_jobs(
    _: Annotated[str, Depends(get_current_user)], db: AsyncSession = Depends(get_read_db)
):
    return ingest_jobs


@router.get("/documentation/ingest/job/{job_id}", response_model=DocumentationIngestJob)
async def read_search_documentation_ingest_job(job_id: uuid.UUID):
    return ingest_job
