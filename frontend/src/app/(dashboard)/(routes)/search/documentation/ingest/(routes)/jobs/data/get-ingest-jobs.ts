import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestJobsSchema } from '../schemas/ingest-jobs.schema';
import type { DocumentationIngestJobs } from '../schemas/ingest-jobs.schema';

export default async function getDocumentationIngestJobs(
  page?: number,
  limit?: number,
  search_query?: string,
  filter_status?: string,
  sort_by?: string,
  includeCount?: boolean,
): Promise<{ jobs: DocumentationIngestJobs[]; totalCount: number }> {
  const { data, count, error } = await backendAPIFetch<null, DocumentationIngestJobs[]>({
    url: '/api/v1/search/documentation/ingest/jobs',
    requestQueryParams: {
      ...(limit && { limit }),
      ...(page && { offset: (Number(page) - 1) * Number(limit) }),
      ...(search_query && { query: search_query }),
      ...(filter_status && { status: filter_status }),
      ...(sort_by && sort_by === 'date_asc' && { sort_by_desc: true }),
      ...(includeCount && { include_count: true }),
    },
    cacheTags: ['documentation-ingest-jobs'],
  });

  if (!data || error) {
    return { jobs: [], totalCount: 0 };
  }

  const parsedResponse = z.array(DocumentationIngestJobsSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return { jobs: [], totalCount: 0 };
  }

  return { jobs: parsedResponse.data, totalCount: count ?? 0 };
}
