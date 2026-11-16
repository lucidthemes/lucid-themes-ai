'use client';

import { useTransition } from 'react';
import { Copy } from 'lucide-react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/toast';

import duplicateIngestJob from '../../../actions/duplicate-ingest-job.action';
import type { DocumentationIngestJobs } from '../../../schemas/ingest-jobs.schema';

export default function DocumentationIngestJobsListActionsButtonDuplicate({ item }: { item: DocumentationIngestJobs }) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const result = await duplicateIngestJob(item.id);

          if (result.success) {
            toast.add({
              type: 'success',
              description: 'Successfully duplicated',
            });
          } else {
            toast.add({
              type: 'error',
              description: 'Error duplicating ingest job. Please try again.',
              priority: 'high',
            });
          }
        });
      }}
    >
      <Copy />
      Duplicate parse
    </DropdownMenuItem>
  );
}
