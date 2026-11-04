import { z } from 'zod';

import {
  DocumentationIngestJobParseUploadDocumentFormSchema,
  DocumentationIngestJobParseUploadWebpageFormSchema,
} from './parse-upload-form.schema';

export const DocumentationIngestJobParseUploadDocumentActionSchema =
  DocumentationIngestJobParseUploadDocumentFormSchema.extend({ name: z.string() });

export type DocumentationIngestJobParseUploadDocumentAction = z.infer<
  typeof DocumentationIngestJobParseUploadDocumentActionSchema
>;

export const DocumentationIngestJobParseUploadWebpageActionSchema =
  DocumentationIngestJobParseUploadWebpageFormSchema.extend({ name: z.string() });

export type DocumentationIngestJobParseUploadWebpageAction = z.infer<
  typeof DocumentationIngestJobParseUploadWebpageActionSchema
>;

export const DocumentationIngestJobParseUploadActionResponseSchema = z.object({
  job_id: z.uuid(),
});

export type DocumentationIngestJobParseUploadActionResponse = z.infer<
  typeof DocumentationIngestJobParseUploadActionResponseSchema
>;
