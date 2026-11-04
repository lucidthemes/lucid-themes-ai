import { z } from 'zod';

export const DocumentationIngestJobDuplicateActionSchema = z.uuid();

export type DocumentationIngestJobDuplicateAction = z.infer<typeof DocumentationIngestJobDuplicateActionSchema>;
