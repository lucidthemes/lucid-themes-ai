'use client';

import { useState } from 'react';
import { SquareText, ChevronDown, ChevronUp, Trash } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldGroup, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useIngestJobNewStore } from '../../../(routes)/new/store/ingest-job-new.store';
import type { DocumentationIngestJobStatus, DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';
import type { DocumentationIngestJobParseChunk } from '../../../(routes)/new/schemas/parse-chunks-form.schema';

export default function DocumentationIngestJobChunksItem({
  ingestJobStatus,
  chunk,
  showMetadata,
  showEmbeddings,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  chunk: DocumentationIngestJobChunk | DocumentationIngestJobParseChunk;
  showMetadata: boolean;
  showEmbeddings: boolean;
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
          <div className="flex gap-5">
            <Item variant="muted" className="grow basis-2/3 items-start">
              <ItemContent className="gap-y-2.5">
                <div className="flex gap-5">
                  <div className="flex grow basis-2/3 flex-col gap-y-1.5">
                    <ItemTitle>Content</ItemTitle>
                    <Textarea
                      id={`chunk-${chunk.id}-content`}
                      defaultValue={chunk.content}
                      onBlur={(e) =>
                        updateIngestJobParseChunk({
                          chunkId: chunk.id as number,
                          field: 'content',
                          value: e.target.value,
                        })
                      }
                      className="opacity-100!"
                      disabled={ingestJobStatus === 'completed' ? true : false}
                    />
                  </div>
                  {showMetadata && (
                    <div className="flex basis-1/3 flex-col items-start gap-y-1.5">
                      <ItemTitle>Metadata</ItemTitle>
                      <Textarea
                        id={`chunk-${chunk.id}-metadata`}
                        defaultValue={JSON.stringify(chunk.metadata, null, 1)}
                        onBlur={(e) =>
                          updateIngestJobParseChunk({
                            chunkId: chunk.id as number,
                            field: 'metadata',
                            value: e.target.value,
                          })
                        }
                        className="opacity-100!"
                        disabled={ingestJobStatus === 'completed' ? true : false}
                      />
                      {/* <FieldSet className="w-full">
                        <FieldGroup className="gap-2.5">
                          {Object.entries(chunk.metadata).map((data) => (
                            <div key={data[0]} className="grid grid-cols-2 gap-5">
                              <Field>
                                <Input id={data[0]} type="text" value={data[0]} />
                              </Field>
                              <Field>
                                <Input id={data[1] as string} type="text" value={data[1] as string} />
                              </Field>
                            </div>
                          ))}
                        </FieldGroup>
                      </FieldSet> */}
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
          </div>
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
