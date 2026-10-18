import { z } from 'zod';

const DocumentationIngestJobParseUploadFormSchema = z.object({
  tier: z.enum(['agentic_plus', 'agentic', 'cost_effective', 'fast'], 'Please select a tier'),
  tierAccept: z.boolean().refine((val) => val === true, {
    message: 'Please accept the credit usage',
  }),
});

export type DocumentationIngestJobParseUploadForm = z.infer<typeof DocumentationIngestJobParseUploadFormSchema>;

export const DocumentationIngestJobParseUploadDocumentFormSchema = DocumentationIngestJobParseUploadFormSchema.extend({
  file: z
    .instanceof(File, { message: 'Please select a file' })
    .refine((file) => file.type === 'application/pdf', { message: 'Please select a PDF' }),
  pages: z.enum(['all', 'range'], 'Please select an option'),
});

export type DocumentationIngestJobParseUploadDocumentForm = z.infer<
  typeof DocumentationIngestJobParseUploadDocumentFormSchema
>;

export const DocumentationIngestJobParseUploadWebpageFormSchema = DocumentationIngestJobParseUploadFormSchema.extend({
  url: z.httpUrl('Please enter a URL'),
});

export type DocumentationIngestJobParseUploadWebpageForm = z.infer<
  typeof DocumentationIngestJobParseUploadWebpageFormSchema
>;
