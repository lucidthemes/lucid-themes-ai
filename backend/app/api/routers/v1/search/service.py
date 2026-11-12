import uuid

from langchain_text_splitters import MarkdownHeaderTextSplitter, RecursiveCharacterTextSplitter

# from sqlalchemy import func, select
# from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

# from app.api.utils import is_valid_uuid
# from .models import (
#     DocumentationChunk,
#     DocumentationIngestEmbeddingJob,
#     DocumentationIngestJob,
#     DocumentationIngestParseJob,
#     DocumentationIngestSource,
# )
from .schemas import (
    DocumentationIngestChunksResponse,
    DocumentationIngestEmbeddingJobsResponse,
    DocumentationIngestJobChunksResponseChunk,
    DocumentationIngestJobSource,
    DocumentationIngestJobsResponse,
    DocumentationIngestParseJobsResponse,
    DocumentationIngestSourcesResponse,
    DocumentationIngestSourceType,
    DocumentationIngestStatus,
    # DocumentationIngestJobResponse
)

# from fastapi import HTTPException


async def get_documentation_ingest_jobs(
    db: AsyncSession,
    limit: int = 10,
    offset: int = 0,
    sort_by_desc: bool = True,
    include_count: bool = False,
    query: str | None = None,
    status: DocumentationIngestStatus | None = None,
):
    # stmt = select(
    #     DocumentationIngestJob.id,
    #     DocumentationIngestJob.name,
    #     DocumentationIngestJob.status,
    #     DocumentationIngestJob.created_at,
    #     DocumentationIngestJob.updated_at,
    # )

    # stmt = stmt.limit(limit).offset(offset)

    # if sort_by_desc:
    #     stmt = stmt.order_by(DocumentationIngestJob.created_at.desc())
    # else:
    #     stmt = stmt.order_by(DocumentationIngestJob.created_at.asc())

    # filters = []

    # if query:
    #     if is_valid_uuid(query):
    #         filters.append(DocumentationIngestJob.id == query)
    #     else:
    #         filters.append(DocumentationIngestJob.name.ilike(f"%{query}%"))

    # if status:
    #     filters.append(DocumentationIngestJob.status == status)

    # stmt = stmt.where(*filters)

    # result = await db.execute(stmt)
    # jobs = result.scalars().all()

    # total_count = None

    # if include_count:
    #     count_stmt = select(func.count()).select_from(DocumentationIngestJob).where(*filters)

    #     count_result = await db.execute(count_stmt)
    #     total_count = count_result.scalar_one()

    # return DocumentationIngestJobsResponse(data=jobs, count=total_count)

    if include_count:
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
            ],
            count=2,
        )
    else:
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


async def get_documentation_ingest_job(
    job_id: uuid.UUID,
    db: AsyncSession,
):
    # stmt = (
    #     select(DocumentationIngestJob)
    #     .where(DocumentationIngestJob.id == job_id)
    #     .options(
    #         joinedload(DocumentationIngestJob.source),
    #         selectinload(DocumentationIngestJob.parse_jobs),
    #         joinedload(DocumentationIngestJob.embedding_job),
    #     )
    # )

    # result = await db.execute(stmt)
    # job = result.unique().scalar_one_or_none()

    # if not job:
    #     raise HTTPException(status_code=404, detail="Job not found")

    # return DocumentationIngestJobResponse(data=job)
    return "test"


async def get_documentation_ingest_sources(
    db: AsyncSession,
    limit: int = 10,
    offset: int = 0,
    sort_by_desc: bool = True,
    include_count: bool = False,
    query: str | None = None,
    type: DocumentationIngestSourceType | None = None,
):
    # stmt = select(DocumentationIngestSource)

    # stmt = stmt.limit(limit).offset(offset)

    # if sort_by_desc:
    #     stmt = stmt.order_by(DocumentationIngestSource.created_at.desc())
    # else:
    #     stmt = stmt.order_by(DocumentationIngestSource.created_at.asc())

    # filters = []

    # if query and is_valid_uuid(query):
    #     filters.append(DocumentationIngestSource.id == query)

    # if type:
    #     filters.append(DocumentationIngestSource.type == type)

    # stmt = stmt.where(*filters)

    # result = await db.execute(stmt)
    # sources = result.scalars().all()

    # total_count = None

    # if include_count:
    #     count_stmt = select(func.count()).select_from(DocumentationIngestSource).where(*filters)

    #     count_result = await db.execute(count_stmt)
    #     total_count = count_result.scalar_one()

    # return DocumentationIngestSourcesResponse(data=sources, count=total_count)

    if include_count:
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
            ],
            count=2,
        )
    else:
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


