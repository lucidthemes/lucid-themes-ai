'use client';

import { useState } from 'react';
import { SearchCode, ChevronDown, ChevronUp } from 'lucide-react';

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, ItemActions } from '@/components/ui/item';
import { Button } from '@/components/ui/button';

import DocumentationIngestJobTestingResultsItemChunks from './item-chunks';

export default function DocumentationIngestJobTestingResultsItem({}) {
  const [itemOpen, setItemOpen] = useState(true);

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <SearchCode />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>How do I install the theme?</ItemTitle>
        <ItemDescription>Method: semantic</ItemDescription>
        <ItemDescription>Metric: cosine distance</ItemDescription>
        <ItemDescription>Results: 5</ItemDescription>
        {itemOpen && <DocumentationIngestJobTestingResultsItemChunks />}
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
