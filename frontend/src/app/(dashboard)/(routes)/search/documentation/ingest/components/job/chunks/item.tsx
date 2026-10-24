'use client';

import { useState } from 'react';
import { SquareText, ChevronDown, ChevronUp, Trash } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Textarea } from '@/components/ui/textarea';

import { useIngestJobNewStore } from '../../../(routes)/new/store/ingest-job-new.store';
import type { DocumentationIngestJobStatus, DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';
import type { DocumentationIngestJobParseChunk } from '../../../(routes)/new/schemas/parse-chunks-form.schema';

export default function DocumentationIngestJobChunksItem({
  ingestJobStatus,
  chunk,
  showVectors,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  chunk: DocumentationIngestJobChunk | DocumentationIngestJobParseChunk;
  showVectors: boolean;
}) {
  const [open, setOpen] = useState(false);

  const { removeIngestJobParseChunk, updateIngestJobParseChunk } = useIngestJobNewStore(
    useShallow((state) => ({
      removeIngestJobParseChunk: state.removeIngestJobParseChunk,
      updateIngestJobParseChunk: state.updateIngestJobParseChunk,
    })),
  );

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
                <Textarea
                  id={`chunk-${chunk.id}`}
                  defaultValue={chunk.content}
                  onBlur={(e) =>
                    updateIngestJobParseChunk({ chunkId: chunk.id as number, chunkContent: e.target.value })
                  }
                />
              </div>
              {showVectors && 'vector' in chunk && chunk.vector && (
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
        {open && ingestJobStatus !== 'completed' && (
          <Button
            variant="destructive"
            size="icon"
            className="cursor-pointer"
            title="Remove chunk"
            onClick={() => removeIngestJobParseChunk(chunk.id as number)}
          >
            <Trash />
          </Button>
        )}
      </ItemActions>
    </Item>
  );
}
