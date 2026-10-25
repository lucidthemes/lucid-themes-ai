import uuid
from datetime import datetime
from enum import StrEnum

from fastapi import UploadFile
from pydantic import BaseModel, HttpUrl

# General


class DocumentationIngestJobSourceType(StrEnum):
    DOCUMENT = "document"
    WEBPAGE = "webpage"


class DocumentationIngestJobStatus(StrEnum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"


class DocumentationIngestJobTier(StrEnum):
    AGENTIC_PLUS = "agentic_plus"
    AGENTIC = "agentic"
    COST_EFFECTIVE = "cost_effective"
    FAST = "fast"


class DocumentationIngestJobSource(BaseModel):
    type: DocumentationIngestJobSourceType
    file_name: str | None = None
    file_url: str | None = None
    webpage_url: str | None = None


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


class DocumentationIngestJobNewResponse(BaseModel):
    job_id: uuid.UUID


# New ingest job - chunks + embeddings


class DocumentationIngestJobNewChunksMethod(StrEnum):
    MARKDOWN = "markdown"
    TEXT = "text"


class DocumentationIngestJobNewChunksCreate(BaseModel):
    split_method: DocumentationIngestJobNewChunksMethod = "markdown"
    chunk_size: int = 250
    chunk_overlap: int = 30
    content: str


class DocumentationIngestJobNewChunk(BaseModel):
    content: str


class DocumentationIngestJobNewChunksResponse(BaseModel):
    chunks: list[DocumentationIngestJobNewChunk]


class DocumentationIngestJobNewEmbeddingsCreate(BaseModel):
    chunks: list[DocumentationIngestJobNewChunk]


# Existing Ingest job


class DocumentationIngestJobParseJobUsage(BaseModel):
    credits: int | None = None


class DocumentationIngestJobParseJob(BaseModel):
    id: str
    status: DocumentationIngestJobStatus
    markdown_full: str | None = None
    text_full: str | None = None
    tier: DocumentationIngestJobTier | None = None
    error_message: str | None = None
    usage: DocumentationIngestJobParseJobUsage | None = None


class DocumentationIngestJobChunk(BaseModel):
    id: uuid.UUID
    content: str
    embedding: str | None = None


class DocumentationIngestJobEmbeddingsJobUsage(BaseModel):
    prompt_tokens: int
    total_tokens: int


class DocumentationIngestJobEmbeddingsJob(BaseModel):
    model: str
    usage: DocumentationIngestJobEmbeddingsJobUsage


class DocumentationIngestJobResponse(BaseModel):
    id: uuid.UUID
    name: str
    source: DocumentationIngestJobSource
    parse_job: DocumentationIngestJobParseJob
    chunks: list[DocumentationIngestJobChunk]
    embeddings_job: DocumentationIngestJobEmbeddingsJob
    status: DocumentationIngestJobStatus
    created_at: datetime
    updated_at: datetime


# Existing Ingest jobs


class DocumentationIngestJobsResponse(BaseModel):
    id: uuid.UUID
    name: str
    source: DocumentationIngestJobSource
    status: DocumentationIngestJobStatus
    created_at: datetime
    updated_at: datetime
