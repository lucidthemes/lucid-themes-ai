import uuid
from datetime import datetime
from enum import StrEnum
from typing import Any

from fastapi import UploadFile
from pydantic import BaseModel, HttpUrl

from app.schemas.common import APIResponse

from .enums import (
    DocumentationIngestJobSourceType,
    DocumentationIngestJobStatus,
    DocumentationIngestJobTier,
)

# General


# class DocumentationIngestJobSourceType(StrEnum):
#     DOCUMENT = "document"
#     WEBPAGE = "webpage"


class DocumentationIngestStatus(StrEnum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"


# class DocumentationIngestJobTier(StrEnum):
#     AGENTIC_PLUS = "agentic_plus"
#     AGENTIC = "agentic"
#     COST_EFFECTIVE = "cost_effective"
#     FAST = "fast"


# Ingest sources


class DocumentationIngestSourceType(StrEnum):
    DOCUMENT = "document"
    WEBPAGE = "webpage"


class DocumentationIngestSource(BaseModel):
    id: uuid.UUID
    type: DocumentationIngestSourceType
    file_name: str | None = None
    file_url: str | None = None
    webpage_url: str | None = None
    created_at: datetime


DocumentationIngestSourcesResponse = APIResponse[list[DocumentationIngestSource]]


# Ingest parse jobs


class DocumentationIngestParseJobTier(StrEnum):
    AGENTIC_PLUS = "agentic_plus"
    AGENTIC = "agentic"
    COST_EFFECTIVE = "cost_effective"
    FAST = "fast"


class DocumentationIngestParseJobUsage(BaseModel):
    credits: int | None = None


class DocumentationIngestParseJob(BaseModel):
    id: uuid.UUID
    ingest_job_id: uuid.UUID
    llamaparse_job_id: str
    status: DocumentationIngestStatus
    markdown_full: str | None = None
    text_full: str | None = None
    tier: DocumentationIngestJobTier | None = None
    error_message: str | None = None
    usage: DocumentationIngestParseJobUsage | None = None
    created_at: datetime
    updated_at: datetime


DocumentationIngestParseJobsResponse = APIResponse[list[DocumentationIngestParseJob]]


# Ingest embedding jobs


class DocumentationIngestEmbeddingJobUsage(BaseModel):
    prompt_tokens: int
    total_tokens: int


class DocumentationIngestEmbeddingJob(BaseModel):
    id: uuid.UUID
    provider: str
    model: str
    usage: DocumentationIngestEmbeddingJobUsage
    created_at: datetime


DocumentationIngestEmbeddingJobsResponse = APIResponse[list[DocumentationIngestEmbeddingJob]]


# Ingest chunks


class DocumentationIngestChunk(BaseModel):
    id: uuid.UUID
    ingest_job_id: uuid.UUID
    content: str
    metadata: dict[Any, Any]
    embedding: str
    created_at: datetime


DocumentationIngestChunksResponse = APIResponse[list[DocumentationIngestChunk]]


# Ingest jobs


class DocumentationIngestJobs(BaseModel):
    id: uuid.UUID
    name: str
    status: DocumentationIngestStatus
    created_at: datetime
    updated_at: datetime


DocumentationIngestJobsResponse = APIResponse[list[DocumentationIngestJobs]]


# old ---


class DocumentationIngestJobSource(BaseModel):
    type: DocumentationIngestJobSourceType
    file_name: str | None = None
    file_url: str | None = None
    webpage_url: str | None = None


# Ingest jobs list


# class DocumentationIngestJobsResponseData(BaseModel):
#     id: uuid.UUID
#     name: str
#     source: DocumentationIngestJobSource
#     status: DocumentationIngestJobStatus
#     created_at: datetime
#     updated_at: datetime


# DocumentationIngestJobsResponse = APIResponse[list[DocumentationIngestJobsResponseData]]


# Ingest sources list


# class DocumentationIngestSourcesResponseData(BaseModel):
#     id: uuid.UUID
#     type: str
#     created_at: datetime


# DocumentationIngestSourcesResponse = APIResponse[list[DocumentationIngestSourcesResponseData]]

# Ingest parse  jobs list


# class DocumentationIngestParseJobsResponseData(BaseModel):
#     id: uuid.UUID
#     llamaparse_job_id: str
#     status: DocumentationIngestJobStatus
#     created_at: datetime


# DocumentationIngestParseJobsResponse = APIResponse[list[DocumentationIngestParseJobsResponseData]]

# Ingest embedding jobs list


# class DocumentationIngestEmbeddingJobsResponseData(BaseModel):
#     id: uuid.UUID
#     model: str
#     created_at: datetime


# DocumentationIngestEmbeddingJobsResponse = APIResponse[
#     list[DocumentationIngestEmbeddingJobsResponseData]
# ]

# Ingest chunks list


# class DocumentationIngestChunksResponseData(BaseModel):
#     id: uuid.UUID
#     content: str
#     created_at: datetime


# DocumentationIngestChunksResponse = APIResponse[list[DocumentationIngestChunksResponseData]]


# Single Ingest job


class DocumentationIngestJobParseJobUsage(BaseModel):
    credits: int | None = None


class DocumentationIngestJobParseJob(BaseModel):
    id: str
    llamaparse_job_id: str
    status: DocumentationIngestJobStatus
    markdown_full: str | None = None
    text_full: str | None = None
    tier: DocumentationIngestJobTier | None = None
    error_message: str | None = None
    usage: DocumentationIngestJobParseJobUsage | None = None


class DocumentationIngestJobEmbeddingsJobUsage(BaseModel):
    prompt_tokens: int
    total_tokens: int


class DocumentationIngestJobEmbeddingsJob(BaseModel):
    model: str
    usage: DocumentationIngestJobEmbeddingsJobUsage


class DocumentationIngestJobChunk(BaseModel):
    id: uuid.UUID
    content: str
    metadata: dict[Any, Any]
    embedding: str
    # embedding: str | None = None


class DocumentationIngestJobResponseData(BaseModel):
    id: uuid.UUID
    name: str
    source: DocumentationIngestJobSource
    parse_jobs: list[DocumentationIngestJobParseJob]
    embeddings_job: DocumentationIngestJobEmbeddingsJob | None = None
    chunks: list[DocumentationIngestJobChunk] | None = None
    status: DocumentationIngestJobStatus
    created_at: datetime
    updated_at: datetime


DocumentationIngestJobResponse = APIResponse[DocumentationIngestJobResponseData]


# New ingest job - parse


class DocumentationIngestJobNewDocumentPages(StrEnum):
    ALL = "all"
    RANGE = "range"


class DocumentationIngestJobNewBase(BaseModel):
    name: str
    tier: DocumentationIngestJobTier


class DocumentationIngestJobNewDocumentCreate(DocumentationIngestJobNewBase):
    file: UploadFile
    pages: DocumentationIngestJobNewDocumentPages
    range_from: int | None = None
    range_to: int | None = None


class DocumentationIngestJobNewWebpageCreate(DocumentationIngestJobNewBase):
    url: HttpUrl


class DocumentationIngestJobNewResponseData(BaseModel):
    job_id: uuid.UUID


DocumentationIngestJobNewResponse = APIResponse[DocumentationIngestJobNewResponseData]


# New ingest job - chunks + embeddings


class DocumentationIngestJobNewChunksMethod(StrEnum):
    MARKDOWN = "markdown"
    TEXT = "text"


class DocumentationIngestJobNewChunksCreate(BaseModel):
    split_method: DocumentationIngestJobNewChunksMethod = "markdown"
    chunk_size: int = 250
    chunk_overlap: int = 30
    content: str
    source: DocumentationIngestJobSource


class DocumentationIngestJobNewChunk(BaseModel):
    id: uuid.UUID
    content: str
    metadata: dict[Any, Any]


DocumentationIngestJobNewChunksResponse = APIResponse[list[DocumentationIngestJobNewChunk]]

DocumentationIngestJobNewEmbeddingsCreate = list[DocumentationIngestJobNewChunk]
