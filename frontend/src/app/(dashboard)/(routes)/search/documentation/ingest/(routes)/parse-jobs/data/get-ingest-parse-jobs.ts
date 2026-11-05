import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestParseJobsSchema } from '../schemas/ingest-parse-jobs.schema';
import type { DocumentationIngestParseJobs } from '../schemas/ingest-parse-jobs.schema';

export default async function getDocumentationIngestParseJobs(): Promise<DocumentationIngestParseJobs[]> {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestParseJobs[]>({
    url: '/api/v1/search/documentation/ingest/parse-jobs',
  });

  if (!data || error) {
    return [];
  }

  const parsedResponse = z.array(DocumentationIngestParseJobsSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return [];
  }

  return parsedResponse.data;
}
