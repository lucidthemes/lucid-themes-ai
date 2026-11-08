'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestJobChunksEmbeddingsActionSchema } from '../schemas/chunks-embeddings-action.schema';
import type { DocumentationIngestJobChunksEmbeddingsAction } from '../schemas/chunks-embeddings-action.schema';

export default async function createIngestJobChunksEmbeddings({
  ingestJobId,
  chunks,
  ingestJobPathname,
}: {
  ingestJobId: string;
  chunks: DocumentationIngestJobChunksEmbeddingsAction;
  ingestJobPathname: string;
}): Promise<{ success: boolean } | void> {
  const parsedIngestJobId = z.uuid().safeParse(ingestJobId);
  const parsedRequest = DocumentationIngestJobChunksEmbeddingsActionSchema.safeParse(chunks);

  if (!parsedIngestJobId.success || !parsedRequest.success) {
    return { success: false };
  }

  const { error, status } = await backendAPIFetch<DocumentationIngestJobChunksEmbeddingsAction, null>({
    url: `/api/v1/search/documentation/ingest/jobs/${ingestJobId}/embeddings`,
    method: 'POST',
    requestData: parsedRequest.data,
  });

  if (error || status !== 204) {
    return { success: false };
  }

  revalidatePath(ingestJobPathname);

  // const requestChunks = parsedRequest.data.map((chunk) => {
  //   return {
  //     content: chunk.content,
  //   };
  // });

  // const token = await getAuthAccessToken();

  // const url = `${serverApiUrl}/api/v1/search/documentation/ingest/job/new/embeddings`;

  // try {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ chunks: requestChunks }),
  //   });

  //   // console.log(response);

  //   if (!response.ok) {
  //     throw new Error(`Response status: ${response.status}`);
  //   }

  //   const result = await response.json();
  //   // console.log(result);

  //   if (result.success === true) {
  //     revalidatePath(ingestJobPathname);
  //   }
  // } catch (error) {
  //   // console.error(error);

  //   return { success: false };
  // }
}
