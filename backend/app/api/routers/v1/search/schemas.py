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
    COMPLETED = "completed"
    PENDING = "pending"
    FAILED = "failed"


# New ingest job


class DocumentationIngestJobNewTier(StrEnum):
    AGENTIC_PLUS = "agentic_plus"
    AGENTIC = "agentic"
    COST_EFFECTIVE = "cost_effective"
    FAST = "fast"


class DocumentationIngestJobNewDocumentPages(StrEnum):
    ALL = "all"
    RANGE = "range"


class DocumentationIngestJobNewBase(BaseModel):
    name: str
    tier: DocumentationIngestJobNewTier


class DocumentationIngestJobNewDocumentCreate(DocumentationIngestJobNewBase):
    file: UploadFile
    pages: DocumentationIngestJobNewDocumentPages
    range_from: int | None
    range_to: int | None


class DocumentationIngestJobNewWebpageCreate(DocumentationIngestJobNewBase):
    url: HttpUrl


# Ingest jobs list


class DocumentationIngestJob(BaseModel):
    id: uuid.UUID
    name: str
    type: DocumentationIngestJobSourceType
    status: DocumentationIngestJobStatus
    created_at: datetime
    updated_at: datetime
