import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import type { DocumentationIngestChunk } from '../schemas/ingest-chunk.schema';
import { DocumentationIngestChunkSchema } from '../schemas/ingest-chunk.schema';

export default async function getDocumentationIngestChunks(): Promise<DocumentationIngestChunk[]> {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestChunk[]>({
    url: '/api/v1/search/documentation/ingest/chunks',
    cacheTags: ['documentation-ingest-chunks'],
  });

  if (!data || error) {
    return [];
  }

  const parsedResponse = z.array(DocumentationIngestChunkSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return [];
  }

  return parsedResponse.data;
}
