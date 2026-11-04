import { z } from 'zod';

// export const DocumentationIngestJobChunksCreateActionResponseSchema = z.array(
//   z.object({
//     content: z.string(),
//     metadata: z.object().loose(),
//   }),
// );

// export type DocumentationIngestJobChunksCreateActionResponse = z.infer<
//   typeof DocumentationIngestJobChunksCreateActionResponseSchema
// >;

import { DocumentationIngestJobChunkSchema } from '../../../schemas/ingest-job.schema';

export const DocumentationIngestJobChunksCreateActionResponseSchema = z.array(
  DocumentationIngestJobChunkSchema.omit({
    embedding: true,
  }),
);

export type DocumentationIngestJobChunksCreateActionResponse = z.infer<
  typeof DocumentationIngestJobChunksCreateActionResponseSchema
>;
