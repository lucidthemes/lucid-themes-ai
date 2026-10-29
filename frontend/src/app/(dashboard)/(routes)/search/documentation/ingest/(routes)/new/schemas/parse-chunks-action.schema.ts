import { z } from 'zod';

export const DocumentationIngestJobParseChunksActionResponseSchema = z.array(
  z.object({
    content: z.string(),
  }),
);

export type DocumentationIngestJobParseChunksActionResponse = z.infer<
  typeof DocumentationIngestJobParseChunksActionResponseSchema
>;
