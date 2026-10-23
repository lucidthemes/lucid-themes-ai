import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { toast } from '@/components/ui/toast';

import type { DocumentationIngestJob } from '../../../schemas/ingest-job.schema';
import { useIngestJobNewStore } from '../store/ingest-job-new.store';

import { DocumentationIngestJobParseChunksFormSchema } from '../schemas/parse-chunks-form.schema';
import type { DocumentationIngestJobParseChunksForm } from '../schemas/parse-chunks-form.schema';
import createIngestJobParseChunks from '../actions/create-parse-chunks.action';

export default function useDocumentationIngestJobParseChunksForm({
  ingestJobData,
}: {
  ingestJobData?: DocumentationIngestJob;
}) {
  const setIngestJobParseChunks = useIngestJobNewStore((state) => state.setIngestJobParseChunks);

  const chunksContent =
    ingestJobData && ingestJobData.parse_job.markdown_full
      ? ingestJobData.parse_job.markdown_full
      : ingestJobData && ingestJobData.parse_job.text_full
        ? ingestJobData.parse_job.text_full
        : '';

  const form = useForm<DocumentationIngestJobParseChunksForm>({
    defaultValues: {
      method: 'markdown',
      content: chunksContent,
    },
    resolver: zodResolver(DocumentationIngestJobParseChunksFormSchema),
  });

  const createIngestJobParseChunksMutation = useMutation({
    mutationFn: createIngestJobParseChunks,
    onSuccess: (result) => {
      if (result.success) {
        console.log('good!');
        console.log(result.chunks);
        if (result.chunks) setIngestJobParseChunks(result.chunks);
      } else {
        toast.add({
          type: 'error',
          description: 'Error chunking parsed content. Please try again.',
          priority: 'high',
        });
      }
    },
  });

  const onSubmit = async (data: DocumentationIngestJobParseChunksForm) => {
    console.log(data);

    createIngestJobParseChunksMutation.mutate({ formData: data });
  };

  return {
    form,
    onSubmit,
    isPending: createIngestJobParseChunksMutation.isPending,
  };
}
