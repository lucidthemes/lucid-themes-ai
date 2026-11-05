import { z } from 'zod';

export const DocumentationIngestSourceSchema = z.object({
  id: z.uuid(),
  type: z.enum(['document', 'webpage']),
  file_name: z.string().nullable(),
  file_url: z.string().nullable(),
  webpage_url: z.string().nullable(),
  created_at: z.string(),
});

export type DocumentationIngestSource = z.infer<typeof DocumentationIngestSourceSchema>;
