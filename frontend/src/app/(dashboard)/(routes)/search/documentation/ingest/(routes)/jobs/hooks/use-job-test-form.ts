import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import type { DocumentationIngestJobTestForm } from '../schemas/job-test-form.schema';
import { DocumentationIngestJobTestFormSchema } from '../schemas/job-test-form.schema';

export default function useDocumentationIngestJobTestForm() {
  const form = useForm<DocumentationIngestJobTestForm>({
    defaultValues: {
      search_type: 'semantic',
      similarity_metric: 'dot',
      phrase: '',
    },
    resolver: zodResolver(DocumentationIngestJobTestFormSchema),
  });

  //   const duplicateIngestJobMutation = useMutation({
  //     mutationFn: duplicateIngestJob,
  //     onSuccess: (result) => {
  //       if (result.success) {
  //         resetFormDialog();

  //         toast.add({
  //           type: 'success',
  //           description: 'Successfully duplicated',
  //         });
  //       } else {
  //         toast.add({
  //           type: 'error',
  //           description: 'Error duplicating ingest job. Please try again.',
  //           priority: 'high',
  //         });
  //       }
  //     },
  //   });

  const onSubmit = async (data: DocumentationIngestJobTestForm) => {
    console.log(data);
    // if (!item) return;

    // duplicateIngestJobMutation.mutate({ id: item.id, formData: data });
  };

  return {
    form,
    onSubmit,
    // isPending: duplicateIngestJobMutation.isPending,
  };
}
