import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import type { DocumentationIngestChunk } from '../schemas/ingest-chunk.schema';
import { DocumentationIngestChunkSchema } from '../schemas/ingest-chunk.schema';

export default async function getDocumentationIngestChunks(
  page?: number,
  limit?: number,
  search_query?: string,
  sort_by?: string,
  includeCount?: boolean,
): Promise<{ chunks: DocumentationIngestChunk[]; totalCount: number }> {
  const { data, count, error } = await backendAPIFetch<null, DocumentationIngestChunk[]>({
    url: '/api/v1/search/documentation/ingest/chunks',
    requestQueryParams: {
      ...(limit && { limit }),
      ...(page && { offset: (Number(page) - 1) * Number(limit) }),
      ...(search_query && { query: search_query }),
      ...(sort_by && sort_by === 'date_asc' && { sort_by_desc: true }),
      ...(includeCount && { include_count: true }),
    },
    cacheTags: ['documentation-ingest-chunks'],
  });

  if (!data || error) {
    return { chunks: [], totalCount: 0 };
  }

  const parsedResponse = z.array(DocumentationIngestChunkSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return { chunks: [], totalCount: 0 };
  }

  return { chunks: parsedResponse.data, totalCount: count ?? 0 };
}
