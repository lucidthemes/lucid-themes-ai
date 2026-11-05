import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, Form, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_current_user
from app.db.dependencies import get_read_db, get_write_db

from .schemas import (
    DocumentationIngestChunksResponse,
    DocumentationIngestEmbeddingJobsResponse,
    DocumentationIngestJobNewChunksCreate,
    DocumentationIngestJobNewChunksResponse,
    DocumentationIngestJobNewDocumentCreate,
    DocumentationIngestJobNewEmbeddingsCreate,
    DocumentationIngestJobNewResponse,
    DocumentationIngestJobNewWebpageCreate,
    DocumentationIngestJobResponse,
    DocumentationIngestJobsResponse,
    DocumentationIngestParseJobsResponse,
    DocumentationIngestSourcesResponse,
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
async def read_documentation_ingest_jobs(
    _: Annotated[str, Depends(get_current_user)], db: AsyncSession = Depends(get_read_db)
):
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
async def create_documentation_ingest_job_duplicate(
    job_id: uuid.UUID,
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
) -> Response:
    return Response(status_code=status.HTTP_204_NO_CONTENT)


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
                "id": "00563b80-ef1c-4f0c-b5e9-8763caed9c1b",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "failed",
                "error_message": "failed to parse",
            },
            {
                "id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "pending",
            },
            {
                "id": "00563b89-ef1c-4f0c-b5e9-8763caed9c1b",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "failed",
                "error_message": "failed to parse",
            },
            {
                "id": "00573b80-ef1c-4f0d-b5e9-8762caed9c1b",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "completed",
                "markdown_full": "#text",
                "text_full": "text",
                "tier": "cost_effective",
                "error_message": "",
                "usage": {
                    "credits": 30.0,
                },
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


@router.get("/documentation/ingest/jobs/{job_id}", response_model=DocumentationIngestJobResponse)
async def read_documentation_ingest_job(
    job_id: uuid.UUID,
    _: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_read_db),
):
    return test_ingest_job_parse_pending
    # return DocumentationIngestJobResponse(
    #     data={
    #         "id": "9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3",
    #         "name": "Test ingest job 1",
    #         "source": {
    #             "type": "document",
    #             "file_name": "some-pdf-file-here.pdf",
    #         },
    #         "parse_job": {
    #             "id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
    #             "parse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
    #             "status": "completed",
    #             "markdown_full": "#text",
    #             "text_full": "text",
    #             "tier": "cost_effective",
    #             "error_message": "",
    #             "usage": {
    #                 "credits": 30.0,
    #             },
    #         },
    #         "chunks": [
    #             {
    #                 "id": "018204a2-9e58-4618-affe-e313be132aee",
    #                 "content": "test content 1 python",
    #                 "metadata": {
    #                     "source_type": "document",
    #                     "file_name": "some-pdf-file-here.pdf",
    #                     "Header 1": "Intro",
    #                     "Header 2": "History",
    #                 },
    #                 "embedding": "[1.5, -0.4, 7.2, 19.6, 20.2]",
    #             },
    #             {
    #                 "id": "01df1db6-87f1-45f4-b34f-b6c5820addad",
    #                 "content": "test content 2",
    #                 "metadata": {
    #                     "source_type": "document",
    #                     "file_name": "some-pdf-file-here.pdf",
    #                     "Header 1": "Intro",
    #                     "Header 2": "History",
    #                 },
    #                 "embedding": "[1.5, -0.4, 7.2, 19.6, 20.2]",
    #             },
    #         ],
    #         "embeddings_job": {
    #             "model": "text-embedding-3-small",
    #             "usage": {
    #                 "prompt_tokens": 5,
    #                 "total_tokens": 5,
    #             },
    #         },
    #         "status": "pending",
    #         "created_at": "2026-09-06 11:52:33",
    #         "updated_at": "2026-09-06 11:52:33",
    #     }
    # )


@router.post(
    "/documentation/ingest/job/new/document", response_model=DocumentationIngestJobNewResponse
)
async def create_documentation_ingest_job_document(
    data: Annotated[DocumentationIngestJobNewDocumentCreate, Form()],
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
):
    return DocumentationIngestJobNewResponse(
        data={"job_id": "00000599-a0b0-4ec2-80de-ec7bc5fbe76d"}
    )


