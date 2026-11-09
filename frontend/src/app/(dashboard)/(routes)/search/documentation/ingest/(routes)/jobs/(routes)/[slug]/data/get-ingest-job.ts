import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestJobSchema } from '../../../schemas/ingest-job.schema';
import type { DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

export default async function getDocumentationIngestJob(id: string): Promise<DocumentationIngestJob | null> {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestJob>({
    url: `/api/v1/search/documentation/ingest/jobs/${id}`,
  });

  if (!data || error) {
    return null;
  }

  const parsedResponse = DocumentationIngestJobSchema.safeParse(data);

  if (!parsedResponse.success) {
    return null;
  }

  return parsedResponse.data;
}
