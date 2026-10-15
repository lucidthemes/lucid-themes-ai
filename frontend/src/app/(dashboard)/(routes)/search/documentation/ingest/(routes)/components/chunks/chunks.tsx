'use client';

import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import DocumentationIngestChunksHeader from './header';
import DocumentationIngestChunksItems from './items';
import DocumentationIngestChunksFooter from './footer';

import DocumentationIngestLoading from '../loading';

export default function DocumentationIngestChunks() {
  const [expanded, setExpanded] = useState(true);

  const chunks = [
    { id: '1', content: 'A practical talk on component APIs, accessibility, and shipping faster.' },
    { id: '2', content: 'A practical talk on component APIs, accessibility, and shipping faster.' },
  ];

  const loading = false;

  return (
    <Card className="mx-auto w-full">
      <DocumentationIngestChunksHeader expanded={expanded} setExpanded={setExpanded} />
      {expanded && (
        <CardContent className="flex flex-col gap-5">
          {!loading && <DocumentationIngestChunksItems chunks={chunks} />}

          {loading && <DocumentationIngestLoading title="Generating embeddings" />}
        </CardContent>
      )}
      {expanded && !loading && <DocumentationIngestChunksFooter />}
    </Card>
  );
}
