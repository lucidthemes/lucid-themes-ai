import { z } from 'zod';

export const DocumentationIngestJobParseChunksFormSchema = z.object({
  method: z.enum(['markdown', 'text'], 'Please select an method'),
  content: z.string(),
});

export type DocumentationIngestJobParseChunksForm = z.infer<typeof DocumentationIngestJobParseChunksFormSchema>;
