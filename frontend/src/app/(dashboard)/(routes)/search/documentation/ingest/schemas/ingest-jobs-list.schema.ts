import { z } from 'zod';

import { DocumentationIngestJobSchema } from './ingest-job.schema';

export const DocumentationIngestJobsResultSchema = DocumentationIngestJobSchema.pick({
  id: true,
  name: true,
  source: true,
  status: true,
  created_at: true,
  updated_at: true,
});

export type DocumentationIngestJobsResult = z.infer<typeof DocumentationIngestJobsResultSchema>;
