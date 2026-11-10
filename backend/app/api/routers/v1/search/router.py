import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, Form, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_current_user
from app.db.dependencies import get_read_db, get_write_db

from .schemas import (
    DocumentationIngestChunksResponse,
    DocumentationIngestEmbeddingJobsResponse,
    DocumentationIngestJobChunksCreate,
    DocumentationIngestJobChunksResponse,
    DocumentationIngestJobEmbeddingsCreate,
    DocumentationIngestJobParseDocumentCreate,
    DocumentationIngestJobParseResponse,
    DocumentationIngestJobParseWebpageCreate,
    DocumentationIngestJobResponse,
    DocumentationIngestJobsResponse,
    DocumentationIngestParseJobsResponse,
    DocumentationIngestSourcesResponse,
    DocumentationIngestSourceType,
)
from .service import (
    documentation_ingest_chunk_split_markdown,
    documentation_ingest_chunk_split_text,
)

router = APIRouter(prefix="/search/documentation/ingest", tags=["Search - Documentation"])


@router.get(
    "/jobs",
    response_model=DocumentationIngestJobsResponse,
    status_code=status.HTTP_200_OK,
    summary="Read ingest jobs",
    description="Return a list of ingest jobs",
)
async def read_documentation_ingest_jobs(
    _: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_read_db),
    limit: int = 10,
    offset: int = 0,
):
    return DocumentationIngestJobsResponse(
        data=[
            {
                "id": "9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3",
                "name": "Test ingest job 1",
                "status": "pending",
                "created_at": "2026-09-06 11:52:33",
                "updated_at": "2026-09-06 11:52:33",
            },
            {
                "id": "00fa61ce-1505-42f1-b119-601663dad1dc",
                "name": "Test ingest job 2",
                "status": "completed",
                "created_at": "2026-09-06 11:52:33",
                "updated_at": "2026-09-06 11:52:33",
            },
        ]
    )


test_ingest_job_parse_pending = DocumentationIngestJobResponse(
    data={
        "id": "9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3",
        "name": "Test ingest job 1",
        "source": {
            "type": "document",
            "file_name": "some-pdf-file-here.pdf",
        },
        "parse_jobs": [
            {
                "id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "pending",
            },
        ],
        "status": "pending",
        "created_at": "2026-09-06 11:52:33",
        "updated_at": "2026-09-06 11:52:33",
    }
)

test_ingest_job_parse_failed = DocumentationIngestJobResponse(
    data={
        "id": "9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3",
        "name": "Test ingest job 1",
        "source": {
            "type": "document",
            "file_name": "some-pdf-file-here.pdf",
        },
        "parse_jobs": [
            {
                "id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "failed",
                "error_message": "failed to parse",
            },
        ],
        "status": "pending",
        "created_at": "2026-09-06 11:52:33",
        "updated_at": "2026-09-06 11:52:33",
    }
)

test_ingest_job_parse_completed = DocumentationIngestJobResponse(
    data={
        "id": "9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3",
        "name": "Test ingest job 1",
        "source": {
            "type": "document",
            "file_name": "some-pdf-file-here.pdf",
        },
        "parse_jobs": [
            {
                "id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "completed",
                "markdown_full": "#text",
                "text_full": "text",
                "tier": "cost_effective",
                "error_message": "",
                "usage": {
                    "credits": 30.0,
                },
            }
        ],
        "status": "pending",
        "created_at": "2026-09-06 11:52:33",
        "updated_at": "2026-09-06 11:52:33",
    }
)

