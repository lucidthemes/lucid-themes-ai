'use client';

import { useState } from 'react';
import { useTransition } from 'react';

import { Card } from '@/components/ui/card';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

import DocumentationIngestJobChunksHeader from './header';
import DocumentationIngestJobChunksContent from './content';
import DocumentationIngestJobChunksFooter from './footer';

import { useIngestJobNewStore } from '../../../(routes)/new/store/ingest-job-new.store';

export default function DocumentationIngestJobChunks({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  const [expanded, setExpanded] = useState(true);

  const ingestJobChunksCreated = useIngestJobNewStore((state) => state.ingestJobChunksCreated);

  const [isPending, startTransition] = useTransition();

  // if (ingestJobStatus === 'new' || (ingestJobStatus === 'pending' && ingestJobData?.parse_job.status === 'pending'))
  //   return;

  console.log(ingestJobChunksCreated);

  const chunks =
    ingestJobStatus === 'completed' && ingestJobData
      ? ingestJobData.chunks
      : ingestJobStatus === 'pending'
        ? ingestJobChunksCreated
        : null;

  return (
    <Card className="mx-auto w-full">
      <DocumentationIngestJobChunksHeader
        ingestJobStatus={ingestJobStatus}
        ingestJobData={ingestJobData}
        expanded={expanded}
        setExpanded={setExpanded}
        isPending={isPending}
        startTransition={startTransition}
        chunks={chunks}
      />
      <DocumentationIngestJobChunksContent
        ingestJobStatus={ingestJobStatus}
        expanded={expanded}
        isPending={isPending}
        // startTransition={startTransition}
        chunks={chunks}
      />
      <DocumentationIngestJobChunksFooter
        ingestJobStatus={ingestJobStatus}
        ingestJobData={ingestJobData}
        expanded={expanded}
        isPending={isPending}
        startTransition={startTransition}
        chunks={chunks}
      />
    </Card>
  );
}
