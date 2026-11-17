import { z } from 'zod';

import { DocumentationIngestJobSourceSchema } from '../../../schemas/ingest-job.schema';

export const DocumentationIngestJobChunksCreateFormSchema = z.object({
  split_method: z.enum(['markdown', 'text'], 'Please select an method'),
  chunk_size: z.int().positive(),
  chunk_overlap: z.int().positive(),
  content: z.string(),
  source: DocumentationIngestJobSourceSchema,
});

export type DocumentationIngestJobChunksCreateForm = z.infer<typeof DocumentationIngestJobChunksCreateFormSchema>;
