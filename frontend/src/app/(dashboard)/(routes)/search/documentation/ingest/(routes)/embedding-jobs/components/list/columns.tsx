'use client';

import { Eye } from 'lucide-react';
import { createColumnHelper } from '@tanstack/react-table';

import type { DataTableFeatures } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

import type { DocumentationIngestEmbeddingJobs } from '../../schemas/ingest-embedding-jobs.schema';

const columnHelper = createColumnHelper<DataTableFeatures, DocumentationIngestEmbeddingJobs>();

export const DocumentationIngestEmbeddingJobsListcolumns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'Id',
  }),

  columnHelper.accessor('provider', {
    header: 'Provider',
  }),

  columnHelper.accessor('model', {
    header: 'Model',
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="text-right">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Eye />
          </Button>
        </div>
      );
    },
  }),
]);
