'use client';

import { DataTable } from '@/components/ui/data-table';

import type { DocumentationIngestChunk } from '../../schemas/ingest-chunk.schema';
import { DocumentationIngestChunksListColumns } from './columns';

export default function DocumentationIngestChunksListTable({
  ingestChunks,
}: {
  ingestChunks: DocumentationIngestChunk[];
}) {
  return <DataTable columns={DocumentationIngestChunksListColumns} data={ingestChunks} />;
}
