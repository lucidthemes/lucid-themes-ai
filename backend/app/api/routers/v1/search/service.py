from langchain_text_splitters import MarkdownHeaderTextSplitter, RecursiveCharacterTextSplitter

from .schemas import DocumentationIngestJobNewChunk, DocumentationIngestJobSource

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


async def documentation_ingest_job_chunk_source_metadata(source: DocumentationIngestJobSource):
    source_metadata = {}
    source_metadata["source_type"] = source.type

    if source.type == "document":
        source_metadata["file_name"] = source.file_name
        source_metadata["file_url"] = source.file_url
    elif source.type == "webpage":
        source_metadata["webpage_url"] = source.webpage_url

    return source_metadata


async def documentation_ingest_job_chunk_split_markdown(
    chunk_size: int, chunk_overlap: int, content: str, source: DocumentationIngestJobSource
) -> list[DocumentationIngestJobNewChunk]:
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

    source_metadata = await documentation_ingest_job_chunk_source_metadata(source=source)

    structured_chunks = []

    for document in split_documents:
        document_metadata = source_metadata
        document_metadata.update(document.metadata)
        document_item = {"content": document.page_content, "metadata": document_metadata}
        structured_chunks.append(document_item)

    return structured_chunks


async def documentation_ingest_job_chunk_split_text(
    chunk_size: int, chunk_overlap: int, content: str, source: DocumentationIngestJobSource
) -> list[DocumentationIngestJobNewChunk]:
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        is_separator_regex=False,
    )

    split_documents = text_splitter.split_text(example_text)

    source_metadata = await documentation_ingest_job_chunk_source_metadata(source=source)

    structured_chunks = []

    for document in split_documents:
        document_metadata = source_metadata
        document_item = {"content": document, "metadata": document_metadata}
        structured_chunks.append(document_item)

    return structured_chunks
