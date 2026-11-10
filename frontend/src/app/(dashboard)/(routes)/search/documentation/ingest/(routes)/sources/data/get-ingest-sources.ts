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
): Promise<DocumentationIngestSource[]> {
  const offset = page ? (Number(page) - 1) * Number(limit) : undefined;

  const filters = filter_type ? [{ name: 'filter_type', value: filter_type }] : undefined;

  const sortByDesc = sort_by && sort_by === 'date_asc' ? false : true;

  const { data, error } = await backendAPIFetch<null, DocumentationIngestSource[]>({
    url: '/api/v1/search/documentation/ingest/sources',
    cacheTags: ['documentation-ingest-sources'],
    limit,
    offset,
    searchQuery: search_query,
    filters,
    sortByDesc,
  });

  if (!data || error) {
    return [];
  }

  const parsedResponse = z.array(DocumentationIngestSourceSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return [];
  }

  return parsedResponse.data;
}
