'use client';

import { useState } from 'react';
import type { TransitionStartFunction } from 'react';

import { CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import type {
  DocumentationIngestJobStatus,
  //   DocumentationIngestJob,
  DocumentationIngestJobChunk,
} from '../../../schemas/ingest-job.schema';
import type { DocumentationIngestJobParseChunk } from '../../../(routes)/new/schemas/parse-chunks-form.schema';

import DocumentationIngestJobChunksItems from './items';
import DocumentationIngestJobChunksFooter from './footer';
import DocumentationIngestJobChunksEmbeddingsLoading from './loading';
import DocumentationIngestJobChunksEmpty from './empty';

export default function DocumentationIngestJobChunksContent({
  ingestJobStatus,
  expanded,
  isPending,
  startTransition,
  chunks,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  expanded: boolean;
  isPending: boolean;
  startTransition: TransitionStartFunction;
  chunks?: DocumentationIngestJobChunk[] | DocumentationIngestJobParseChunk[] | null;
}) {
  const [showVectors, setShowVectors] = useState(false);

  if (isPending) return <DocumentationIngestJobChunksEmbeddingsLoading />;

  if (!chunks || chunks.length === 0) return <DocumentationIngestJobChunksEmpty />;

  return (
    <>
      {expanded && (
        <CardContent className="flex flex-col gap-5">
          {ingestJobStatus === 'completed' && (
            <div className="flex items-center justify-end gap-2.5">
              <Switch
                id="airplane-mode"
                className="cursor-pointer"
                checked={showVectors}
                onCheckedChange={() => setShowVectors((showVectors) => !showVectors)}
              />
              <Label htmlFor="airplane-mode">Show embedding vectors</Label>
            </div>
          )}
          <DocumentationIngestJobChunksItems chunks={chunks} showVectors={showVectors} />
        </CardContent>
      )}
      {ingestJobStatus !== 'completed' && expanded && !isPending && (
        <DocumentationIngestJobChunksFooter startTransition={startTransition} />
      )}
    </>
  );
}
