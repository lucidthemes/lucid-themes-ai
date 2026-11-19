'use client';

import { useState } from 'react';
import { SquareText, ChevronDown, ChevronUp } from 'lucide-react';

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, ItemActions } from '@/components/ui/item';
import { Button } from '@/components/ui/button';

export default function DocumentationIngestJobTestingResultsItemChunk() {
  const [itemResultOpen, setItemResultOpen] = useState(true);

  return (
    <Item variant="outline">
      <ItemMedia variant="icon" className="translate-y-0! self-center!">
        <SquareText />
      </ItemMedia>
      <ItemContent>
        <ItemTitle># 018204a2-9e58-4618-affe-e313be132aee</ItemTitle>
        <ItemDescription>Similarity score: 0.8</ItemDescription>
        {itemResultOpen && (
          <Item variant="muted" className="mt-2.5 grow items-start">
            <p>test</p>
          </Item>
        )}
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setItemResultOpen((open) => !open)}
          className="cursor-pointer"
          title={!itemResultOpen ? 'Show content' : 'Hide content'}
        >
          {!itemResultOpen && <ChevronDown />}
          {itemResultOpen && <ChevronUp />}
        </Button>
      </ItemActions>
    </Item>
  );
}
