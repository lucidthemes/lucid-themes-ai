'use client';

import { createColumnHelper } from '@tanstack/react-table';

import type { DataTableFeatures } from '@/components/ui/data-table';
import { dateTimeFormat } from '@/lib/formatters';

import type { DocumentationIngestParseJob } from '../../schemas/ingest-parse-job.schema';
import DocumentationIngestParseJobsListColumnsViewButton from './view-button';

const columnHelper = createColumnHelper<DataTableFeatures, DocumentationIngestParseJob>();

export const DocumentationIngestParseJobsListColumns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'Id',
  }),

  columnHelper.display({
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const item = row.original;

      return <span className="capitalize">{item.status}</span>;
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
    id: 'updated_at',
    header: 'Updated',
    cell: ({ row }) => {
      const item = row.original;

      return dateTimeFormat(item.updated_at);
    },
  }),

  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="text-right">
          <DocumentationIngestParseJobsListColumnsViewButton item={item} />
        </div>
      );
    },
  }),
]);
