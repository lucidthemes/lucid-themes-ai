'use client';

import { useTransition } from 'react';
import { Trash } from 'lucide-react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/toast';

import deleteIngestJob from '../../../actions/delete-ingest-job.action';
import type { DocumentationIngestJobs } from '../../../schemas/ingest-jobs.schema';

export default function DocumentationIngestJobsListActionsButtonDelete({ item }: { item: DocumentationIngestJobs }) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      variant="destructive"
      className="cursor-pointer"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const result = await deleteIngestJob(item.id);

          if (result.success) {
            toast.add({
              type: 'success',
              description: 'Successfully deleted',
            });
          } else {
            toast.add({
              type: 'error',
              description: 'Error deleting ingest job. Please try again.',
              priority: 'high',
            });
          }
        });
      }}
    >
      <Trash />
      Delete
    </DropdownMenuItem>
  );
}