async def get_documentation_ingest_parse_jobs(
    db: AsyncSession,
    limit: int = 10,
    offset: int = 0,
    sort_by_desc: bool = True,
    include_count: bool = False,
    query: str | None = None,
    status: DocumentationIngestStatus | None = None,
):
    # stmt = select(DocumentationIngestParseJob)

    # stmt = stmt.limit(limit).offset(offset)

    # if sort_by_desc:
    #     stmt = stmt.order_by(DocumentationIngestParseJob.created_at.desc())
    # else:
    #     stmt = stmt.order_by(DocumentationIngestParseJob.created_at.asc())

    # filters = []

    # if query and is_valid_uuid(query):
    #     filters.append(DocumentationIngestParseJob.id == query)

    # if status:
    #     filters.append(DocumentationIngestParseJob.status == status)

    # stmt = stmt.where(*filters)

    # result = await db.execute(stmt)
    # parse_jobs = result.scalars().all()

    # total_count = None

    # if include_count:
    #     count_stmt = select(func.count()).select_from(DocumentationIngestParseJob).where(*filters)

    #     count_result = await db.execute(count_stmt)
    #     total_count = count_result.scalar_one()

    # return DocumentationIngestParseJobsResponse(data=parse_jobs, count=total_count)

    if include_count:
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
            ],
            count=3,
        )
    else:
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


async def get_documentation_ingest_embedding_jobs(
    db: AsyncSession,
    limit: int = 10,
    offset: int = 0,
    sort_by_desc: bool = True,
    include_count: bool = False,
    query: str | None = None,
):
    # stmt = select(DocumentationIngestEmbeddingJob)

    # stmt = stmt.limit(limit).offset(offset)

    # if sort_by_desc:
    #     stmt = stmt.order_by(DocumentationIngestEmbeddingJob.created_at.desc())
    # else:
    #     stmt = stmt.order_by(DocumentationIngestEmbeddingJob.created_at.asc())

    # filters = []

    # if query and is_valid_uuid(query):
    #     filters.append(DocumentationIngestEmbeddingJob.id == query)

    # stmt = stmt.where(*filters)

    # result = await db.execute(stmt)
    # embedding_jobs = result.scalars().all()

    # total_count = None

    # if include_count:
    #     count_stmt = (
    #         select(func.count()).select_from(DocumentationIngestEmbeddingJob).where(*filters)
    #     )

    #     count_result = await db.execute(count_stmt)
    #     total_count = count_result.scalar_one()

    # return DocumentationIngestEmbeddingJobsResponse(data=embedding_jobs, count=total_count)

    if include_count:
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
            ],
            count=2,
        )
    else:
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


async def get_documentation_ingest_chunks(
    db: AsyncSession,
    limit: int = 10,
    offset: int = 0,
    sort_by_desc: bool = True,
    include_count: bool = False,
    query: str | None = None,
):
    # stmt = select(DocumentationChunk)

    # stmt = stmt.limit(limit).offset(offset)

    # if sort_by_desc:
    #     stmt = stmt.order_by(DocumentationChunk.created_at.desc())
    # else:
    #     stmt = stmt.order_by(DocumentationChunk.created_at.asc())

    # filters = []

    # if query and is_valid_uuid(query):
    #     filters.append(DocumentationChunk.id == query)

    # stmt = stmt.where(*filters)

    # result = await db.execute(stmt)
    # chunks = result.scalars().all()

    # total_count = None

    # if include_count:
    #     count_stmt = select(func.count()).select_from(DocumentationChunk).where(*filters)

    #     count_result = await db.execute(count_stmt)
    #     total_count = count_result.scalar_one()

    # return DocumentationIngestChunksResponse(data=chunks, count=total_count)

    if include_count:
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
            ],
            count=3,
        )
    else:
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


example_markdown = """# Markdown syntax guide
## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](/image/Markdown-mark.svg "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

```
let message = 'Hello world';
alert(message);
```

## Mermaid diagrams
```mermaid
graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[Finish]
  B -->|No| D[Alternate]
```

## Inline code

This web site is using `markedjs/marked`.
"""

