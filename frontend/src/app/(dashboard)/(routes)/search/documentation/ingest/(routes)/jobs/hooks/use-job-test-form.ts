import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { DocumentationIngestJobTestForm } from '../schemas/job-test-form.schema';
import { DocumentationIngestJobTestFormSchema } from '../schemas/job-test-form.schema';

type SubmitAction = (values: DocumentationIngestJobTestForm) => void;

export default function useDocumentationIngestJobTestForm(submitAction: SubmitAction) {
  const form = useForm<DocumentationIngestJobTestForm>({
    defaultValues: {
      search_type: 'semantic',
      similarity_metric: 'dot',
      phrase: '',
    },
    resolver: zodResolver(DocumentationIngestJobTestFormSchema),
  });

  const onSubmit = async (data: DocumentationIngestJobTestForm) => {
    console.log(data);

    startTransition(() => {
      submitAction(data);
    });
  };

  return {
    form,
    onSubmit,
  };
}
