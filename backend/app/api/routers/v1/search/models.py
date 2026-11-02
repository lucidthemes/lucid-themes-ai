import uuid
from typing import Any

from sqlalchemy import Enum, ForeignKey, Uuid
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.common import CreatedAtMixin, IdMixin, UpdatedAtMixin

from .enums import DocumentationIngestJobSourceType, DocumentationIngestJobStatus
from .schemas import (
    DocumentationIngestJobEmbeddingsJobUsage,
    DocumentationIngestJobParseJobUsage,
    DocumentationIngestJobTier,
)


class DocumentationIngestJobSource(Base, IdMixin, CreatedAtMixin):
    __tablename__ = "documentation_ingest_job_sources"

    # id: Mapped[uuid.UUID] = mapped_column(
    #     Uuid,
    #     primary_key=True,
    #     default=uuid.uuid4,
    # )
    type: Mapped[DocumentationIngestJobSourceType] = mapped_column(
        Enum(
            DocumentationIngestJobSourceType,
            name="documentation_ingest_job_source_type",
            values_callable=lambda enum: [e.value for e in enum],
        )
    )
    file_name: Mapped[str] = mapped_column(nullable=True)
    file_url: Mapped[str] = mapped_column(nullable=True)
    webpage_url: Mapped[str] = mapped_column(nullable=True)
    # created_at: Mapped[datetime] = mapped_column(
    #     DateTime(timezone=True),
    #     server_default=func.now(),
    # )


class DocumentationIngestJobParseJob(Base, IdMixin, CreatedAtMixin, UpdatedAtMixin):
    __tablename__ = "documentation_ingest_job_parse_jobs"

    # id: Mapped[uuid.UUID] = mapped_column(
    #     Uuid,
    #     primary_key=True,
    #     default=uuid.uuid4,
    # )
    parse_job_id: Mapped[str] = mapped_column(nullable=False)
    status: Mapped[DocumentationIngestJobStatus] = mapped_column(
        Enum(
            DocumentationIngestJobStatus,
            name="documentation_ingest_parse_job_status",
            values_callable=lambda enum: [e.value for e in enum],
        ),
        default=DocumentationIngestJobStatus.PENDING,
    )
    markdown_full: Mapped[str | None] = mapped_column(nullable=True)
    text_full: Mapped[str | None] = mapped_column(nullable=True)
    tier: Mapped[DocumentationIngestJobTier] = mapped_column(
        Enum(
            DocumentationIngestJobTier,
            name="documentation_ingest_parse_job_tier",
            values_callable=lambda enum: [e.value for e in enum],
        ),
    )
    error_message: Mapped[str | None] = mapped_column(nullable=True)
    usage: Mapped[DocumentationIngestJobParseJobUsage | None] = mapped_column(
        JSONB,
        nullable=True,
        default=dict,
    )
    # created_at: Mapped[datetime] = mapped_column(
    #     DateTime(timezone=True),
    #     server_default=func.now(),
    # )
    # updated_at: Mapped[datetime] = mapped_column(
    #     DateTime(timezone=True),
    #     server_default=func.now(),
    #     onupdate=func.now(),
    # )


class DocumentationIngestJobEmbeddingsJob(Base, IdMixin, CreatedAtMixin, UpdatedAtMixin):
    __tablename__ = "documentation_ingest_job_embeddings_jobs"

    # id: Mapped[uuid.UUID] = mapped_column(
    #     Uuid,
    #     primary_key=True,
    #     default=uuid.uuid4,
    # )
    model: Mapped[str] = mapped_column(nullable=False)
    usage: Mapped[DocumentationIngestJobEmbeddingsJobUsage] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
    )
    # created_at: Mapped[datetime] = mapped_column(
    #     DateTime(timezone=True),
    #     server_default=func.now(),
    # )
    # updated_at: Mapped[datetime] = mapped_column(
    #     DateTime(timezone=True),
    #     server_default=func.now(),
    #     onupdate=func.now(),
    # )


class DocumentationIngestJob(Base, IdMixin, CreatedAtMixin, UpdatedAtMixin):
    __tablename__ = "documentation_ingest_jobs"

    # id: Mapped[uuid.UUID] = mapped_column(
    #     Uuid,
    #     primary_key=True,
    #     default=uuid.uuid4,
    # )
    user_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        default=uuid.uuid4,
    )
    name: Mapped[str] = mapped_column(nullable=False)
    source_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("documentation_ingest_job_sources.id"))
    parse_job_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("documentation_ingest_job_parse_jobs.id")
    )
    embeddings_job_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("documentation_ingest_job_embeddings_jobs.id")
    )
    status: Mapped[DocumentationIngestJobStatus] = mapped_column(
        Enum(
            DocumentationIngestJobStatus,
            name="documentation_ingest_job_status",
            values_callable=lambda enum: [e.value for e in enum],
        ),
        default=DocumentationIngestJobStatus.PENDING,
    )
    # created_at: Mapped[datetime] = mapped_column(
    #     DateTime(timezone=True),
    #     server_default=func.now(),
    # )
    # updated_at: Mapped[datetime] = mapped_column(
    #     DateTime(timezone=True),
    #     server_default=func.now(),
    #     onupdate=func.now(),
    # )


class DocumentationChunk(Base, IdMixin, CreatedAtMixin):
    __tablename__ = "documentation_chunks"

    # id: Mapped[uuid.UUID] = mapped_column(
    #     Uuid,
    #     primary_key=True,
    #     default=uuid.uuid4,
    # )
    ingest_job_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("documentation_ingest_jobs.id"))
    content: Mapped[str] = mapped_column(nullable=False)
    metadata_: Mapped[dict[Any, Any]] = mapped_column(
        "metadata",
        JSONB,
        nullable=False,
        default=dict,
    )
    embedding: Mapped[str] = mapped_column(nullable=False)  # this needs to be vector!
    # created_at: Mapped[datetime] = mapped_column(
    #     DateTime(timezone=True),
    #     server_default=func.now(),
    # )
