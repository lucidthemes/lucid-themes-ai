'use client';

import { useState } from 'react';

import { CardContent } from '@/components/ui/card';

import type { DocumentationIngestJobStatus } from '../../../../types/ingest-job';

import DocumentationIngestJobParseProcessedDocument from './document';
import DocumentationIngestJobParseProcessedWebpage from './web-page';
import DocumentationIngestJobParseProcessedFooter from './footer';

export default function DocumentationIngestJobParseProcessed({
  ingestJobStatus,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
}) {
  const [viewContentOpen, setViewContentOpen] = useState(false);
  const [viewContentSplit, setViewContentSplit] = useState(false);

  return (
    <>
      <CardContent>
        <DocumentationIngestJobParseProcessedDocument
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
        />
        <DocumentationIngestJobParseProcessedWebpage
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
        />
      </CardContent>
      {ingestJobStatus !== 'completed' && <DocumentationIngestJobParseProcessedFooter />}
    </>
  );
}
