'use client';

import { useState } from 'react';
import { SquareText, ChevronDown, ChevronUp, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Textarea } from '@/components/ui/textarea';

import type { DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobChunksItem({
  chunk,
  showVectors,
}: {
  chunk: DocumentationIngestJobChunk;
  showVectors: boolean;
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
                <ItemTitle>Content</ItemTitle>
                <Textarea id={chunk.id} placeholder="Type your message here." defaultValue={chunk.content} />
              </div>
              {showVectors && (
                <div className="flex flex-col gap-y-1">
                  <ItemTitle>Vector</ItemTitle>
                  <Textarea id={chunk.id} placeholder="Type your message here." defaultValue={chunk.vector} />
                </div>
              )}
            </ItemContent>
          </Item>
        )}
      </ItemContent>
      <ItemActions className="flex flex-col gap-5">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpen((open) => !open)}
          className="cursor-pointer"
          title={!open ? 'Show content' : 'Hide content'}
        >
          {!open && <ChevronDown />}
          {open && <ChevronUp />}
        </Button>
        {open && (
          <Button variant="destructive" size="icon" className="cursor-pointer" title="Remove chunk">
            <Trash />
          </Button>
        )}
      </ItemActions>
    </Item>
  );
}
