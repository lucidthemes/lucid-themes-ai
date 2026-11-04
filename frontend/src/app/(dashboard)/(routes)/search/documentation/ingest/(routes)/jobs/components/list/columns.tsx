'use client';

import { createColumnHelper } from '@tanstack/react-table';

import type { DataTableFeatures } from '@/components/ui/data-table';

import type { DocumentationIngestJobs } from '../../schemas/ingest-jobs.schema';
import DocumentationIngestJobsListActionsButtons from './actions-buttons';

const columnHelper = createColumnHelper<DataTableFeatures, DocumentationIngestJobs>();

export const DocumentationIngestJobsListcolumns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'Id',
  }),

  columnHelper.accessor('name', {
    header: 'Name',
  }),

  columnHelper.display({
    id: 'source',
    header: 'Source',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex flex-col gap-1">
          <span className="capitalize">{item.source.type}</span>
          {item.source.file_name && <span>{item.source.file_name}</span>}
          {item.source.webpage_url && <span>{item.source.webpage_url}</span>}
        </div>
      );
    },
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

      return item.created_at;
      // return dateTimeFormat(item.created_at);
    },
  }),

  columnHelper.display({
    id: 'updated_at',
    header: 'Updated',
    cell: ({ row }) => {
      const item = row.original;

      return item.created_at;
      // return dateTimeFormat(item.created_at);
    },
  }),

  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;

      return <DocumentationIngestJobsListActionsButtons item={item} />;
    },
  }),
]);