test_ingest_job_completed = DocumentationIngestJobResponse(
    data={
        "id": "9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3",
        "name": "Test ingest job 1",
        "source": {
            "type": "document",
            "file_name": "some-pdf-file-here.pdf",
        },
        "parse_jobs": [
            {
                "id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "completed",
                "markdown_full": "#text",
                "text_full": "text",
                "tier": "cost_effective",
                "error_message": "",
                "usage": {
                    "credits": 30.0,
                },
            }
        ],
        "embeddings_job": {
            "provider": "OpenAI",
            "model": "text-embedding-3-small",
            "usage": {
                "prompt_tokens": 5,
                "total_tokens": 5,
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
        "status": "completed",
        "created_at": "2026-09-06 11:52:33",
        "updated_at": "2026-09-06 11:52:33",
    }
)


@router.get(
    "/jobs/{job_id}",
    response_model=DocumentationIngestJobResponse,
    status_code=status.HTTP_200_OK,
    summary="Read ingest job",
    description="Return a specified ingest job",
)
async def read_documentation_ingest_job(
    job_id: uuid.UUID,
    _: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_read_db),
):
    return test_ingest_job_parse_completed


@router.delete(
    "/jobs/{job_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete ingest job",
    description="Delete a specified ingest job",
)
async def delete_documentation_ingest_job(
    job_id: uuid.UUID,
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
) -> Response:
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post(
    "/jobs/{job_id}/duplicate",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Duplicate ingest job",
    description="Duplicate a specified ingest job",
)
async def duplicate_documentation_ingest_job(
    job_id: uuid.UUID,
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
) -> Response:
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post(
    "/jobs/document",
    response_model=DocumentationIngestJobParseResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create ingest job document",
    description="Create an ingest job with a document to parse",
)
async def create_documentation_ingest_job_document(
    data: Annotated[DocumentationIngestJobParseDocumentCreate, Form()],
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
):
    return DocumentationIngestJobParseResponse(data={"id": "00000599-a0b0-4ec2-80de-ec7bc5fbe76d"})


@router.post(
    "/jobs/webpage",
    response_model=DocumentationIngestJobParseResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create ingest job webpage",
    description="Create an ingest job with a webpage to parse",
)
async def create_documentation_ingest_job_webpage(
    data: DocumentationIngestJobParseWebpageCreate,
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
):
    return DocumentationIngestJobParseResponse(data={"id": "00000599-a0b0-4ec2-80de-ec7bc5fbe76d"})


@router.post(
    "/jobs/{job_id}/chunks",
    response_model=DocumentationIngestJobChunksResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_documentation_ingest_job_chunks(
    data: DocumentationIngestJobChunksCreate,
    _: Annotated[str, Depends(get_current_user)],
):
    chunks = []

    if data.split_method == "markdown":
        chunks = documentation_ingest_chunk_split_markdown(
            chunk_size=data.chunk_size,
            chunk_overlap=data.chunk_overlap,
            content=data.content,
            source=data.source,
        )
    elif data.split_method == "text":
        chunks = documentation_ingest_chunk_split_text(
            chunk_size=data.chunk_size,
            chunk_overlap=data.chunk_overlap,
            content=data.content,
            source=data.source,
        )

    return DocumentationIngestJobChunksResponse(data=chunks)


@router.post(
    "/jobs/{job_id}/embeddings",
    status_code=status.HTTP_201_CREATED,
)
async def create_documentation_ingest_job_embeddings(
    job_id: uuid.UUID,
    data: DocumentationIngestJobEmbeddingsCreate,
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
) -> Response:
    chunks_content = []

    for chunk in data:
        chunks_content.append(chunk.content)

    print(chunks_content)

    # Create OpenAI embeddings

    # client = AsyncOpenAI(
    #     # This is the default and can be omitted
    #     api_key=os.environ.get("OPENAI_API_KEY"),
    # )

    # response = await client.embeddings.create(
    #     input=chunks_content,
    #     model="text-embedding-3-small",
    # )

    response_test = {
        "object": "list",
        "data": [
            {
                "object": "embedding",
                "index": 0,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 1,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 2,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 3,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 4,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 5,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 6,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 7,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 8,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 9,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 10,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 11,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
            {
                "object": "embedding",
                "index": 12,
                "embedding": [0.0023064255, -0.009327292, 0.015797347, ...],
            },
        ],
        "model": "text-embedding-3-small",
        "usage": {"prompt_tokens": 8, "total_tokens": 8},
    }

    # embeddings = [data.embedding for data in response.data]
    embeddings_test = response_test["data"]

    print(embeddings_test)

    # Combine chunks with created embeddings

    documentation_chunks = []

    for index, chunk in enumerate(data):
        documentation_chunk = {
            "id": chunk.id,
            "ingest_job_id": index,
            "content": chunk.content,
            "metadata": chunk.metadata,
            "embedding": embeddings_test[index]["embedding"],
        }
        documentation_chunks.append(documentation_chunk)

    print(documentation_chunks)

    # Insert chunks to documentation_chunks table

    # users.insert().values(
    #     [
    #         {"name": "some name"},
    #         {"name": "some other name"},
    #         {"name": "yet another name"},
    #     ]
    # )

    # Insert embedding job to documentation_ingest_embedding_jobs table and return ID

    model = response_test["model"]
    usage = response_test["usage"]

    print(model)
    print(usage)

    # Update embeddings_job_id column for current ingest job and set status to completed

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get(
    "/sources",
    response_model=DocumentationIngestSourcesResponse,
    status_code=status.HTTP_200_OK,
    summary="Read ingest sources",
    description="Return a list of ingest sources",
)
async def read_documentation_ingest_sources(
    _: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_read_db),
    limit: int = 10,
    offset: int = 0,
    query: str | None = None,
    type: DocumentationIngestSourceType | None = None,
    sort_by_desc: bool = True,
):
    print(limit)
    print(offset)
    print(query)
    print(type)
    print(sort_by_desc)
    return DocumentationIngestSourcesResponse(
        data=[
            {
                "id": "018204a2-9e58-4618-affe-e313be132aee",
                "type": "document",
                "file_name": "test",
                "file_url": "test",
                "webpage_url": "test",
                "created_at": "2026-09-06 11:52:33",
            },
            {
                "id": "01df1db6-87f1-45f4-b34f-b6c5820addad",
                "type": "webpage",
                "created_at": "2026-09-06 11:52:33",
            },
        ]
    )


@router.get(
    "/parse-jobs",
    response_model=DocumentationIngestParseJobsResponse,
    status_code=status.HTTP_200_OK,
    summary="Read ingest parse jobs",
    description="Return a list of ingest parse jobs",
)
async def read_documentation_ingest_parse_jobs(
    _: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_read_db),
    limit: int = 10,
    offset: int = 0,
):
    return DocumentationIngestParseJobsResponse(
        data=[
            {
                "id": "018204a2-9e58-4618-affe-e313be132aee",
                "ingest_job_id": "018205a2-9e58-4618-affe-e313be132aee",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "completed",
                "created_at": "2026-09-06 11:52:33",
                "updated_at": "2026-09-06 11:52:33",
            },
            {
                "id": "01df1db6-87f1-45f4-b34f-b6c5820addad",
                "ingest_job_id": "018205a2-9e58-4618-affe-e313be132aee",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "completed",
                "created_at": "2026-09-06 11:52:33",
                "updated_at": "2026-09-06 11:52:33",
            },
            {
                "id": "00573b80-ef1c-4f0d-b5e9-8762caed9c1b",
                "ingest_job_id": "018205a2-9e58-4618-affe-e313be132aee",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "completed",
                "markdown_full": "#text",
                "text_full": "text",
                "tier": "cost_effective",
                "error_message": "test",
                "usage": {
                    "credits": 30.0,
                },
                "created_at": "2026-09-06 11:52:33",
                "updated_at": "2026-09-06 11:52:33",
            },
        ]
    )


@router.get(
    "/embedding-jobs",
    response_model=DocumentationIngestEmbeddingJobsResponse,
    status_code=status.HTTP_200_OK,
    summary="Read ingest embedding jobs",
    description="Return a list of ingest embedding jobs",
)
async def read_documentation_ingest_embedding_jobs(
    _: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_read_db),
    limit: int = 10,
    offset: int = 0,
):
    return DocumentationIngestEmbeddingJobsResponse(
        data=[
            {
                "id": "018204a2-9e58-4618-affe-e313be132aee",
                "parse_job_id": "018204a2-9e59-4618-affe-e313be132aee",
                "provider": "OpenAI",
                "model": "text-embedding-3-small",
                "usage": {"prompt_tokens": 8, "total_tokens": 8},
                "created_at": "2026-09-06 11:52:33",
            },
            {
                "id": "01df1db6-87f1-45f4-b34f-b6c5820addad",
                "parse_job_id": "018304a2-9e59-4618-affe-e313be132aee",
                "provider": "OpenAI",
                "model": "text-embedding-3-small",
                "usage": {"prompt_tokens": 8, "total_tokens": 8},
                "created_at": "2026-09-06 11:52:33",
            },
        ]
    )


