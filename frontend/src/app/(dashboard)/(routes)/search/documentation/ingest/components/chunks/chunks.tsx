'use client';

import { useState } from 'react';

import { Card } from '@/components/ui/card';

import DocumentationIngestLoading from '../loading';

import DocumentationIngestChunksHeader from './header';
import DocumentationIngestChunksItems from './items';
import DocumentationIngestChunksFooter from './footer';

export default function DocumentationIngestChunks() {
  const [expanded, setExpanded] = useState(true);

  const chunks = [
    { id: '1', content: 'A practical talk on component APIs, accessibility, and shipping faster.' },
    { id: '2', content: 'A practical talk on component APIs, accessibility, and shipping faster.' },
  ];

  return (
    <Card className="relative mx-auto w-full">
      <DocumentationIngestChunksHeader expanded={expanded} setExpanded={setExpanded} />
      {expanded && (
        <>
          <DocumentationIngestChunksItems chunks={chunks} />
          <DocumentationIngestChunksFooter />
        </>
      )}

      <DocumentationIngestLoading />
    </Card>
  );
}
