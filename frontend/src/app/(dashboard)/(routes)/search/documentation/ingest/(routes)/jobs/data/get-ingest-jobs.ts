import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestJobsSchema } from '../schemas/ingest-jobs.schema';
import type { DocumentationIngestJobs } from '../schemas/ingest-jobs.schema';

export default async function getDocumentationIngestJobs(): Promise<DocumentationIngestJobs[]> {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestJobs[]>({
    url: '/api/v1/search/documentation/ingest/jobs',
    cacheTags: ['documentation-ingest-jobs'],
  });

  if (!data || error) {
    return [];
  }

  const parsedResponse = z.array(DocumentationIngestJobsSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return [];
  }

  return parsedResponse.data;
}
