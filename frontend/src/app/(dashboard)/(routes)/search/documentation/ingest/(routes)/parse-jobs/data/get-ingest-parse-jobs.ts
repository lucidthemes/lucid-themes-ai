import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import type { DocumentationIngestParseJob } from '../schemas/ingest-parse-job.schema';
import { DocumentationIngestParseJobSchema } from '../schemas/ingest-parse-job.schema';

export default async function getDocumentationIngestParseJobs(): Promise<DocumentationIngestParseJob[]> {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestParseJob[]>({
    url: '/api/v1/search/documentation/ingest/parse-jobs',
  });

  if (!data || error) {
    return [];
  }

  const parsedResponse = z.array(DocumentationIngestParseJobSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return [];
  }

  return parsedResponse.data;
}
