import { z } from 'zod';

export const DocumentationIngestJobParseChunksActionResponseSchema = z.array(
  z.object({
    content: z.string(),
    metadata: z.object().loose(),
  }),
);

export type DocumentationIngestJobParseChunksActionResponse = z.infer<
  typeof DocumentationIngestJobParseChunksActionResponseSchema
>;
