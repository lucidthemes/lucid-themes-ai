import { z } from 'zod';

export const DocumentationIngestJobParseChunksFormSchema = z.object({
  method: z.enum(['markdown', 'text'], 'Please select an method'),
  content: z.string(),
});

export type DocumentationIngestJobParseChunksForm = z.infer<typeof DocumentationIngestJobParseChunksFormSchema>;

export const DocumentationIngestJobParseChunkSchema = z.object({
  id: z.int().positive(),
  content: z.string(),
});

export type DocumentationIngestJobParseChunk = z.infer<typeof DocumentationIngestJobParseChunkSchema>;
