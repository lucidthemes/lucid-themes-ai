'use client';

import { createColumnHelper } from '@tanstack/react-table';

import type { DataTableFeatures } from '@/components/ui/data-table';
import { dateTimeFormat } from '@/lib/formatters';

import type { DocumentationIngestSource } from '../../schemas/ingest-source.schema';
import DocumentationIngestSourcesListColumnsViewButton from './view-button';

const columnHelper = createColumnHelper<DataTableFeatures, DocumentationIngestSource>();

export const DocumentationIngestSourcesListColumns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'Id',
  }),

  columnHelper.display({
    id: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const item = row.original;

      return <span className="capitalize">{item.type}</span>;
    },
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
          <DocumentationIngestSourcesListColumnsViewButton item={item} />
        </div>
      );
    },
  }),
]);
