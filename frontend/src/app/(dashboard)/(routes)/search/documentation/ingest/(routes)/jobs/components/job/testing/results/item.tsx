'use client';

import { useState } from 'react';
import { SearchCode, ChevronDown, ChevronUp } from 'lucide-react';

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, ItemActions } from '@/components/ui/item';
import { Button } from '@/components/ui/button';

import type { DocumentationIngestJobTest } from '../../../../schemas/ingest-job-test.schema';

import DocumentationIngestJobTestingResultsItemChunks from './item-chunks';

export default function DocumentationIngestJobTestingResultsItem({
  test,
  showMetadata,
  showEmbeddings,
}: {
  test: DocumentationIngestJobTest;
  showMetadata: boolean;
  showEmbeddings: boolean;
}) {
  const [itemOpen, setItemOpen] = useState(true);

  const metricsMap = new Map([
    ['dot', 'dot product'],
    ['cosine', 'cosine distance'],
    ['euclidean', 'euclidean distance'],
  ]);

  const resultChunksCount = test.chunks?.length ?? 0;

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <SearchCode />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{test.phrase}</ItemTitle>
        <ItemDescription>Type: {test.search_type}</ItemDescription>
        <ItemDescription>Metric: {metricsMap.get(test.similarity_metric)}</ItemDescription>
        <ItemDescription>Results: {resultChunksCount}</ItemDescription>
        {itemOpen && resultChunksCount > 0 && (
          <DocumentationIngestJobTestingResultsItemChunks
            chunks={test.chunks}
            showMetadata={showMetadata}
            showEmbeddings={showEmbeddings}
          />
        )}
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setItemOpen((open) => !open)}
          className="cursor-pointer"
          title={!itemOpen ? 'Show results' : 'Hide results'}
        >
          {!itemOpen && <ChevronDown />}
          {itemOpen && <ChevronUp />}
        </Button>
      </ItemActions>
    </Item>
  );
}
