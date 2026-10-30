import { z } from 'zod';

import { DocumentationIngestJobSourceSchema } from '../../../schemas/ingest-job.schema';

export const DocumentationIngestJobParseChunksFormSchema = z.object({
  split_method: z.enum(['markdown', 'text'], 'Please select an method'),
  chunk_size: z.int().positive(),
  chunk_overlap: z.int().positive(),
  content: z.string(),
  source: DocumentationIngestJobSourceSchema,
});

export type DocumentationIngestJobParseChunksForm = z.infer<typeof DocumentationIngestJobParseChunksFormSchema>;

export const DocumentationIngestJobParseChunkSchema = z.object({
  id: z.int().positive(),
  content: z.string(),
  metadata: z.object().loose(),
});

export type DocumentationIngestJobParseChunk = z.infer<typeof DocumentationIngestJobParseChunkSchema>;
