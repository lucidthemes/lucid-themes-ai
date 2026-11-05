import { z } from 'zod';

import { DocumentationIngestChunkSchema } from './ingest-chunk.schema';

export const DocumentationIngestChunksSchema = DocumentationIngestChunkSchema.pick({
  id: true,
  content: true,
  created_at: true,
});

export type DocumentationIngestChunks = z.infer<typeof DocumentationIngestChunksSchema>;
