import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, Form, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_current_user
from app.db.dependencies import get_read_db, get_write_db

from .schemas import (
    DocumentationIngestJobNewChunksCreate,
    DocumentationIngestJobNewChunksResponse,
    DocumentationIngestJobNewDocumentCreate,
    DocumentationIngestJobNewEmbeddingsCreate,
    DocumentationIngestJobNewResponse,
    DocumentationIngestJobNewWebpageCreate,
    DocumentationIngestJobResponse,
    DocumentationIngestJobsResponse,
)
from .service import (
    documentation_ingest_job_chunk_split_markdown,
    documentation_ingest_job_chunk_split_text,
)

router = APIRouter(prefix="/search", tags=["search"])


# class Result(BaseModel):
#     name: str
#     description: str | None


# results = [
#     Result(name="Plumbus", description="A multi-purpose household device."),
#     Result(name="Portal Gun", description="A portal opening device."),
#     Result(name="Meeseeks Box", description="A box that summons a Meeseeks."),
# ]


# @router.get("/")
# async def read_search(
#     current_user: Annotated[str, Depends(get_current_user)], db: AsyncSession = Depends(get_read_db)
# ):
#     return results


# ingest_job = DocumentationIngestJob(
#     id="00000599-a0b0-4ec2-80de-ec7bc5fbe76d",
#     name="New ingest job 1!",
#     type="document",
#     status="completed",
#     created_at="2026-09-06 11:52:33",
#     updated_at="2026-09-06 11:52:33",
# )

# ingest_jobs = [
#     DocumentationIngestJobsResponse(
#         id="00000599-a0b0-4ec2-80de-ec7bc5fbe76d",
#         name="New ingest job 1!",
#         # source=[
#         #     type='document',
#         # ],
#         status="completed",
#         created_at="2026-09-06 11:52:33",
#         updated_at="2026-09-06 11:52:33",
#     ),
#     DocumentationIngestJobsResponse(
#         id="00fa61ce-1505-42f1-b119-601663dad1dc",
#         name="New ingest job 2!",
#         type="document",
#         status="completed",
#         created_at="2026-09-06 11:52:33",
#         updated_at="2026-09-06 11:52:33",
#     ),
# ]


@router.get("/documentation/ingest/jobs", response_model=DocumentationIngestJobsResponse)
async def read_search_documentation_ingest_jobs(
    _: Annotated[str, Depends(get_current_user)], db: AsyncSession = Depends(get_read_db)
) -> DocumentationIngestJobsResponse:
    return DocumentationIngestJobsResponse(
        data=[
            {
                "id": "9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3",
                "name": "Test ingest job 1",
                "source": {
                    "type": "document",
                    "file_name": "some-pdf-file-here.pdf",
                },
                "status": "pending",
                "created_at": "2026-09-06 11:52:33",
                "updated_at": "2026-09-06 11:52:33",
            },
            {
                "id": "00fa61ce-1505-42f1-b119-601663dad1dc",
                "name": "Test ingest job 2",
                "source": {
                    "type": "webpage",
                    "webpage_url": "https://www.example.com",
                },
                "status": "completed",
                "created_at": "2026-09-06 11:52:33",
                "updated_at": "2026-09-06 11:52:33",
            },
        ]
    )


@router.post("/documentation/ingest/jobs/duplicate/{job_id}")
async def create_search_documentation_ingest_job_duplicate(
    job_id: uuid.UUID,
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
) -> Response:
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/documentation/ingest/job/{job_id}", response_model=DocumentationIngestJobResponse)
async def read_search_documentation_ingest_job(
    job_id: uuid.UUID,
    _: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_read_db),
) -> DocumentationIngestJobResponse:
    return DocumentationIngestJobResponse(
        data={
            "id": "9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3",
            "name": "Test ingest job 1",
            "source": {
                "type": "document",
                "file_name": "some-pdf-file-here.pdf",
            },
            "parse_job": {
                "id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "completed",
                "markdown_full": "#text",
                "text_full": "text",
                "tier": "cost_effective",
                "error_message": "",
                "usage": {
                    "credits": 30.0,
                },
            },
            "chunks": [
                {
                    "id": "018204a2-9e58-4618-affe-e313be132aee",
                    "content": "test content 1 python",
                    "metadata": {
                        "source_type": "document",
                        "file_name": "some-pdf-file-here.pdf",
                        "Header 1": "Intro",
                        "Header 2": "History",
                    },
                    "embedding": "[1.5, -0.4, 7.2, 19.6, 20.2]",
                },
                {
                    "id": "01df1db6-87f1-45f4-b34f-b6c5820addad",
                    "content": "test content 2",
                    "metadata": {
                        "source_type": "document",
                        "file_name": "some-pdf-file-here.pdf",
                        "Header 1": "Intro",
                        "Header 2": "History",
                    },
                    "embedding": "[1.5, -0.4, 7.2, 19.6, 20.2]",
                },
            ],
            "embeddings_job": {
                "model": "text-embedding-3-small",
                "usage": {
                    "prompt_tokens": 5,
                    "total_tokens": 5,
                },
            },
            "status": "pending",
            "created_at": "2026-09-06 11:52:33",
            "updated_at": "2026-09-06 11:52:33",
        }
    )


@router.post(
    "/documentation/ingest/job/new/document", response_model=DocumentationIngestJobNewResponse
)
async def create_search_documentation_ingest_job_document(
    data: Annotated[DocumentationIngestJobNewDocumentCreate, Form()],
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
) -> DocumentationIngestJobNewResponse:
    return DocumentationIngestJobNewResponse(
        data={"job_id": "00000599-a0b0-4ec2-80de-ec7bc5fbe76d"}
    )


@router.post(
    "/documentation/ingest/job/new/webpage", response_model=DocumentationIngestJobNewResponse
)
async def create_search_documentation_ingest_job_webpage(
    data: DocumentationIngestJobNewWebpageCreate,
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
) -> DocumentationIngestJobNewResponse:
    return DocumentationIngestJobNewResponse(
        data={"job_id": "00000599-a0b0-4ec2-80de-ec7bc5fbe76d"}
    )


@router.post(
    "/documentation/ingest/job/new/chunks", response_model=DocumentationIngestJobNewChunksResponse
)
async def create_search_documentation_ingest_job_chunks(
    data: DocumentationIngestJobNewChunksCreate,
    _: Annotated[str, Depends(get_current_user)],
) -> DocumentationIngestJobNewChunksResponse:
    chunks = []

    if data.split_method == "markdown":
        chunks = await documentation_ingest_job_chunk_split_markdown(
            chunk_size=data.chunk_size,
            chunk_overlap=data.chunk_overlap,
            content=data.content,
            source=data.source,
        )
    elif data.split_method == "text":
        chunks = await documentation_ingest_job_chunk_split_text(
            chunk_size=data.chunk_size,
            chunk_overlap=data.chunk_overlap,
            content=data.content,
            source=data.source,
        )

    return DocumentationIngestJobNewChunksResponse(data=chunks)


@router.post("/documentation/ingest/job/new/embeddings")
async def create_search_documentation_ingest_job_embeddings(
    data: DocumentationIngestJobNewEmbeddingsCreate,
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
) -> Response:
    return Response(status_code=status.HTTP_204_NO_CONTENT)
