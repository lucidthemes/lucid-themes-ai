import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { toast } from '@/components/ui/toast';

import type { DocumentationIngestJob } from '../../../schemas/ingest-job.schema';
import { useIngestJobNewStore } from '../store/ingest-job-new.store';

import { DocumentationIngestJobChunksCreateFormSchema } from '../schemas/chunks-create-form.schema';
import type { DocumentationIngestJobChunksCreateForm } from '../schemas/chunks-create-form.schema';
import createIngestJobChunks from '../actions/create-chunks.action';

export default function useDocumentationIngestJobChunksCreateForm({
  ingestJobData,
}: {
  ingestJobData?: DocumentationIngestJob;
}) {
  const setIngestJobChunksCreated = useIngestJobNewStore((state) => state.setIngestJobChunksCreated);

  const lastParseJob = ingestJobData?.parse_jobs.at(-1);

  const chunksContent =
    lastParseJob && lastParseJob.markdown_full
      ? lastParseJob.markdown_full
      : lastParseJob && lastParseJob.text_full
        ? lastParseJob.text_full
        : '';

  const chunksSource = ingestJobData && ingestJobData.source;

  const form = useForm<DocumentationIngestJobChunksCreateForm>({
    defaultValues: {
      split_method: 'markdown',
      chunk_size: 250,
      chunk_overlap: 30,
      content: chunksContent,
      source: chunksSource,
    },
    resolver: zodResolver(DocumentationIngestJobChunksCreateFormSchema),
  });

  const createIngestJobChunksMutation = useMutation({
    mutationFn: createIngestJobChunks,
    onSuccess: (result) => {
      if (result.success) {
        if (result.chunks) {
          const structuredCreatedChunks = result.chunks.map((chunk) => {
            return { ...chunk, embedding: '' };
          });

          setIngestJobChunksCreated(structuredCreatedChunks);
        }
      } else {
        toast.add({
          type: 'error',
          description: 'Error creating chunks. Please try again.',
          priority: 'high',
        });
      }
    },
  });

  const onSubmit = async (data: DocumentationIngestJobChunksCreateForm) => {
    if (!ingestJobData) return;

    createIngestJobChunksMutation.mutate({ ingestJobId: ingestJobData.id, formData: data });
  };

  return {
    form,
    onSubmit,
    isPending: createIngestJobChunksMutation.isPending,
  };
}
