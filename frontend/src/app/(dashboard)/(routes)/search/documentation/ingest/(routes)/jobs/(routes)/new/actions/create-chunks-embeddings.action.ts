'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestJobChunksEmbeddingsActionSchema } from '../schemas/chunks-embeddings-action.schema';
import type { DocumentationIngestJobChunksEmbeddingsAction } from '../schemas/chunks-embeddings-action.schema';

export default async function createIngestJobChunksEmbeddings({
  jobId,
  jobPathname,
  chunks,
}: {
  jobId: string;
  jobPathname: string;
  chunks: DocumentationIngestJobChunksEmbeddingsAction;
}): Promise<{ success: boolean } | void> {
  const parsedJobId = z.uuid().safeParse(jobId);
  const parsedRequest = DocumentationIngestJobChunksEmbeddingsActionSchema.safeParse(chunks);

  if (!parsedJobId.success || !parsedRequest.success) {
    return { success: false };
  }

  const { error, status } = await backendAPIFetch<DocumentationIngestJobChunksEmbeddingsAction, null>({
    url: `/api/v1/search/documentation/ingest/jobs/${jobId}/embeddings`,
    method: 'POST',
    requestData: parsedRequest.data,
  });

  if (error || status !== 204) {
    return { success: false };
  }

  revalidatePath(jobPathname);
}
