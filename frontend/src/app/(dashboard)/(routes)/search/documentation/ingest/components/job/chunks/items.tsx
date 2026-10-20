'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import type { DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';

import DocumentationIngestJobChunksItem from './item';

export default function DocumentationIngestJobChunksItems({ chunks }: { chunks: DocumentationIngestJobChunk[] }) {
  const [showVectors, setShowVectors] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-end gap-2.5">
        <Switch
          id="airplane-mode"
          className="cursor-pointer"
          checked={showVectors}
          onCheckedChange={() => setShowVectors((showVectors) => !showVectors)}
        />
        <Label htmlFor="airplane-mode">Show embedding vectors</Label>
      </div>
      {chunks.map((chunk) => (
        <DocumentationIngestJobChunksItem key={chunk.id} chunk={chunk} showVectors={showVectors} />
      ))}
    </div>
  );
}
