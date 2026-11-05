'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DocumentationIngestSources } from '../../schemas/ingest-sources.schema';
import { DocumentationIngestSourcesListcolumns } from './columns';

export default function DocumentationIngestSourcesListTable({
  ingestSources,
}: {
  ingestSources: DocumentationIngestSources[];
}) {
  return <DataTable columns={DocumentationIngestSourcesListcolumns} data={ingestSources} />;
}
