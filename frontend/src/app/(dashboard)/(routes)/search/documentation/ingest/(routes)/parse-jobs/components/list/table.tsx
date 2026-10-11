'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DocumentationIngestParseJob } from '../../schemas/ingest-parse-job.schema';
import { DocumentationIngestParseJobsListColumns } from './columns';

export default function DocumentationIngestParseJobsListTable({
  ingestParseJobs,
}: {
  ingestParseJobs: DocumentationIngestParseJob[];
}) {
  return <DataTable columns={DocumentationIngestParseJobsListColumns} data={ingestParseJobs} />;
}
