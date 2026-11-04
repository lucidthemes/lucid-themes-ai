'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DocumentationIngestJobs } from '../../schemas/ingest-jobs.schema';

import { DocumentationIngestJobsListcolumns } from './columns';

export default function DocumentationIngestJobsListTable({ ingestJobs }: { ingestJobs: DocumentationIngestJobs[] }) {
  return <DataTable columns={DocumentationIngestJobsListcolumns} data={ingestJobs} />;
}
