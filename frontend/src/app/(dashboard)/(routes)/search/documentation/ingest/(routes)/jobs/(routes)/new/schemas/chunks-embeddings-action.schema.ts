import { z } from 'zod';

import { DocumentationIngestJobChunkSchema } from '../../../schemas/ingest-job.schema';

export const DocumentationIngestJobChunksEmbeddingsActionSchema = z.array(
  DocumentationIngestJobChunkSchema.omit({
    embedding: true,
  }),
);

export type DocumentationIngestJobChunksEmbeddingsAction = z.infer<
  typeof DocumentationIngestJobChunksEmbeddingsActionSchema
>;
