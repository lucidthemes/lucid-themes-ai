import { CardContent } from '@/components/ui/card';

import type {
  DocumentationIngestJobStatus,
  //   DocumentationIngestJob,
  DocumentationIngestJobChunk,
} from '../../../schemas/ingest-job.schema';

import DocumentationIngestJobChunksItems from './items';
import DocumentationIngestJobChunksFooter from './footer';
import DocumentationIngestJobChunksEmbeddingsLoading from './loading';
import DocumentationIngestJobChunksEmpty from './empty';

export default function DocumentationIngestJobChunksContent({
  ingestJobStatus,
  expanded,
  isPending,
  chunks,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  expanded: boolean;
  isPending: boolean;
  chunks?: DocumentationIngestJobChunk[];
}) {
  if (isPending) return <DocumentationIngestJobChunksEmbeddingsLoading />;

  //   const chunks = ingestJobData.chunks;

  if (!chunks || chunks.length === 0) return <DocumentationIngestJobChunksEmpty />;

  return (
    <>
      {expanded && (
        <CardContent className="flex flex-col gap-5">
          <DocumentationIngestJobChunksItems chunks={chunks} />
        </CardContent>
      )}
      {ingestJobStatus !== 'completed' && expanded && !isPending && <DocumentationIngestJobChunksFooter />}
    </>
  );
}
