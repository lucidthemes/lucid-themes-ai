import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import type { DocumentationIngestParseJob } from '../schemas/ingest-parse-job.schema';
import { DocumentationIngestParseJobSchema } from '../schemas/ingest-parse-job.schema';

export default async function getDocumentationIngestParseJobs(
  page?: number,
  limit?: number,
  search_query?: string,
  filter_status?: string,
  sort_by?: string,
  includeCount?: boolean,
): Promise<{ parsejobs: DocumentationIngestParseJob[]; totalCount: number }> {
  const { data, count, error } = await backendAPIFetch<null, DocumentationIngestParseJob[]>({
    url: '/api/v1/search/documentation/ingest/parse-jobs',
    requestQueryParams: {
      ...(limit && { limit }),
      ...(page && { offset: (Number(page) - 1) * Number(limit) }),
      ...(search_query && { query: search_query }),
      ...(filter_status && { status: filter_status }),
      ...(sort_by && sort_by === 'date_asc' && { sort_by_desc: true }),
      ...(includeCount && { include_count: true }),
    },
    cacheTags: ['documentation-ingest-parse-jobs'],
  });

  if (!data || error) {
    return { parsejobs: [], totalCount: 0 };
  }

  const parsedResponse = z.array(DocumentationIngestParseJobSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return { parsejobs: [], totalCount: 0 };
  }

  return { parsejobs: parsedResponse.data, totalCount: count ?? 0 };
}
