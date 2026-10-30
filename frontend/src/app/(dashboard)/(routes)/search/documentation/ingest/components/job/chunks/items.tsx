import type { DocumentationIngestJobStatus, DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';
import type { DocumentationIngestJobParseChunk } from '../../../(routes)/new/schemas/parse-chunks-form.schema';

import DocumentationIngestJobChunksItem from './item';

export default function DocumentationIngestJobChunksItems({
  ingestJobStatus,
  chunks,
  showMetadata,
  showEmbeddings,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  chunks: DocumentationIngestJobChunk[] | DocumentationIngestJobParseChunk[];
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
