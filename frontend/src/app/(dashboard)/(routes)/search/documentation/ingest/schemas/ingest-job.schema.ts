import { z } from 'zod';

export const DocumentationIngestJobSourceSchema = z.object({
  type: z.enum(['document', 'webpage']),
  file_name: z.string().nullable(),
  file_url: z.string().nullable(),
  webpage_url: z.string().nullable(),
});

export const DocumentationIngestJobChunkSchema = z.object({
  id: z.uuid(),
  content: z.string(),
  metadata: z.object().loose(),
  embedding: z.string().optional(),
});

export const DocumentationIngestJobSchema = z.object({
  id: z.uuid(),
  //user_id: z.uuid(),
  name: z.string(),
  source: DocumentationIngestJobSourceSchema,
  parse_job: z.object({
    id: z.string(),
    status: z.enum(['pending', 'completed', 'failed']),
    markdown_full: z.string().nullable(),
    text_full: z.string().nullable(),
    tier: z.string().nullable(),
    error_message: z.string().nullable(),
    usage: z
      .object({
        credits: z.int().nullable(),
      })
      .nullable(),
  }),
  chunks: z.array(DocumentationIngestJobChunkSchema).optional(),
  embeddings_job: z.object({
    model: z.string(),
    usage: z.object({
      prompt_tokens: z.int().positive(),
      total_tokens: z.int().positive(),
    }),
  }),
  status: z.enum(['pending', 'completed', 'failed']),
  created_at: z.string(),
  updated_at: z.string(),
});

export type DocumentationIngestJob = z.infer<typeof DocumentationIngestJobSchema>;

export type DocumentationIngestJobStatus = DocumentationIngestJob['status'] | 'new';

export type DocumentationIngestJobChunk = z.infer<typeof DocumentationIngestJobChunkSchema>;
