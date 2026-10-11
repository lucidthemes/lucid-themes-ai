import { z } from 'zod';

export const DocumentationIngestEmbeddingJobSchema = z.object({
  id: z.uuid(),
  parse_job_id: z.uuid(),
  provider: z.string(),
  model: z.string(),
  usage: z.object({
    prompt_tokens: z.int().positive(),
    total_tokens: z.int().positive(),
  }),
  created_at: z.string(),
});

export type DocumentationIngestEmbeddingJob = z.infer<typeof DocumentationIngestEmbeddingJobSchema>;
