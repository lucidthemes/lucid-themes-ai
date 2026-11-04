'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// import { getAuthAccessToken } from '@/lib/supabase/auth';
// import { serverApiUrl } from '@/lib/api-urls';

import { backendAPIFetch } from '@/lib/backend-api';

// import type { DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';

// import { DocumentationIngestJobChunksCreateFormChunkSchema } from '../schemas/chunks-create-form.schema';
// import type { DocumentationIngestJobChunksCreateFormChunk } from '../schemas/chunks-create-form.schema';
import { DocumentationIngestJobChunksEmbeddingsActionSchema } from '../schemas/chunks-embeddings-action.schema';
import type { DocumentationIngestJobChunksEmbeddingsAction } from '../schemas/chunks-embeddings-action.schema';

export default async function createIngestJobChunksEmbeddings({
  chunks,
  ingestJobPathname,
}: {
  chunks: DocumentationIngestJobChunksEmbeddingsAction;
  ingestJobPathname: string;
}): Promise<{ success: boolean } | void> {
  const parsedRequest = DocumentationIngestJobChunksEmbeddingsActionSchema.safeParse(chunks);

  if (!parsedRequest.success) {
    return { success: false };
  }

  const { error, status } = await backendAPIFetch<DocumentationIngestJobChunksEmbeddingsAction, null>({
    url: '/api/v1/search/documentation/ingest/job/new/embeddings',
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
