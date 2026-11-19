import { z } from 'zod';

import { DocumentationIngestSourceSchema } from '../../sources/schemas/ingest-source.schema';
import { DocumentationIngestParseJobSchema } from '../../parse-jobs/schemas/ingest-parse-job.schema';
import { DocumentationIngestEmbeddingJobSchema } from '../../embedding-jobs/schemas/ingest-embedding-job.schema';
import { DocumentationIngestChunkSchema } from '../../chunks/schemas/ingest-chunk.schema';

export const DocumentationIngestJobSourceSchema = DocumentationIngestSourceSchema.omit({ id: true, created_at: true });

export const DocumentationIngestJobParseJobSchema = DocumentationIngestParseJobSchema.omit({
  ingest_job_id: true,
  created_at: true,
  updated_at: true,
});

export const DocumentationIngestJobEmbeddingJobSchema = DocumentationIngestEmbeddingJobSchema.omit({
  id: true,
  parse_job_id: true,
  created_at: true,
});

export const DocumentationIngestJobChunkSchema = DocumentationIngestChunkSchema.omit({
  ingest_job_id: true,
  created_at: true,
});

export const DocumentationIngestJobSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  source: DocumentationIngestJobSourceSchema,
  parse_jobs: z.array(DocumentationIngestJobParseJobSchema),
  embeddings_job: DocumentationIngestJobEmbeddingJobSchema.nullable(),
  chunks: z.array(DocumentationIngestJobChunkSchema).nullable(),
  status: z.enum(['pending', 'completed', 'failed']),
  created_at: z.string(),
  updated_at: z.string(),
});

export type DocumentationIngestJob = z.infer<typeof DocumentationIngestJobSchema>;

export type DocumentationIngestJobStatus = DocumentationIngestJob['status'] | 'new';

export type DocumentationIngestJobParseJob = z.infer<typeof DocumentationIngestJobParseJobSchema>;

export type DocumentationIngestJobChunk = z.infer<typeof DocumentationIngestJobChunkSchema>;
