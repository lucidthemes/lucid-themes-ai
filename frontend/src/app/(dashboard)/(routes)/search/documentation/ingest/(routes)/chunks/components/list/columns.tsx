'use client';

import { createColumnHelper } from '@tanstack/react-table';

import type { DataTableFeatures } from '@/components/ui/data-table';
import { dateTimeFormat } from '@/lib/formatters';

import type { DocumentationIngestChunk } from '../../schemas/ingest-chunk.schema';
import DocumentationIngestChunksListColumnsViewButton from './view-button';

const columnHelper = createColumnHelper<DataTableFeatures, DocumentationIngestChunk>();

export const DocumentationIngestChunksListColumns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'Id',
  }),

  columnHelper.accessor('content', {
    header: 'Content',
  }),

  columnHelper.display({
    id: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const item = row.original;

      return dateTimeFormat(item.created_at);
    },
  }),

  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="text-right">
          <DocumentationIngestChunksListColumnsViewButton item={item} />
        </div>
      );
    },
  }),
]);
