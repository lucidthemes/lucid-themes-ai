'use client';

import { useState } from 'react';
import { SquareText, ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Textarea } from '@/components/ui/textarea';

export default function DocumentationIngestChunksItem({
  chunk,
}: {
  chunk: {
    id: string;
    content: string;
  };
}) {
  const [open, setOpen] = useState(false);

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <SquareText />
      </ItemMedia>
      <ItemContent>
        <ItemTitle># {chunk.id}</ItemTitle>
        {open && (
          <Item variant="muted">
            <ItemContent className="gap-y-2.5">
              <div className="flex flex-col gap-y-1">
                <ItemTitle>Markdown</ItemTitle>
                <Textarea id={chunk.id} placeholder="Type your message here." defaultValue={chunk.content} />
              </div>
              <div className="flex flex-col gap-y-1">
                <ItemTitle>Vector</ItemTitle>
                <Textarea id={chunk.id} placeholder="Type your message here." defaultValue={chunk.content} />
              </div>
            </ItemContent>
          </Item>
        )}
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="icon" onClick={() => setOpen((open) => !open)} className="cursor-pointer">
          {!open && <ChevronDown />}
          {open && <ChevronUp />}
        </Button>
      </ItemActions>
    </Item>
  );
}
