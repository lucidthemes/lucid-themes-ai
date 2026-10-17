'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DocumentationIngestJobsList } from '../../schemas/ingest-jobs-list.schema';

import { DocumentationIngestJobsListcolumns } from './columns';

export default function DocumentationIngestJobsListTable({
  ingestJobs,
}: {
  ingestJobs: DocumentationIngestJobsList[];
}) {
  return <DataTable columns={DocumentationIngestJobsListcolumns} data={ingestJobs} />;
}
