'use client';

import { useState } from 'react';
import { SquareText, ChevronDown, ChevronUp, Trash } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Textarea } from '@/components/ui/textarea';

import { useIngestJobNewStore } from '../../../(routes)/new/store/ingest-job-new.store';
import type { DocumentationIngestJobStatus, DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobChunksItem({
  ingestJobStatus,
  chunk,
  showMetadata,
  showEmbeddings,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  chunk: DocumentationIngestJobChunk;
  showMetadata: boolean;
  showEmbeddings: boolean;
}) {
  const [open, setOpen] = useState(false);

  const { removeIngestJobChunkCreated, updateIngestJobChunkCreated } = useIngestJobNewStore(
    useShallow((state) => ({
      removeIngestJobChunkCreated: state.removeIngestJobChunkCreated,
      updateIngestJobChunkCreated: state.updateIngestJobChunkCreated,
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
          <Item variant="muted" className="grow items-start">
            <ItemContent className="gap-y-2.5">
              <div className="flex flex-col gap-5 xl:flex-row">
                <div className="flex grow flex-col gap-y-1.5">
                  <ItemTitle>Content</ItemTitle>
                  <Textarea
                    id={`chunk-${chunk.id}-content`}
                    defaultValue={chunk.content}
                    onBlur={(e) =>
                      updateIngestJobChunkCreated({
                        chunkId: chunk.id,
                        field: 'content',
                        value: e.target.value,
                      })
                    }
                    className="opacity-100!"
                    disabled={ingestJobStatus === 'completed' ? true : false}
                  />
                </div>
                {showMetadata && (
                  <div className="flex basis-1/4 flex-col items-start gap-y-1.5">
                    <ItemTitle>Metadata</ItemTitle>
                    <Textarea
                      id={`chunk-${chunk.id}-metadata`}
                      defaultValue={JSON.stringify(chunk.metadata, null, 1)}
                      onBlur={(e) =>
                        updateIngestJobChunkCreated({
                          chunkId: chunk.id,
                          field: 'metadata',
                          value: e.target.value,
                        })
                      }
                      className="opacity-100!"
                      disabled={ingestJobStatus === 'completed' ? true : false}
                    />
                  </div>
                )}
              </div>
              {showEmbeddings && 'embedding' in chunk && chunk.embedding && (
                <div className="flex flex-col gap-y-1">
                  <ItemTitle>Embedding</ItemTitle>
                  <Textarea
                    id={`chunk-${chunk.id}-embedding`}
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
            onClick={() => removeIngestJobChunkCreated(chunk.id)}
          >
            <Trash />
          </Button>
        )}
      </ItemActions>
    </Item>
  );
}
