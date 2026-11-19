import { z } from 'zod';

export const DocumentationIngestJobTestFormSchema = z.object({
  search_type: z.enum(['semantic', 'keyword', 'hybrid']),
  similarity_metric: z.enum(['dot', 'cosine', 'euclidean']),
  phrase: z.string().min(1, 'Please enter a phrase'),
});

export type DocumentationIngestJobTestForm = z.infer<typeof DocumentationIngestJobTestFormSchema>;
