import type { Dispatch, SetStateAction } from 'react';

import { Maximize2, Minimize2, ChevronsLeftRightEllipsis } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type {
  DocumentationIngestJobStatus,
  DocumentationIngestJob,
  DocumentationIngestJobChunk,
} from '../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobChunksHeader({
  ingestJobStatus,
  expanded,
  setExpanded,
  isPending,
  ingestJobData,
  chunks,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  ingestJobData?: DocumentationIngestJob;
  chunks?: DocumentationIngestJobChunk[];
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
            <Button className="cursor-pointer">
              Generate embeddings <ChevronsLeftRightEllipsis />
            </Button>
          )}
        </CardAction>
      )}
    </CardHeader>
  );
}
