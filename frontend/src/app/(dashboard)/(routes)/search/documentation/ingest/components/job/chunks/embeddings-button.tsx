'use client';

import type { TransitionStartFunction } from 'react';
import { ChevronsLeftRightEllipsis } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useIngestJobNewStore } from '../../../(routes)/new/store/ingest-job-new.store';

export default function DocumentationIngestJobChunksEmbeddingsButton({
  startTransition,
}: {
  startTransition: TransitionStartFunction;
}) {
  const ingestJobParseChunks = useIngestJobNewStore((state) => state.ingestJobParseChunks);

  return (
    <Button
      className="cursor-pointer"
      onClick={() => {
        startTransition(async () => {
          console.log('generate!');
          console.log(ingestJobParseChunks);
        });
      }}
    >
      Generate embeddings <ChevronsLeftRightEllipsis />
    </Button>
  );
}
