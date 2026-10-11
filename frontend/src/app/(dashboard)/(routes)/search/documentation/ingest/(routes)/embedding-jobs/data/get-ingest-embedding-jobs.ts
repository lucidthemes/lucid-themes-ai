import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import type { DocumentationIngestEmbeddingJob } from '../schemas/ingest-embedding-job.schema';
import { DocumentationIngestEmbeddingJobSchema } from '../schemas/ingest-embedding-job.schema';

export default async function getDocumentationIngestEmbeddingJobs(): Promise<DocumentationIngestEmbeddingJob[]> {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestEmbeddingJob[]>({
    url: '/api/v1/search/documentation/ingest/embedding-jobs',
  });

  if (!data || error) {
    return [];
  }

  const parsedResponse = z.array(DocumentationIngestEmbeddingJobSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return [];
  }

  return parsedResponse.data;
}
