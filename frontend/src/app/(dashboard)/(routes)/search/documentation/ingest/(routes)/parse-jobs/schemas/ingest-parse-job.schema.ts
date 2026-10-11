import { z } from 'zod';

export const DocumentationIngestParseJobSchema = z.object({
  id: z.uuid(),
  ingest_job_id: z.uuid(),
  llamaparse_job_id: z.string(),
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
  created_at: z.string(),
  updated_at: z.string(),
});

export type DocumentationIngestParseJob = z.infer<typeof DocumentationIngestParseJobSchema>;
