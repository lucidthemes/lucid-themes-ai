import uuid
from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel


class DocumentationIngestJobType(StrEnum):
    DOCUMENT = "document"
    WEBPAGE = "webpage"


class DocumentationIngestJobStatus(StrEnum):
    COMPLETED = "completed"
    PENDING = "pending"
    FAILED = "failed"


class DocumentationIngestJob(BaseModel):
    id: uuid.UUID
    type: DocumentationIngestJobType
    status: DocumentationIngestJobStatus
    # parse_job_id: str
    created_at: datetime
