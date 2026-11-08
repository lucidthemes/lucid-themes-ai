'use client';

import type { TransitionStartFunction } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronsLeftRightEllipsis } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

import { useIngestJobNewStore } from '../../../(routes)/new/store/ingest-job-new.store';
import createIngestJobChunksEmbeddings from '../../../(routes)/new/actions/create-chunks-embeddings.action';
import type { DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobChunksEmbeddingsButton({
  ingestJobData,
  startTransition,
}: {
  ingestJobData: DocumentationIngestJob;
  startTransition: TransitionStartFunction;
}) {
  const ingestJobChunksCreated = useIngestJobNewStore((state) => state.ingestJobChunksCreated);

  const pathname = usePathname();

  return (
    <Button
      className="cursor-pointer"
      onClick={() => {
        startTransition(async () => {
          if (!ingestJobChunksCreated || ingestJobChunksCreated.length === 0) return;

          const createEmbeddings = await createIngestJobChunksEmbeddings({
            ingestJobId: ingestJobData.id,
            chunks: ingestJobChunksCreated,
            ingestJobPathname: pathname,
          });

          if (createEmbeddings && createEmbeddings.success === false) {
            toast.add({
              type: 'error',
              description: 'Error generating embeddings. Please try again.',
              priority: 'high',
            });
          }
        });
      }}
    >
      Generate embeddings <ChevronsLeftRightEllipsis />
    </Button>
  );
}
