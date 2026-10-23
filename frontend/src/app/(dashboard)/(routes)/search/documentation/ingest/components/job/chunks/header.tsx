import type { Dispatch, SetStateAction, TransitionStartFunction } from 'react';

import { Maximize2, Minimize2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type {
  DocumentationIngestJobStatus,
  DocumentationIngestJob,
  DocumentationIngestJobChunk,
} from '../../../schemas/ingest-job.schema';
import type { DocumentationIngestJobParseChunk } from '../../../(routes)/new/schemas/parse-chunks-form.schema';

import DocumentationIngestJobChunksEmbeddingsButton from './embeddings-button';

export default function DocumentationIngestJobChunksHeader({
  ingestJobStatus,
  expanded,
  setExpanded,
  isPending,
  startTransition,
  ingestJobData,
  chunks,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  startTransition: TransitionStartFunction;
  ingestJobData?: DocumentationIngestJob;
  chunks?: DocumentationIngestJobChunk[] | DocumentationIngestJobParseChunk[] | null;
}) {
  const chunksTitleType = ingestJobData?.source.type ?? '';

  return (
    <CardHeader>
      <CardTitle>
        <span className="capitalize">{chunksTitleType}</span> chunks ({chunks?.length ?? 0})
      </CardTitle>
      <CardDescription>A practical talk on component APIs, accessibility, and shipping faster.</CardDescription>
      {!isPending && chunks && chunks.length > 0 && (
        <CardAction className="flex gap-5 self-center">
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
            <DocumentationIngestJobChunksEmbeddingsButton startTransition={startTransition} />
          )}
        </CardAction>
      )}
    </CardHeader>
  );
}
