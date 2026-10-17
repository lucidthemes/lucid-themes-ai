'use client';

import { createColumnHelper } from '@tanstack/react-table';

import type { DataTableFeatures } from '@/components/ui/data-table';

import type { DocumentationIngestJobsList } from '../../schemas/ingest-jobs-list.schema';
import DocumentationIngestJobsListActionsButtons from './actions-buttons';

const columnHelper = createColumnHelper<DataTableFeatures, DocumentationIngestJobsList>();

export const DocumentationIngestJobsListcolumns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'Id',
  }),

  columnHelper.accessor('type', {
    header: 'Type',
  }),

  columnHelper.accessor('status', {
    header: 'Status',
  }),

  //   columnHelper.accessor('created_at', {
  //     header: 'Created at',
  //   }),

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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;

      return <DocumentationIngestJobsListActionsButtons item={item} />;
    },
  }),
]);
