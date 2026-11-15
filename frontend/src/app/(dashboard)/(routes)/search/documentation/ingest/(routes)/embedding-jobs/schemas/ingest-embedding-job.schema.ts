import { z } from 'zod';

export const DocumentationIngestEmbeddingJobUsageSchema = z.object({
  prompt_tokens: z.int().positive(),
  total_tokens: z.int().positive(),
});

export const DocumentationIngestEmbeddingJobSchema = z.object({
  id: z.uuid(),
  parse_job_id: z.uuid(),
  provider: z.string(),
  model: z.string(),
  usage: DocumentationIngestEmbeddingJobUsageSchema,
  created_at: z.string(),
});

export type DocumentationIngestEmbeddingJob = z.infer<typeof DocumentationIngestEmbeddingJobSchema>;

export type DocumentationIngestEmbeddingJobUsage = z.infer<typeof DocumentationIngestEmbeddingJobUsageSchema>;
