'use client';

import { createColumnHelper } from '@tanstack/react-table';

import type { DataTableFeatures } from '@/components/ui/data-table';
import { dateTimeFormat } from '@/lib/formatters';

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

      return <DocumentationIngestJobsListActionsButtons item={item} />;
    },
  }),
]);
