import type { DocumentationIngestJobStatus, DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';
// import type { DocumentationIngestJobChunksCreateFormChunk } from '../../../(routes)/new/schemas/chunks-create-form.schema';

import DocumentationIngestJobChunksItem from './item';

export default function DocumentationIngestJobChunksItems({
  ingestJobStatus,
  chunks,
  showMetadata,
  showEmbeddings,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  // chunks: DocumentationIngestJobChunk[] | DocumentationIngestJobChunksCreateFormChunk[];
  chunks: DocumentationIngestJobChunk[];
  showMetadata: boolean;
  showEmbeddings: boolean;
}) {
  return (
    <div className="flex flex-col gap-5">
      {chunks.map((chunk) => (
        <DocumentationIngestJobChunksItem
          key={chunk.id}
          ingestJobStatus={ingestJobStatus}
          chunk={chunk}
          showMetadata={showMetadata}
          showEmbeddings={showEmbeddings}
        />
      ))}
    </div>
  );
}
