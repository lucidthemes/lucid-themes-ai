'use client';

import { useState } from 'react';

import {
  Card,
  //  CardContent
} from '@/components/ui/card';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

import DocumentationIngestJobChunksHeader from './header';
// import DocumentationIngestJobChunksItems from './items';
// import DocumentationIngestJobChunksFooter from './footer';

import DocumentationIngestJobChunksContent from './content';

export default function DocumentationIngestJobChunks({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  const [expanded, setExpanded] = useState(true);

  // if (
  //   ingestJobStatus === 'new' ||
  //   (ingestJobStatus === 'pending' && !ingestJobData.chunks) ||
  //   (ingestJobStatus === 'pending' && ingestJobData.chunks.length === 0)
  // )
  //   return;

  if (ingestJobStatus === 'new') return;

  // const chunks = [
  //   { id: '1', content: 'A practical talk on component APIs, accessibility, and shipping faster.' },
  //   { id: '2', content: 'A practical talk on component APIs, accessibility, and shipping faster.' },
  // ];

  // const chunks = ingestJobData.chunks;

  const chunks = ingestJobData.chunks;

  const isPending = false;

  return (
    <Card className="mx-auto w-full">
      <DocumentationIngestJobChunksHeader
        ingestJobStatus={ingestJobStatus}
        expanded={expanded}
        setExpanded={setExpanded}
        isPending={isPending}
        ingestJobData={ingestJobData}
        chunks={chunks}
      />
      <DocumentationIngestJobChunksContent
        ingestJobStatus={ingestJobStatus}
        expanded={expanded}
        isPending={isPending}
        chunks={chunks}
      />
      {/* {expanded && (
        <CardContent className="flex flex-col gap-5">
          <DocumentationIngestJobChunksItems chunks={chunks} />

          {isPending && <DocumentationIngestJobLoading title="Generating embeddings" />}
        </CardContent>
      )}
      {ingestJobStatus !== 'completed' && expanded && !isPending && <DocumentationIngestJobChunksFooter />} */}
    </Card>
  );
}
