'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DocumentationIngestEmbeddingJob } from '../../schemas/ingest-embedding-job.schema';
import { DocumentationIngestEmbeddingJobsListColumns } from './columns';

export default function DocumentationIngestEmbeddingJobsListTable({
  ingestEmbeddingJobs,
}: {
  ingestEmbeddingJobs: DocumentationIngestEmbeddingJob[];
}) {
  return <DataTable columns={DocumentationIngestEmbeddingJobsListColumns} data={ingestEmbeddingJobs} />;
}
