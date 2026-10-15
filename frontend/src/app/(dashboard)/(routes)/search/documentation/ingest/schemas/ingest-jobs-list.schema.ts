import { z } from 'zod';

export const DocumentationIngestJobsListSchema = z.object({
  id: z.uuid(),
  type: z.enum(['document', 'webpage']),
  status: z.enum(['completed', 'pending', 'failed']),
  created_at: z.string(),
});

export type DocumentationIngestJobsList = z.infer<typeof DocumentationIngestJobsListSchema>;
