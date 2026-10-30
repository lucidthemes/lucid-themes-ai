'use server';

// import { z } from 'zod';

// import { getAuthAccessToken } from '@/lib/supabase/auth';
// import { serverApiUrl } from '@/lib/api-urls';

import { backendAPIFetch } from '@/lib/backend-api';

// import { DocumentationIngestJobChunkSchema } from '../../../schemas/ingest-job.schema';
// import type { DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';

import {
  DocumentationIngestJobParseChunksFormSchema,
  // DocumentationIngestJobParseChunkSchema,
} from '../schemas/parse-chunks-form.schema';
import type {
  DocumentationIngestJobParseChunksForm,
  DocumentationIngestJobParseChunk,
} from '../schemas/parse-chunks-form.schema';
import { DocumentationIngestJobParseChunksActionResponseSchema } from '../schemas/parse-chunks-action.schema';
import type { DocumentationIngestJobParseChunksActionResponse } from '../schemas/parse-chunks-action.schema';

export default async function createIngestJobParseChunks({
  formData,
}: {
  formData: DocumentationIngestJobParseChunksForm;
}) {
  const parsedRequest = DocumentationIngestJobParseChunksFormSchema.safeParse(formData);

  if (!parsedRequest.success) {
    return { success: false };
  }

  const { data, error } = await backendAPIFetch<
    DocumentationIngestJobParseChunksForm,
    DocumentationIngestJobParseChunksActionResponse
  >({
    url: '/api/v1/search/documentation/ingest/job/new/chunks',
    method: 'POST',
    requestData: parsedRequest.data,
  });

  if (!data || error) {
    return { success: false };
  }

  const parsedResponse = DocumentationIngestJobParseChunksActionResponseSchema.safeParse(data);

  if (!parsedResponse.success) {
    return { success: false };
  }

  const structuredChunks = parsedResponse.data.map(
    (chunk: Omit<DocumentationIngestJobParseChunk, 'id'>, index: number) => {
      return {
        id: index + 1,
        content: chunk.content,
        metadata: chunk.metadata,
      };
    },
  );

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
