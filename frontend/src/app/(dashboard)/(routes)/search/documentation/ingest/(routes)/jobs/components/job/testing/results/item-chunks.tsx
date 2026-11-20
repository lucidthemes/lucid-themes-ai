import type { DocumentationIngestJobChunk } from '../../../../schemas/ingest-job.schema';

import DocumentationIngestJobTestingResultsItemChunk from './item-chunk';

export default function DocumentationIngestJobTestingResultsItemChunks({
  chunks,
  showMetadata,
  showEmbeddings,
}: {
  chunks: DocumentationIngestJobChunk[] | null;
  showMetadata: boolean;
  showEmbeddings: boolean;
}) {
  if (!chunks) return;

  return (
    <div className="mt-2.5 flex flex-col gap-5">
      {chunks.map((chunk) => (
        <DocumentationIngestJobTestingResultsItemChunk
          key={chunk.id}
          chunk={chunk}
          showMetadata={showMetadata}
          showEmbeddings={showEmbeddings}
        />
      ))}
    </div>
  );
}
