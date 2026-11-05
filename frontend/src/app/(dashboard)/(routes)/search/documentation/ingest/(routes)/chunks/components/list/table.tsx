'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DocumentationIngestChunks } from '../../schemas/ingest-chunks.schema';
import { DocumentationIngestChunksListcolumns } from './columns';

export default function DocumentationIngestChunksListTable({
  ingestChunks,
}: {
  ingestChunks: DocumentationIngestChunks[];
}) {
  return <DataTable columns={DocumentationIngestChunksListcolumns} data={ingestChunks} />;
}
