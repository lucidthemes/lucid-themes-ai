import type { TransitionStartFunction } from 'react';

import { CardFooter } from '@/components/ui/card';

import DocumentationIngestJobChunksEmbeddingsButton from './embeddings-button';

export default function DocumentationIngestJobChunksFooter({
  startTransition,
}: {
  startTransition: TransitionStartFunction;
}) {
  return (
    <CardFooter className="justify-end">
      <DocumentationIngestJobChunksEmbeddingsButton startTransition={startTransition} />
    </CardFooter>
  );
}
