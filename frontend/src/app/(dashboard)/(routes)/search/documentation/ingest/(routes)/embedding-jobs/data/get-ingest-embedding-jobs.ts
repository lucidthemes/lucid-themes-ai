import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestEmbeddingJobsSchema } from '../schemas/ingest-embedding-jobs.schema';
import type { DocumentationIngestEmbeddingJobs } from '../schemas/ingest-embedding-jobs.schema';

export default async function getDocumentationIngestEmbeddingJobs(): Promise<DocumentationIngestEmbeddingJobs[]> {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestEmbeddingJobs[]>({
    url: '/api/v1/search/documentation/ingest/embedding-jobs',
  });

  if (!data || error) {
    return [];
  }

  const parsedResponse = z.array(DocumentationIngestEmbeddingJobsSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return [];
  }

  return parsedResponse.data;
}
