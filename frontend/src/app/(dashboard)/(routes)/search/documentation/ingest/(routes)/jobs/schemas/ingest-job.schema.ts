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

// export const DocumentationIngestJobSourceSchema = z.object({
//   type: z.enum(['document', 'webpage']),
//   file_name: z.string().nullable(),
//   file_url: z.string().nullable(),
//   webpage_url: z.string().nullable(),
// });

// export const DocumentationIngestJobParseJobSchema = z.object({
//   id: z.uuid(),
//   llamaparse_job_id: z.string(),
//   status: z.enum(['pending', 'completed', 'failed']),
//   markdown_full: z.string().nullable(),
//   text_full: z.string().nullable(),
//   tier: z.string().nullable(),
//   error_message: z.string().nullable(),
//   usage: z
//     .object({
//       credits: z.int().nullable(),
//     })
//     .nullable(),
// });

// export const DocumentationIngestJobChunkSchema = z.object({
//   id: z.uuid(),
//   content: z.string(),
//   metadata: z.object().loose(),
//   // embedding: z.string().optional(),
//   embedding: z.string(),
// });

export const DocumentationIngestJobSchema = z.object({
  id: z.uuid(),
  //user_id: z.uuid(),
  name: z.string(),
  //source: DocumentationIngestJobSourceSchema,
  source: DocumentationIngestJobSourceSchema,
  // parse_job: z.object({
  //   id: z.uuid(),
  //   llamaparse_job_id: z.string(),
  //   status: z.enum(['pending', 'completed', 'failed']),
  //   markdown_full: z.string().nullable(),
  //   text_full: z.string().nullable(),
  //   tier: z.string().nullable(),
  //   error_message: z.string().nullable(),
  //   usage: z
  //     .object({
  //       credits: z.int().nullable(),
  //     })
  //     .nullable(),
  // }),
  //parse_jobs: z.array(DocumentationIngestJobParseJobSchema),
  parse_jobs: z.array(DocumentationIngestJobParseJobSchema),
  // embeddings_job: z
  //   .object({
  //     model: z.string(),
  //     usage: z.object({
  //       prompt_tokens: z.int().positive(),
  //       total_tokens: z.int().positive(),
  //     }),
  //   })
  //   .nullable(),
  embeddings_job: DocumentationIngestJobEmbeddingJobSchema.nullable(),
  // chunks: z.array(DocumentationIngestJobChunkSchema).optional().nullable(),
  chunks: z.array(DocumentationIngestJobChunkSchema).nullable(),
  status: z.enum(['pending', 'completed', 'failed']),
  created_at: z.string(),
  updated_at: z.string(),
});

export type DocumentationIngestJob = z.infer<typeof DocumentationIngestJobSchema>;

export type DocumentationIngestJobStatus = DocumentationIngestJob['status'] | 'new';

export type DocumentationIngestJobParseJob = z.infer<typeof DocumentationIngestJobParseJobSchema>;

export type DocumentationIngestJobChunk = z.infer<typeof DocumentationIngestJobChunkSchema>;
