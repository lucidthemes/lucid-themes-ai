import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import type { DocumentationIngestEmbeddingJob } from '../schemas/ingest-embedding-job.schema';
import { DocumentationIngestEmbeddingJobSchema } from '../schemas/ingest-embedding-job.schema';

export default async function getDocumentationIngestEmbeddingJobs(
  page?: number,
  limit?: number,
  search_query?: string,
  sort_by?: string,
  includeCount?: boolean,
): Promise<{ embeddingjobs: DocumentationIngestEmbeddingJob[]; totalCount: number }> {
  const { data, count, error } = await backendAPIFetch<null, DocumentationIngestEmbeddingJob[]>({
    url: '/api/v1/search/documentation/ingest/embedding-jobs',
    requestQueryParams: {
      ...(limit && { limit }),
      ...(page && { offset: (Number(page) - 1) * Number(limit) }),
      ...(search_query && { query: search_query }),
      ...(sort_by && sort_by === 'date_asc' && { sort_by_desc: true }),
      ...(includeCount && { include_count: true }),
    },
    cacheTags: ['documentation-ingest-embedding-jobs'],
  });

  if (!data || error) {
    return { embeddingjobs: [], totalCount: 0 };
  }

  const parsedResponse = z.array(DocumentationIngestEmbeddingJobSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return { embeddingjobs: [], totalCount: 0 };
  }

  return { embeddingjobs: parsedResponse.data, totalCount: count ?? 0 };
}
