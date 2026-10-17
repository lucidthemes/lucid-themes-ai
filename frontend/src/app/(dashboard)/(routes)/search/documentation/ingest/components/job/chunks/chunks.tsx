'use client';

import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import type { DocumentationIngestJobStatus } from '../../../types/ingest-job';

import DocumentationIngestJobChunksHeader from './header';
import DocumentationIngestJobChunksItems from './items';
import DocumentationIngestJobChunksFooter from './footer';

import DocumentationIngestJobLoading from '../loading';

export default function DocumentationIngestJobChunks({ jobStatus }: { jobStatus: DocumentationIngestJobStatus }) {
  const [expanded, setExpanded] = useState(true);

  const chunks = [
    { id: '1', content: 'A practical talk on component APIs, accessibility, and shipping faster.' },
    { id: '2', content: 'A practical talk on component APIs, accessibility, and shipping faster.' },
  ];

  const loading = false;

  return (
    <Card className="mx-auto w-full">
      <DocumentationIngestJobChunksHeader jobStatus={jobStatus} expanded={expanded} setExpanded={setExpanded} />
      {expanded && (
        <CardContent className="flex flex-col gap-5">
          {!loading && <DocumentationIngestJobChunksItems chunks={chunks} />}

          {loading && <DocumentationIngestJobLoading title="Generating embeddings" />}
        </CardContent>
      )}
      {jobStatus !== 'completed' && expanded && !loading && <DocumentationIngestJobChunksFooter />}
    </Card>
  );
}
