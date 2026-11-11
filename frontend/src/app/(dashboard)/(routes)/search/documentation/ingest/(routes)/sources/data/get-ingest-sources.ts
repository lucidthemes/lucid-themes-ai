import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import type { DocumentationIngestSource } from '../schemas/ingest-source.schema';
import { DocumentationIngestSourceSchema } from '../schemas/ingest-source.schema';

export default async function getDocumentationIngestSources(
  page?: number,
  limit?: number,
  search_query?: string,
  filter_type?: string,
  sort_by?: string,
  includeCount?: boolean,
): Promise<{ sources: DocumentationIngestSource[]; totalCount: number }> {
  const { data, count, error } = await backendAPIFetch<null, DocumentationIngestSource[]>({
    url: '/api/v1/search/documentation/ingest/sources',
    requestQueryParams: {
      ...(limit && { limit }),
      ...(page && { offset: (Number(page) - 1) * Number(limit) }),
      ...(search_query && { query: search_query }),
      ...(filter_type && { type: filter_type }),
      ...(sort_by && sort_by === 'date_asc' && { sort_by_desc: true }),
      ...(includeCount && { include_count: true }),
    },
    cacheTags: ['documentation-ingest-sources'],
  });

  if (!data || error) {
    return { sources: [], totalCount: 0 };
  }

  const parsedResponse = z.array(DocumentationIngestSourceSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return { sources: [], totalCount: 0 };
  }

  return { sources: parsedResponse.data, totalCount: count ?? 0 };
}
