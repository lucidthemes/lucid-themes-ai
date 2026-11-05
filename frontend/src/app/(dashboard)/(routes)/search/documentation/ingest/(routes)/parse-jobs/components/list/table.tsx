'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DocumentationIngestParseJobs } from '../../schemas/ingest-parse-jobs.schema';
import { DocumentationIngestParseJobsListcolumns } from './columns';

export default function DocumentationIngestParseJobsListTable({
  ingestParseJobs,
}: {
  ingestParseJobs: DocumentationIngestParseJobs[];
}) {
  return <DataTable columns={DocumentationIngestParseJobsListcolumns} data={ingestParseJobs} />;
}
