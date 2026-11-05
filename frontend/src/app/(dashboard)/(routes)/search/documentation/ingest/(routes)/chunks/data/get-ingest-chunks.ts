import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestChunksSchema } from '../schemas/ingest-chunks.schema';
import type { DocumentationIngestChunks } from '../schemas/ingest-chunks.schema';

export default async function getDocumentationIngestChunks(): Promise<DocumentationIngestChunks[]> {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestChunks[]>({
    url: '/api/v1/search/documentation/ingest/chunks',
  });

  if (!data || error) {
    return [];
  }

  const parsedResponse = z.array(DocumentationIngestChunksSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return [];
  }

  return parsedResponse.data;
}
