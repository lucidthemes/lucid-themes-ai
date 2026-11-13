import type { TransitionStartFunction } from 'react';

import { CardFooter } from '@/components/ui/card';

import type {
  DocumentationIngestJobStatus,
  DocumentationIngestJobChunk,
  DocumentationIngestJob,
} from '../../../schemas/ingest-job.schema';

import DocumentationIngestJobChunksCreateForm from './create';
import DocumentationIngestJobChunksEmbeddingsButton from './embeddings-button';

export default function DocumentationIngestJobChunksFooter({
  ingestJobStatus,
  ingestJobData,
  expanded,
  isPending,
  startTransition,
  chunks,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData: DocumentationIngestJob;
  expanded: boolean;
  isPending: boolean;
  startTransition: TransitionStartFunction;
  chunks?: DocumentationIngestJobChunk[] | null;
}) {
  if (ingestJobStatus === 'completed' || !ingestJobData) return;

  return (
    <CardFooter className="justify-end">
      {!chunks && (
        <DocumentationIngestJobChunksCreateForm ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
      )}
      {chunks && chunks.length > 0 && expanded && !isPending && (
        <DocumentationIngestJobChunksEmbeddingsButton ingestJobData={ingestJobData} startTransition={startTransition} />
      )}
    </CardFooter>
  );
}
