'use client';

import { createColumnHelper } from '@tanstack/react-table';

import type { DataTableFeatures } from '@/components/ui/data-table';
import { dateTimeFormat } from '@/lib/formatters';

import type { DocumentationIngestEmbeddingJob } from '../../schemas/ingest-embedding-job.schema';
import DocumentationIngestEmbeddingJobsListColumnsViewButton from './view-button';

const columnHelper = createColumnHelper<DataTableFeatures, DocumentationIngestEmbeddingJob>();

export const DocumentationIngestEmbeddingJobsListColumns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'Id',
  }),

  // columnHelper.accessor('provider', {
  //   header: 'Provider',
  // }),

  columnHelper.accessor('model', {
    header: 'Model',
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
          <DocumentationIngestEmbeddingJobsListColumnsViewButton item={item} />
        </div>
      );
    },
  }),
]);