@router.get(
    "/chunks",
    response_model=DocumentationIngestChunksResponse,
    status_code=status.HTTP_200_OK,
    summary="Read ingest chunks",
    description="Return a list of ingest chunks",
)
async def read_documentation_ingest_chunks(
    _: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_read_db),
    limit: int = 10,
    offset: int = 0,
):
    return DocumentationIngestChunksResponse(
        data=[
            {
                "id": "018204a2-9e58-4618-affe-e313be132aee",
                "ingest_job_id": "018204a2-9e58-4618-affe-e313be132eee",
                "content": "test content 1 python",
                "metadata": {
                    "source_type": "document",
                    "file_name": "some-pdf-file-here.pdf",
                    "Header 1": "Intro",
                    "Header 2": "History",
                },
                "embedding": "[1.5, -0.4, 7.2, 19.6, 20.2]",
                "created_at": "2026-09-06 11:52:33",
            },
            {
                "id": "01df1db6-87f1-45f4-b34f-b6c5820addad",
                "ingest_job_id": "018204a2-9e58-4618-affe-e313be132eee",
                "content": "test content 2",
                "metadata": {
                    "source_type": "document",
                    "file_name": "some-pdf-file-here.pdf",
                    "Header 1": "Intro",
                    "Header 2": "History",
                },
                "embedding": "[1.5, -0.4, 7.2, 19.6, 20.2]",
                "created_at": "2026-09-06 11:52:33",
            },
        ]
    )
