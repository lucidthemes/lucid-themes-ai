'use server';

import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import type { DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';

import { DocumentationIngestJobChunksCreateFormSchema } from '../schemas/chunks-create-form.schema';
import type { DocumentationIngestJobChunksCreateForm } from '../schemas/chunks-create-form.schema';
import { DocumentationIngestJobChunksCreateActionResponseSchema } from '../schemas/chunks-create-action.schema';
import type { DocumentationIngestJobChunksCreateActionResponse } from '../schemas/chunks-create-action.schema';

export default async function createIngestJobChunks({
  ingestJobId,
  formData,
}: {
  ingestJobId: string;
  formData: DocumentationIngestJobChunksCreateForm;
}) {
  const parsedIngestJobId = z.uuid().safeParse(ingestJobId);
  const parsedRequest = DocumentationIngestJobChunksCreateFormSchema.safeParse(formData);

  if (!parsedIngestJobId.success || !parsedRequest.success) {
    return { success: false };
  }

  const { data, error } = await backendAPIFetch<
    DocumentationIngestJobChunksCreateForm,
    DocumentationIngestJobChunksCreateActionResponse
  >({
    url: `/api/v1/search/documentation/ingest/jobs/${ingestJobId}/chunks`,
    method: 'POST',
    requestData: parsedRequest.data,
  });

  if (!data || error) {
    return { success: false };
  }

  const parsedResponse = DocumentationIngestJobChunksCreateActionResponseSchema.safeParse(data);

  if (!parsedResponse.success) {
    return { success: false };
  }

  const structuredChunks = parsedResponse.data.map((chunk: Omit<DocumentationIngestJobChunk, 'embedding'>) => {
    return {
      id: chunk.id,
      content: chunk.content,
      metadata: chunk.metadata,
    };
  });

  return { success: true, chunks: structuredChunks };

  // const token = await getAuthAccessToken();

  // const url = `${serverApiUrl}/api/v1/search/documentation/ingest/job/new/chunks`;

  // try {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   });

  //   console.log(response);

  //   if (!response.ok) {
  //     throw new Error(`Response status: ${response.status}`);
  //   }

  //   const result = await response.json();
  //   console.log(result);

  //   const structuredChunks = result.chunks.map((chunk: DocumentationIngestJobParseChunk, index: number) => {
  //     return {
  //       id: index + 1,
  //       content: chunk.content,
  //     };
  //   });

  //   // console.log(structuredChunks);

  //   const parsedChunks = z.array(DocumentationIngestJobParseChunkSchema).safeParse(structuredChunks);

  //   if (!parsedChunks.success) {
  //     return { success: false };
  //   }

  //   return { success: true, chunks: parsedChunks.data };
  // } catch (error) {
  //   console.error(error);

  //   return { success: false };
  // }
}
