'use client';

import { Eye } from 'lucide-react';
import { createColumnHelper } from '@tanstack/react-table';

import type { DataTableFeatures } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';

import type { DocumentationIngestSources } from '../../schemas/ingest-sources.schema';

const columnHelper = createColumnHelper<DataTableFeatures, DocumentationIngestSources>();

export const DocumentationIngestSourcesListcolumns = columnHelper.columns([
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
