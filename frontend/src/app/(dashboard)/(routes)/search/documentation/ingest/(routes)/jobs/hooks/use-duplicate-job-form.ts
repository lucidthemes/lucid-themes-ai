import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { toast } from '@/components/ui/toast';
import { useAppFormDialogStore } from '@/store/dialogs/form';

import duplicateIngestJob from '../actions/duplicate-ingest-job.action';
import type { DocumentationIngestJobs } from '../schemas/ingest-jobs.schema';
import type { DocumentationIngestJobDuplicateForm } from '../schemas/duplicate-job-form.schema';
import { DocumentationIngestJobDuplicateFormSchema } from '../schemas/duplicate-job-form.schema';

export default function useDocumentationIngestJobDuplicateForm({ item }: { item?: DocumentationIngestJobs }) {
  const resetFormDialog = useAppFormDialogStore((state) => state.resetFormDialog);

  const form = useForm<DocumentationIngestJobDuplicateForm>({
    defaultValues: {
      name: item?.name + ' - copy' || '',
    },
    resolver: zodResolver(DocumentationIngestJobDuplicateFormSchema),
  });

  const duplicateIngestJobMutation = useMutation({
    mutationFn: duplicateIngestJob,
    onSuccess: (result) => {
      if (result.success) {
        resetFormDialog();

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
    },
  });

  const onSubmit = async (data: DocumentationIngestJobDuplicateForm) => {
    if (!item) return;

    duplicateIngestJobMutation.mutate({ id: item.id, formData: data });
  };

  return {
    form,
    onSubmit,
    isPending: duplicateIngestJobMutation.isPending,
  };
}
