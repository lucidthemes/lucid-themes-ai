import { z } from 'zod';

const DocumentationIngestJobParseUploadFormSchema = z.object({
  tier: z.enum(['agentic_plus', 'agentic', 'cost_effective', 'fast'], 'Please select a tier'),
  accept: z.boolean().refine((val) => val === true, {
    message: 'Please accept the credit usage',
  }),
});

export const DocumentationIngestJobParseUploadDocumentFormSchema = DocumentationIngestJobParseUploadFormSchema.extend({
  file: z
    .instanceof(File, { message: 'Please select a file' })
    .refine((file) => file.type === 'application/pdf', { message: 'Please select a PDF' }),
  pages: z.enum(['all', 'range'], 'Please select an option'),
  range_from: z.int().positive().optional(),
  range_to: z.int().positive().optional(),
}).superRefine((data, ctx) => {
  if (data.pages === 'range') {
    if (data.range_from === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['range_from'],
        message: 'Please enter the starting page',
      });
    }

    if (data.range_to === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['range_to'],
        message: 'Please enter the ending page',
      });
    }

    if (
      data.pages === 'range' &&
      data.range_from !== undefined &&
      data.range_to !== undefined &&
      data.range_from > data.range_to
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['range_to'],
        message: 'Ending page must be greater than or equal to starting page',
      });
    }
  }
});

export const DocumentationIngestJobParseUploadWebpageFormSchema = DocumentationIngestJobParseUploadFormSchema.extend({
  url: z.httpUrl('Please enter a URL'),
});

export type DocumentationIngestJobParseUploadForm = z.infer<typeof DocumentationIngestJobParseUploadFormSchema>;

export type DocumentationIngestJobParseUploadDocumentForm = z.infer<
  typeof DocumentationIngestJobParseUploadDocumentFormSchema
>;

export type DocumentationIngestJobParseUploadWebpageForm = z.infer<
  typeof DocumentationIngestJobParseUploadWebpageFormSchema
>;
