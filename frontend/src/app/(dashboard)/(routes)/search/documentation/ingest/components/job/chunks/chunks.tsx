'use client';

import { useState } from 'react';
import { useTransition } from 'react';

import { Card } from '@/components/ui/card';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

import DocumentationIngestJobChunksHeader from './header';

import DocumentationIngestJobChunksContent from './content';

import { useIngestJobNewStore } from '../../../(routes)/new/store/ingest-job-new.store';

export default function DocumentationIngestJobChunks({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  const [expanded, setExpanded] = useState(true);

  const ingestJobParseChunks = useIngestJobNewStore((state) => state.ingestJobParseChunks);

  const [isPending, startTransition] = useTransition();

  if (ingestJobStatus === 'new') return;

  const chunks =
    ingestJobStatus === 'completed' && ingestJobData
      ? ingestJobData.chunks
      : ingestJobStatus === 'pending'
        ? ingestJobParseChunks
        : null;

  return (
    <Card className="mx-auto w-full">
      <DocumentationIngestJobChunksHeader
        ingestJobStatus={ingestJobStatus}
        expanded={expanded}
        setExpanded={setExpanded}
        isPending={isPending}
        startTransition={startTransition}
        ingestJobData={ingestJobData}
        chunks={chunks}
      />
      <DocumentationIngestJobChunksContent
        ingestJobStatus={ingestJobStatus}
        expanded={expanded}
        isPending={isPending}
        startTransition={startTransition}
        chunks={chunks}
      />
    </Card>
  );
}
