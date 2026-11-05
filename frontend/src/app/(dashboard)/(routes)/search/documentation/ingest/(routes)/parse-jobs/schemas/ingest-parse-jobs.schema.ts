import { z } from 'zod';

import { DocumentationIngestParseJobSchema } from './ingest-parse-job.schema';

export const DocumentationIngestParseJobsSchema = DocumentationIngestParseJobSchema.pick({
  id: true,
  llamaparse_job_id: true,
  status: true,
  created_at: true,
});

export type DocumentationIngestParseJobs = z.infer<typeof DocumentationIngestParseJobsSchema>;
