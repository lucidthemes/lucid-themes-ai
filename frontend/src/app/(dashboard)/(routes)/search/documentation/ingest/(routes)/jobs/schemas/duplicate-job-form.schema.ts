import { z } from 'zod';

export const DocumentationIngestJobDuplicateFormSchema = z.object({
  name: z.string().min(1, 'Please enter a name'),
});

export type DocumentationIngestJobDuplicateForm = z.infer<typeof DocumentationIngestJobDuplicateFormSchema>;
