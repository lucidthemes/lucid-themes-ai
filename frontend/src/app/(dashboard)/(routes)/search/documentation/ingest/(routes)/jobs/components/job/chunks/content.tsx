'use client';

import { useState } from 'react';

import { CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import type { DocumentationIngestJobStatus, DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';

import DocumentationIngestJobChunksItems from './items';
import DocumentationIngestJobChunksEmbeddingsLoading from './loading';
import DocumentationIngestJobChunksEmpty from './empty';

export default function DocumentationIngestJobChunksContent({
  ingestJobStatus,
  expanded,
  isPending,
  chunks,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  expanded: boolean;
  isPending: boolean;
  chunks?: DocumentationIngestJobChunk[] | null;
}) {
  const [showMetadata, setShowMetadata] = useState(true);
  const [showEmbeddings, setShowEmbeddings] = useState(true);

  if (isPending) return <DocumentationIngestJobChunksEmbeddingsLoading />;

  if (!chunks || chunks.length === 0) return <DocumentationIngestJobChunksEmpty />;

  return (
    <>
      {expanded && (
        <CardContent className="flex flex-col gap-5">
          <div className="flex justify-end gap-5">
            <div className="flex items-center gap-2.5">
              <Switch
                id="show-metadata"
                className="cursor-pointer"
                checked={showMetadata}
                onCheckedChange={() => setShowMetadata((showMetadata) => !showMetadata)}
              />
              <Label htmlFor="show-metadata">Show metadata</Label>
            </div>
            {ingestJobStatus === 'completed' && (
              <div className="flex items-center justify-end gap-2.5">
                <Switch
                  id="show-embeddings"
                  className="cursor-pointer"
                  checked={showEmbeddings}
                  onCheckedChange={() => setShowEmbeddings((showEmbeddings) => !showEmbeddings)}
                />
                <Label htmlFor="show-embeddings">Show embeddings</Label>
              </div>
            )}
          </div>
          <DocumentationIngestJobChunksItems
            ingestJobStatus={ingestJobStatus}
            chunks={chunks}
            showMetadata={showMetadata}
            showEmbeddings={showEmbeddings}
          />
        </CardContent>
      )}
    </>
  );
}
