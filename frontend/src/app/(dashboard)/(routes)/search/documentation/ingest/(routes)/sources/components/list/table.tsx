'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DocumentationIngestSource } from '../../schemas/ingest-source.schema';
import { DocumentationIngestSourcesListColumns } from './columns';

export default function DocumentationIngestSourcesListTable({
  ingestSources,
}: {
  ingestSources: DocumentationIngestSource[];
}) {
  return <DataTable columns={DocumentationIngestSourcesListColumns} data={ingestSources} />;
}
