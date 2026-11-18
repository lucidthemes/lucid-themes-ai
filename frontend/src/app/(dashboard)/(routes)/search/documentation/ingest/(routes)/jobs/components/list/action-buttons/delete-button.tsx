'use client';

import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { useAppDeleteDialogStore } from '@/store/dialogs/delete';

import type { DocumentationIngestJobs } from '../../../schemas/ingest-jobs.schema';
import deleteIngestJob from '../../../actions/delete-ingest-job.action';

export default function DocumentationIngestJobsListActionsButtonDeleteButton({
  item,
}: {
  item: DocumentationIngestJobs;
}) {
  const [isPending, startTransition] = useTransition();

  const resetDeleteDialog = useAppDeleteDialogStore((state) => state.resetDeleteDialog);

  return (
    <Button
      variant="destructive"
      className="cursor-pointer"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const result = await deleteIngestJob(item.id);

          if (result.success) {
            resetDeleteDialog();

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
      Delete
    </Button>
  );
}
