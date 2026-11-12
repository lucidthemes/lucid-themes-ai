import uuid
from datetime import datetime
from enum import StrEnum
from typing import Annotated, Any

from fastapi import UploadFile
from pydantic import BaseModel, HttpUrl
from pydantic.types import StringConstraints

from app.schemas.common import APIResponse

# General


class DocumentationIngestStatus(StrEnum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"


# Ingest source


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


# Ingest sources list

DocumentationIngestSourcesResponse = APIResponse[list[DocumentationIngestSource]]


# Ingest parse job


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
    tier: DocumentationIngestParseJobTier | None = None
    error_message: str | None = None
    usage: DocumentationIngestParseJobUsage | None = None
    created_at: datetime
    updated_at: datetime


# Ingest parse jobs list

DocumentationIngestParseJobsResponse = APIResponse[list[DocumentationIngestParseJob]]


# Ingest embedding job


class DocumentationIngestEmbeddingJobUsage(BaseModel):
    prompt_tokens: int
    total_tokens: int


class DocumentationIngestEmbeddingJob(BaseModel):
    id: uuid.UUID
    parse_job_id: uuid.UUID
    provider: str
    model: str
    usage: DocumentationIngestEmbeddingJobUsage
    created_at: datetime


# Ingest embedding jobs list

DocumentationIngestEmbeddingJobsResponse = APIResponse[list[DocumentationIngestEmbeddingJob]]


# Ingest chunk


class DocumentationIngestChunk(BaseModel):
    id: uuid.UUID
    ingest_job_id: uuid.UUID
    content: str
    metadata: dict[Any, Any]
    embedding: str
    created_at: datetime


# Ingest chunks list

DocumentationIngestChunksResponse = APIResponse[list[DocumentationIngestChunk]]


# Ingest jobs list


class DocumentationIngestJobs(BaseModel):
    id: uuid.UUID
    name: str
    status: DocumentationIngestStatus
    created_at: datetime
    updated_at: datetime


DocumentationIngestJobsResponse = APIResponse[list[DocumentationIngestJobs]]


# Single ingest job


class DocumentationIngestJobSource(BaseModel):
    type: DocumentationIngestSourceType
    file_name: str | None = None
    file_url: str | None = None
    webpage_url: str | None = None


class DocumentationIngestJobParseJob(BaseModel):
    id: uuid.UUID
    llamaparse_job_id: str
    status: DocumentationIngestStatus
    markdown_full: str | None = None
    text_full: str | None = None
    tier: DocumentationIngestParseJobTier | None = None
    error_message: str | None = None
    usage: DocumentationIngestParseJobUsage | None = None


class DocumentationIngestJobEmbeddingJob(BaseModel):
    provider: str
    model: str
    usage: DocumentationIngestEmbeddingJobUsage


class DocumentationIngestJobChunk(BaseModel):
    id: uuid.UUID
    content: str
    metadata: dict[Any, Any]
    embedding: str


class DocumentationIngestJobResponseData(BaseModel):
    id: uuid.UUID
    name: str
    source: DocumentationIngestJobSource
    parse_jobs: list[DocumentationIngestJobParseJob]
    embeddings_job: DocumentationIngestJobEmbeddingJob | None = None
    chunks: list[DocumentationIngestJobChunk] | None = None
    status: DocumentationIngestStatus
    created_at: datetime
    updated_at: datetime


DocumentationIngestJobResponse = APIResponse[DocumentationIngestJobResponseData]


# New ingest job

# Parse


class DocumentationIngestJobParseBase(BaseModel):
    name: Annotated[str, StringConstraints(min_length=1, max_length=100)]
    tier: DocumentationIngestParseJobTier


class DocumentationIngestJobParseDocumentPages(StrEnum):
    ALL = "all"
    RANGE = "range"


class DocumentationIngestJobParseDocumentCreate(DocumentationIngestJobParseBase):
    file: UploadFile
    pages: DocumentationIngestJobParseDocumentPages
    range_from: int | None = None
    range_to: int | None = None


class DocumentationIngestJobParseWebpageCreate(DocumentationIngestJobParseBase):
    url: HttpUrl


class DocumentationIngestJobParseResponseData(BaseModel):
    id: uuid.UUID


DocumentationIngestJobParseResponse = APIResponse[DocumentationIngestJobParseResponseData]

# Chunks


class DocumentationIngestJobChunksMethod(StrEnum):
    MARKDOWN = "markdown"
    TEXT = "text"


class DocumentationIngestJobChunksCreate(BaseModel):
    split_method: DocumentationIngestJobChunksMethod = "markdown"
    chunk_size: int = 250
    chunk_overlap: int = 30
    content: str
    source: DocumentationIngestJobSource


class DocumentationIngestJobChunksResponseChunk(BaseModel):
    id: uuid.UUID
    content: str
    metadata: dict[Any, Any]


DocumentationIngestJobChunksResponse = APIResponse[list[DocumentationIngestJobChunksResponseChunk]]


# Embeddings

DocumentationIngestJobEmbeddingsCreate = list[DocumentationIngestJobChunksResponseChunk]