@router.post(
    "/documentation/ingest/job/new/webpage", response_model=DocumentationIngestJobNewResponse
)
async def create_documentation_ingest_job_webpage(
    data: DocumentationIngestJobNewWebpageCreate,
    current_user: Annotated[str, Depends(get_current_user)],
    db: AsyncSession = Depends(get_write_db),
):
    return DocumentationIngestJobNewResponse(
        data={"job_id": "00000599-a0b0-4ec2-80de-ec7bc5fbe76d"}
    )


@router.post(
    "/documentation/ingest/job/new/chunks", response_model=DocumentationIngestJobNewChunksResponse
)
async def create_documentation_ingest_job_chunks(
    data: DocumentationIngestJobNewChunksCreate,
    _: Annotated[str, Depends(get_current_user)],
):
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
async def create_documentation_ingest_job_embeddings(
    data: DocumentationIngestJobNewEmbeddingsCreate,
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

    # Insert embedding job to documentation_ingest_job_embeddings_jobs table and return ID

    model = response_test["model"]
    usage = response_test["usage"]

    print(model)
    print(usage)

    # Update embeddings_job_id column for current ingest job and set status to completed

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/documentation/ingest/sources", response_model=DocumentationIngestSourcesResponse)
async def read_documentation_ingest_sources(
    _: Annotated[str, Depends(get_current_user)], db: AsyncSession = Depends(get_read_db)
):
    return DocumentationIngestSourcesResponse(
        data=[
            {
                "id": "018204a2-9e58-4618-affe-e313be132aee",
                "type": "document",
                "created_at": "2026-09-06 11:52:33",
            },
            {
                "id": "01df1db6-87f1-45f4-b34f-b6c5820addad",
                "type": "webpage",
                "created_at": "2026-09-06 11:52:33",
            },
        ]
    )


@router.get("/documentation/ingest/parse-jobs", response_model=DocumentationIngestParseJobsResponse)
async def read_documentation_ingest_parse_jobs(
    _: Annotated[str, Depends(get_current_user)], db: AsyncSession = Depends(get_read_db)
):
    return DocumentationIngestParseJobsResponse(
        data=[
            {
                "id": "018204a2-9e58-4618-affe-e313be132aee",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "completed",
                "created_at": "2026-09-06 11:52:33",
            },
            {
                "id": "01df1db6-87f1-45f4-b34f-b6c5820addad",
                "llamaparse_job_id": "00563b80-ef1c-4f0c-b5e9-8762caed9c1b",
                "status": "completed",
                "created_at": "2026-09-06 11:52:33",
            },
        ]
    )


@router.get(
    "/documentation/ingest/embedding-jobs", response_model=DocumentationIngestEmbeddingJobsResponse
)
async def read_documentation_ingest_embedding_jobs(
    _: Annotated[str, Depends(get_current_user)], db: AsyncSession = Depends(get_read_db)
):
    return DocumentationIngestEmbeddingJobsResponse(
        data=[
            {
                "id": "018204a2-9e58-4618-affe-e313be132aee",
                "model": "text-embedding-3-small",
                "created_at": "2026-09-06 11:52:33",
            },
            {
                "id": "01df1db6-87f1-45f4-b34f-b6c5820addad",
                "model": "text-embedding-3-small",
                "created_at": "2026-09-06 11:52:33",
            },
        ]
    )


@router.get("/documentation/ingest/chunks", response_model=DocumentationIngestChunksResponse)
async def read_documentation_ingest_chunks(
    _: Annotated[str, Depends(get_current_user)], db: AsyncSession = Depends(get_read_db)
):
    return DocumentationIngestChunksResponse(
        data=[
            {
                "id": "018204a2-9e58-4618-affe-e313be132aee",
                "content": "test content 1 python",
                "created_at": "2026-09-06 11:52:33",
            },
            {
                "id": "01df1db6-87f1-45f4-b34f-b6c5820addad",
                "content": "test content 2",
                "created_at": "2026-09-06 11:52:33",
            },
        ]
    )
