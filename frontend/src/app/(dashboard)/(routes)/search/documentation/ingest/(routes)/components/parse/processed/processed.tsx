'use client';

import { useState } from 'react';

import { CardContent } from '@/components/ui/card';

import DocumentationIngestParseProcessedDocument from './document';
import DocumentationIngestParseProcessedWebpage from './web-page';
import DocumentationIngestParseProcessedFooter from './footer';

export default function DocumentationIngestParseProcessed() {
  const [viewContentOpen, setViewContentOpen] = useState(false);
  const [viewContentSplit, setViewContentSplit] = useState(false);

  return (
    <>
      <CardContent>
        <DocumentationIngestParseProcessedDocument
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
        />
        <DocumentationIngestParseProcessedWebpage
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
        />
      </CardContent>
      <DocumentationIngestParseProcessedFooter />
    </>
  );
}
