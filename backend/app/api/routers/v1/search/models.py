import uuid
from typing import Any

from pgvector.sqlalchemy import Vector
from sqlalchemy import Enum, ForeignKey, Uuid
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.common import CreatedAtMixin, IdMixin, UpdatedAtMixin

from .schemas import (
    DocumentationIngestParseJobTier,
    DocumentationIngestSourceType,
    DocumentationIngestStatus,
)


class DocumentationIngestSource(Base, IdMixin, CreatedAtMixin):
    __tablename__ = "documentation_ingest_sources"

    type: Mapped[DocumentationIngestSourceType] = mapped_column(
        Enum(
            DocumentationIngestSourceType,
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
    status: Mapped[DocumentationIngestStatus] = mapped_column(
        Enum(
            DocumentationIngestStatus,
            name="documentation_ingest_parse_job_status",
            values_callable=lambda enum: [e.value for e in enum],
        ),
        default=DocumentationIngestStatus.PENDING,
    )
    markdown_full: Mapped[str | None] = mapped_column(nullable=True)
    text_full: Mapped[str | None] = mapped_column(nullable=True)
    tier: Mapped[DocumentationIngestParseJobTier] = mapped_column(
        Enum(
            DocumentationIngestParseJobTier,
            name="documentation_ingest_parse_job_tier",
            values_callable=lambda enum: [e.value for e in enum],
        ),
    )
    error_message: Mapped[str | None] = mapped_column(nullable=True)
    usage: Mapped[dict | None] = mapped_column(
        JSONB,
        nullable=True,
        default=dict,
    )

    ingest_job: Mapped[DocumentationIngestJob] = relationship(
        back_populates="parse_jobs",
    )


class DocumentationIngestEmbeddingJob(Base, IdMixin, CreatedAtMixin):
    __tablename__ = "documentation_ingest_embedding_jobs"

    parse_job_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("documentation_ingest_parse_jobs.id"),
        nullable=False,
    )
    provider: Mapped[str] = mapped_column(nullable=False)
    model: Mapped[str] = mapped_column(nullable=False)
    usage: Mapped[dict] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
    )

    parse_job: Mapped[DocumentationIngestParseJob] = relationship()


class DocumentationIngestJob(Base, IdMixin, CreatedAtMixin, UpdatedAtMixin):
    __tablename__ = "documentation_ingest_jobs"

    user_id: Mapped[uuid.UUID] = mapped_column(Uuid, nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)
    source_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("documentation_ingest_sources.id"))
    embedding_job_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("documentation_ingest_embedding_jobs.id"),
        nullable=True,
    )
    status: Mapped[DocumentationIngestStatus] = mapped_column(
        Enum(
            DocumentationIngestStatus,
            name="documentation_ingest_job_status",
            values_callable=lambda enum: [e.value for e in enum],
        ),
        default=DocumentationIngestStatus.PENDING,
    )

    source: Mapped[DocumentationIngestSource] = relationship(
        back_populates="ingest_jobs",
    )
    parse_jobs: Mapped[list[DocumentationIngestParseJob]] = relationship(
        back_populates="ingest_job",
    )
    embedding_job: Mapped[DocumentationIngestEmbeddingJob | None] = relationship(
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
