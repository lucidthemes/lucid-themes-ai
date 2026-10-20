import { z } from 'zod';

export const DocumentationIngestJobChunkSchema = z.object({
  id: z.uuid(),
  content: z.string(),
  vector: z.string().optional(),
});

export const DocumentationIngestJobSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  name: z.string(),
  source: z.object({
    type: z.enum(['document', 'webpage']),
    file_name: z.string().optional(),
    file_url: z.string().optional(),
    webpage_url: z.string().optional(),
  }),
  chunks: z.array(DocumentationIngestJobChunkSchema).optional(),
  status: z.enum(['pending', 'completed', 'failed']),
  created_at: z.string(),
  updated_at: z.string(),
});

export type DocumentationIngestJob = z.infer<typeof DocumentationIngestJobSchema>;

export type DocumentationIngestJobStatus = DocumentationIngestJob['status'] | 'new';

export type DocumentationIngestJobChunk = z.infer<typeof DocumentationIngestJobChunkSchema>;