example_text = """Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a vulputate odio. Praesent semper leo ligula, consequat ultricies justo fringilla a. Aenean feugiat vulputate magna, vel ornare neque vulputate sed. Aenean rutrum elit in nisl venenatis, sit amet hendrerit odio fermentum. Fusce et lectus id massa fermentum commodo. Integer facilisis sodales vulputate. Integer tincidunt euismod mauris ac hendrerit. Proin vel blandit eros. Morbi semper fermentum ullamcorper.

Nulla at fringilla sem, in aliquet neque. Duis hendrerit vestibulum augue, id fringilla nibh lacinia eget. Nam feugiat eu diam nec porttitor. Donec feugiat, neque vitae vulputate dictum, urna velit euismod ipsum, sed sollicitudin neque orci et nunc. Phasellus commodo auctor varius. Integer ut laoreet nibh. Pellentesque iaculis mauris eget augue gravida, in ullamcorper diam sagittis. Vestibulum laoreet mi in elit sollicitudin porta. Phasellus vel urna dui. Sed pretium lacus ex, sit amet placerat risus tempus a. Morbi sit amet quam congue, porta nisi eget, maximus est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc pharetra felis lectus, eu elementum dolor venenatis vitae. Integer a lobortis lectus.

Nullam massa nunc, placerat facilisis vulputate et, maximus nec odio. Donec convallis placerat nunc. Donec vel dictum purus, quis pharetra magna. Nam viverra rhoncus magna, id laoreet ipsum malesuada ut. Nullam aliquet convallis ipsum, sed imperdiet mi laoreet nec. Fusce et scelerisque tortor. Suspendisse potenti. Pellentesque erat libero, consectetur a luctus at, fermentum in nibh. Aliquam erat volutpat. Proin egestas felis sit amet sem efficitur, et rutrum lorem malesuada. Nulla vitae orci at sem viverra eleifend sed sit amet odio. Donec ut dolor sit amet eros convallis semper. Donec sit amet dapibus turpis, vel sodales neque. Aliquam erat volutpat. Integer lobortis rhoncus lorem, ac elementum nibh convallis sit amet.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ante tortor, dapibus sed dapibus eu, lobortis sit amet quam. Donec rhoncus mi quis auctor imperdiet. Nam convallis facilisis arcu ut faucibus. Donec quis porttitor mauris. Maecenas sed elit massa. Aenean varius justo et lorem finibus, ut euismod nisl commodo. Ut porta porttitor nibh, at ornare lorem consequat nec. Sed luctus nisi et enim tincidunt sagittis.

Mauris nec nunc dignissim, vulputate ex vel, pellentesque risus. Aliquam erat volutpat. Vestibulum at aliquet nulla. Curabitur varius lorem et consectetur aliquam. Nulla luctus ultrices molestie. Praesent pharetra ipsum quis ante viverra, sed bibendum libero luctus. Suspendisse non nunc ut nulla tincidunt congue quis vel libero. Duis auctor, nunc id malesuada iaculis, purus neque vehicula eros, eleifend sagittis nibh mauris ornare mauris. In tincidunt nulla purus, id lobortis mauris sagittis at."""


def documentation_ingest_chunk_source_metadata(source: DocumentationIngestJobSource):
    source_metadata = {}
    source_metadata["source_type"] = source.type

    if source.type == "document":
        source_metadata["file_name"] = source.file_name
        source_metadata["file_url"] = source.file_url
    elif source.type == "webpage":
        source_metadata["webpage_url"] = source.webpage_url

    return source_metadata


def documentation_ingest_chunk_split_markdown(
    chunk_size: int, chunk_overlap: int, content: str, source: DocumentationIngestJobSource
) -> list[DocumentationIngestJobChunksResponseChunk]:
    headers_to_split_on = [
        ("#", "Header 1"),
        ("##", "Header 2"),
        ("###", "Header 3"),
    ]

    markdown_splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=headers_to_split_on,
        strip_headers=False,
    )

    sections = markdown_splitter.split_text(example_markdown)

    recursive_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        add_start_index=False,
    )

    split_documents = recursive_splitter.split_documents(sections)

    source_metadata = documentation_ingest_chunk_source_metadata(source=source)

    structured_chunks = []

    for document in split_documents:
        document_metadata = source_metadata
        document_metadata.update(document.metadata)
        document_item = {
            "id": uuid.uuid4(),
            "content": document.page_content,
            "metadata": document_metadata,
        }
        structured_chunks.append(document_item)

    return structured_chunks


def documentation_ingest_chunk_split_text(
    chunk_size: int, chunk_overlap: int, content: str, source: DocumentationIngestJobSource
) -> list[DocumentationIngestJobChunksResponseChunk]:
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        is_separator_regex=False,
    )

    split_documents = text_splitter.split_text(example_text)

    source_metadata = documentation_ingest_chunk_source_metadata(source=source)

    structured_chunks = []

    for document in split_documents:
        document_metadata = source_metadata
        document_item = {"id": uuid.uuid4(), "content": document, "metadata": document_metadata}
        structured_chunks.append(document_item)

    return structured_chunks
