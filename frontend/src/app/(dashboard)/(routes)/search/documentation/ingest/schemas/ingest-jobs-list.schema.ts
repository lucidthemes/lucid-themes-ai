import { z } from 'zod';

import { DocumentationIngestJobSchema } from './ingest-job.schema';

// export const DocumentationIngestJobsListSchema = z.object({
//   id: z.uuid(),
//   name: z.string(),
//   type: z.enum(['document', 'webpage']),
//   status: z.enum(['completed', 'pending', 'failed']),
//   created_at: z.string(),
// });

export const DocumentationIngestJobsListSchema = DocumentationIngestJobSchema.pick({
  id: true,
  name: true,
  source: true,
  status: true,
  created_at: true,
  updated_at: true,
});

export type DocumentationIngestJobsList = z.infer<typeof DocumentationIngestJobsListSchema>;
