'use client';

import { useState } from 'react';
import { SearchCode, ChevronDown, ChevronUp } from 'lucide-react';

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, ItemActions } from '@/components/ui/item';
import { Button } from '@/components/ui/button';

import DocumentationIngestJobTestingResultsItemChunks from './item-chunks';

export default function DocumentationIngestJobTestingResultsItem({ test }) {
  const [itemOpen, setItemOpen] = useState(true);

  const resultChunksCount = test.chunks.length;

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <SearchCode />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{test.phrase}</ItemTitle>
        <ItemDescription>Method: {test.method}</ItemDescription>
        <ItemDescription>Metric: {test.metric}</ItemDescription>
        <ItemDescription>Results: {resultChunksCount}</ItemDescription>
        {itemOpen && resultChunksCount > 0 && <DocumentationIngestJobTestingResultsItemChunks chunks={test.chunks} />}
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
