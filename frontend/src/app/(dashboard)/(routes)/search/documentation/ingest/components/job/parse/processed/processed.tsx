'use client';

import { useState } from 'react';

import { CardContent } from '@/components/ui/card';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../../schemas/ingest-job.schema';

import DocumentationIngestJobParseProcessedDocument from './document';
import DocumentationIngestJobParseProcessedWebpage from './web-page';
import DocumentationIngestJobParseProcessedFooter from './footer';

export default function DocumentationIngestJobParseProcessed({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  const [viewContentOpen, setViewContentOpen] = useState(false);
  const [viewContentSplit, setViewContentSplit] = useState(false);

  if (ingestJobStatus === 'new' || (ingestJobStatus === 'pending' && ingestJobData.parse_job.status !== 'completed'))
    return;

  return (
    <>
      <CardContent>
        <DocumentationIngestJobParseProcessedDocument
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
          ingestJobData={ingestJobData}
        />
        <DocumentationIngestJobParseProcessedWebpage
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
          ingestJobData={ingestJobData}
        />
      </CardContent>
      <DocumentationIngestJobParseProcessedFooter ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
    </>
  );
}
