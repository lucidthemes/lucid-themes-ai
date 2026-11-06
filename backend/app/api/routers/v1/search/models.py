import uuid
from typing import Any

from pgvector.sqlalchemy import Vector
from sqlalchemy import Enum, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.common import CreatedAtMixin, IdMixin, UpdatedAtMixin

from .enums import DocumentationIngestJobSourceType, DocumentationIngestJobStatus
from .schemas import (
    DocumentationIngestJobEmbeddingsJobUsage,
    DocumentationIngestJobParseJobUsage,
    DocumentationIngestJobTier,
)


class DocumentationIngestSource(Base, IdMixin, CreatedAtMixin):
    __tablename__ = "documentation_ingest_sources"

    type: Mapped[DocumentationIngestJobSourceType] = mapped_column(
        Enum(
            DocumentationIngestJobSourceType,
            name="documentation_ingest_job_source_type",
            values_callable=lambda enum: [e.value for e in enum],
        )
    )
    file_name: Mapped[str | None] = mapped_column(nullable=True)
    file_url: Mapped[str | None] = mapped_column(nullable=True)
    webpage_url: Mapped[str | None] = mapped_column(nullable=True)

    ingest_jobs: Mapped[list[DocumentationIngestJob]] = relationship(
        back_populates="source",
    )


class DocumentationIngestParseJob(Base, IdMixin, CreatedAtMixin, UpdatedAtMixin):
    __tablename__ = "documentation_ingest_parse_jobs"

    ingest_job_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("documentation_ingest_jobs.id"),
        nullable=False,
    )
    llamaparse_job_id: Mapped[str] = mapped_column(nullable=False)
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

    ingest_job: Mapped[DocumentationIngestJob] = relationship(
        back_populates="parse_jobs",
    )


class DocumentationIngestEmbeddingJob(Base, IdMixin, CreatedAtMixin):
    __tablename__ = "documentation_ingest_embedding_jobs"

    provider: Mapped[str] = mapped_column(nullable=False)
    model: Mapped[str] = mapped_column(nullable=False)
    usage: Mapped[DocumentationIngestJobEmbeddingsJobUsage] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
    )

    ingest_job: Mapped[DocumentationIngestJob] = relationship(
        back_populates="embedding_job",
    )


class DocumentationIngestJob(Base, IdMixin, CreatedAtMixin, UpdatedAtMixin):
    __tablename__ = "documentation_ingest_jobs"

    user_id: Mapped[str] = mapped_column(nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)
    source_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("documentation_ingest_sources.id"))
    # parse_job_id: Mapped[uuid.UUID] = mapped_column(
    #     ForeignKey("documentation_ingest_parse_jobs.id")
    # )
    embedding_job_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("documentation_ingest_embedding_jobs.id"),
        nullable=True,
    )
    status: Mapped[DocumentationIngestJobStatus] = mapped_column(
        Enum(
            DocumentationIngestJobStatus,
            name="documentation_ingest_job_status",
            values_callable=lambda enum: [e.value for e in enum],
        ),
        default=DocumentationIngestJobStatus.PENDING,
    )

    source: Mapped[DocumentationIngestSource] = relationship(
        back_populates="ingest_jobs",
    )
    parse_jobs: Mapped[list[DocumentationIngestParseJob]] = relationship(
        back_populates="ingest_job",
    )
    embedding_job: Mapped[DocumentationIngestEmbeddingJob] = relationship(
        back_populates="ingest_job",
    )


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
    embedding: Mapped[list[float]] = mapped_column(
        Vector(1536),
        nullable=False,
    )
    # created_at: Mapped[datetime] = mapped_column(
    #     DateTime(timezone=True),
    #     server_default=func.now(),
    # )
