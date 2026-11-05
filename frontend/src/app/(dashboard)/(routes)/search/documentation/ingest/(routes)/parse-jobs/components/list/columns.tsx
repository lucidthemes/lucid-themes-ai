'use client';

import { Eye } from 'lucide-react';
import { createColumnHelper } from '@tanstack/react-table';

import type { DataTableFeatures } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

import type { DocumentationIngestParseJobs } from '../../schemas/ingest-parse-jobs.schema';

const columnHelper = createColumnHelper<DataTableFeatures, DocumentationIngestParseJobs>();

export const DocumentationIngestParseJobsListcolumns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'Id',
  }),

  columnHelper.accessor('llamaparse_job_id', {
    header: 'Llamaparse job id',
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
