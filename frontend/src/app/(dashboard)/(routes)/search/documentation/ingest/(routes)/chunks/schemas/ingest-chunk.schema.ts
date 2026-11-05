import { z } from 'zod';

export const DocumentationIngestChunkSchema = z.object({
  id: z.uuid(),
  content: z.string(),
  metadata: z.object().loose(),
  embedding: z.string(),
  created_at: z.string(),
});

export type DocumentationIngestChunk = z.infer<typeof DocumentationIngestChunkSchema>;
