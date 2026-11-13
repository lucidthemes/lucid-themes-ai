import type { Dispatch, SetStateAction, TransitionStartFunction } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type {
  DocumentationIngestJobStatus,
  DocumentationIngestJob,
  DocumentationIngestJobChunk,
} from '../../../schemas/ingest-job.schema';

import DocumentationIngestJobChunksEmbeddingsButton from './embeddings-button';

export default function DocumentationIngestJobChunksHeader({
  ingestJobStatus,
  ingestJobData,
  expanded,
  setExpanded,
  isPending,
  startTransition,

  chunks,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData: DocumentationIngestJob;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  startTransition: TransitionStartFunction;
  chunks?: DocumentationIngestJobChunk[] | null;
}) {
  if (!ingestJobData) return;

  const chunksTitleType = ingestJobData?.source.type ?? '';

  return (
    <CardHeader>
      <CardTitle>
        <span className="capitalize">{chunksTitleType}</span> chunks ({chunks?.length ?? 0})
      </CardTitle>
      <CardDescription>Create chunks and generate embeddings</CardDescription>
      {!isPending && chunks && chunks.length > 0 && (
        <CardAction className="flex flex-col gap-5 self-center md:flex-row">
          <Button className="cursor-pointer" variant="secondary" onClick={() => setExpanded((expanded) => !expanded)}>
            {!expanded && (
              <>
                Expand <Maximize2 />
              </>
            )}
            {expanded && (
              <>
                Minimize <Minimize2 />
              </>
            )}
          </Button>

          {ingestJobStatus !== 'completed' && (
            <DocumentationIngestJobChunksEmbeddingsButton
              ingestJobData={ingestJobData}
              startTransition={startTransition}
            />
          )}
        </CardAction>
      )}
    </CardHeader>
  );
}
