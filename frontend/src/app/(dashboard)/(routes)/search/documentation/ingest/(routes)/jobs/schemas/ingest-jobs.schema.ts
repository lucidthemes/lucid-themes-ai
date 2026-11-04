import { z } from 'zod';

import { DocumentationIngestJobSchema } from './ingest-job.schema';

export const DocumentationIngestJobsSchema = DocumentationIngestJobSchema.pick({
  id: true,
  name: true,
  source: true,
  status: true,
  created_at: true,
  updated_at: true,
});

export type DocumentationIngestJobs = z.infer<typeof DocumentationIngestJobsSchema>;
