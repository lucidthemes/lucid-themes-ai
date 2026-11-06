import { z } from 'zod';

import { DocumentationIngestEmbeddingJobSchema } from './ingest-embedding-job.schema';

export const DocumentationIngestEmbeddingJobsSchema = DocumentationIngestEmbeddingJobSchema.pick({
  id: true,
  provider: true,
  model: true,
  created_at: true,
});

export type DocumentationIngestEmbeddingJobs = z.infer<typeof DocumentationIngestEmbeddingJobsSchema>;
