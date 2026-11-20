import { z } from 'zod';

import { DocumentationIngestJobChunkSchema } from './ingest-job.schema';

export const DocumentationIngestJobTestSchema = z.object({
  id: z.uuid(),
  search_type: z.enum(['semantic', 'keyword', 'hybrid']),
  similarity_metric: z.enum(['dot', 'cosine', 'euclidean']),
  phrase: z.string().min(1, 'Please enter a phrase'),
  chunks: z.array(DocumentationIngestJobChunkSchema).nullable(),
});

export const DocumentationIngestJobTestStateSchema = z.object({
  success: z.boolean().nullable(),
  tests: z.array(DocumentationIngestJobTestSchema),
});

export const DocumentationIngestJobTestFormSchema = DocumentationIngestJobTestSchema.omit({ id: true, chunks: true });

export type DocumentationIngestJobTest = z.infer<typeof DocumentationIngestJobTestSchema>;

export type DocumentationIngestJobTestState = z.infer<typeof DocumentationIngestJobTestStateSchema>;

export type DocumentationIngestJobTestForm = z.infer<typeof DocumentationIngestJobTestFormSchema>;
