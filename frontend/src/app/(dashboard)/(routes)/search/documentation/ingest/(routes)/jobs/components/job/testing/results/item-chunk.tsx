'use client';

import { useState } from 'react';
import { SquareText, ChevronDown, ChevronUp } from 'lucide-react';

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, ItemActions } from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import type { DocumentationIngestJobChunk } from '../../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobTestingResultsItemChunk({
  chunk,
  showMetadata,
  showEmbeddings,
}: {
  chunk: DocumentationIngestJobChunk;
  showMetadata: boolean;
  showEmbeddings: boolean;
}) {
  const [itemResultOpen, setItemResultOpen] = useState(true);

  return (
    <Item variant="outline">
      <ItemMedia variant="icon" className="translate-y-0! self-center!">
        <SquareText />
      </ItemMedia>
      <ItemContent>
        <ItemTitle># {chunk.id}</ItemTitle>
        <ItemDescription>Similarity score: 0.8</ItemDescription>
        {itemResultOpen && (
          <Item variant="muted" className="mt-2.5 grow items-start">
            <ItemContent className="gap-y-2.5">
              <div className="flex flex-col gap-5 xl:flex-row">
                <div className="flex grow flex-col gap-y-1.5">
                  <ItemTitle>Content</ItemTitle>
                  <Textarea
                    id={`test-chunk-${chunk.id}-content`}
                    defaultValue={chunk.content}
                    className="opacity-100!"
                    disabled
                  />
                </div>
                {showMetadata && (
                  <div className="flex basis-1/4 flex-col items-start gap-y-1.5">
                    <ItemTitle>Metadata</ItemTitle>
                    <Textarea
                      id={`test-chunk-${chunk.id}-metadata`}
                      defaultValue={JSON.stringify(chunk.metadata, null, 1)}
                      className="opacity-100!"
                      disabled
                    />
                  </div>
                )}
              </div>
              {showEmbeddings && (
                <div className="flex flex-col gap-y-1">
                  <ItemTitle>Embedding</ItemTitle>
                  <Textarea
                    id={`test-chunk-${chunk.id}-embedding`}
                    defaultValue={chunk.embedding}
                    className="opacity-100!"
                    disabled
                  />
                </div>
              )}
            </ItemContent>
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
