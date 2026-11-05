'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DocumentationIngestEmbeddingJobs } from '../../schemas/ingest-embedding-jobs.schema';
import { DocumentationIngestEmbeddingJobsListcolumns } from './columns';

export default function DocumentationIngestEmbeddingJobsListTable({
  ingestEmbeddingJobs,
}: {
  ingestEmbeddingJobs: DocumentationIngestEmbeddingJobs[];
}) {
  return <DataTable columns={DocumentationIngestEmbeddingJobsListcolumns} data={ingestEmbeddingJobs} />;
}
