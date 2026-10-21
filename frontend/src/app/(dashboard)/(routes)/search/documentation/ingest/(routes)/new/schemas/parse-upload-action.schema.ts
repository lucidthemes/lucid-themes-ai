import { z } from 'zod';

import {
  DocumentationIngestJobParseUploadDocumentFormSchema,
  DocumentationIngestJobParseUploadWebpageFormSchema,
} from './parse-upload-form.schema';

export const DocumentationIngestJobParseUploadDocumentActionSchema =
  DocumentationIngestJobParseUploadDocumentFormSchema.extend({ name: z.string() }).omit({ accept: true });

export type DocumentationIngestJobParseUploadDocumentAction = z.infer<
  typeof DocumentationIngestJobParseUploadDocumentActionSchema
>;

export const DocumentationIngestJobParseUploadWebpageActionSchema =
  DocumentationIngestJobParseUploadWebpageFormSchema.extend({ name: z.string() }).omit({ accept: true });

export type DocumentationIngestJobParseUploadWebpageAction = z.infer<
  typeof DocumentationIngestJobParseUploadWebpageActionSchema
>;
