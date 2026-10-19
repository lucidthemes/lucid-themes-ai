'use client';

import { useState } from 'react';

import { CardContent } from '@/components/ui/card';

import type { DocumentationIngestJobStatus } from '../../../../types/ingest-job';

import DocumentationIngestJobParseProcessedDocument from './document';
import DocumentationIngestJobParseProcessedWebpage from './web-page';
import DocumentationIngestJobParseProcessedFooter from './footer';

export default function DocumentationIngestJobParseProcessed({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData;
}) {
  const [viewContentOpen, setViewContentOpen] = useState(false);
  const [viewContentSplit, setViewContentSplit] = useState(false);

  if (
    ingestJobStatus === 'new' ||
    (ingestJobStatus === 'pending' && ingestJobData && ingestJobData.parseJob.status !== 'completed')
  )
    return;

  return (
    <>
      <CardContent>
        <DocumentationIngestJobParseProcessedDocument
          ingestJobData={ingestJobData}
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
        />
        <DocumentationIngestJobParseProcessedWebpage
          ingestJobData={ingestJobData}
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
        />
      </CardContent>
      <DocumentationIngestJobParseProcessedFooter ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
    </>
  );
}
