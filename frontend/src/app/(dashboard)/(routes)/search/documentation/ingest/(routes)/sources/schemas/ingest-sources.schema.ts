import { z } from 'zod';

import { DocumentationIngestSourceSchema } from './ingest-source.schema';

export const DocumentationIngestSourcesSchema = DocumentationIngestSourceSchema.pick({
  id: true,
  type: true,
  created_at: true,
});

export type DocumentationIngestSources = z.infer<typeof DocumentationIngestSourcesSchema>;
