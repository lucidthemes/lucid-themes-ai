import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { toast } from '@/components/ui/toast';

import {
  DocumentationIngestJobParseUploadDocumentFormSchema,
  DocumentationIngestJobParseUploadWebpageFormSchema,
} from '../schemas/parse-upload-form.schema';
import type {
  DocumentationIngestJobParseUploadDocumentForm,
  DocumentationIngestJobParseUploadWebpageForm,
} from '../schemas/parse-upload-form.schema';
import { useIngestJobNewStore } from '../store/ingest-job-new.store';

import {
  createIngestJobParseUploadDocument,
  createIngestJobParseUploadWebpage,
} from '../actions/create-parse-upload.action';

function useDocumentationIngestJobParseUploadDocumentForm() {
  const router = useRouter();

  const ingestJobname = useIngestJobNewStore((state) => state.ingestJobname);

  const form = useForm<DocumentationIngestJobParseUploadDocumentForm>({
    defaultValues: {
      pages: 'all',
      tier: 'cost_effective',
      tierAccept: false,
    },
    resolver: zodResolver(DocumentationIngestJobParseUploadDocumentFormSchema),
  });

  const createIngestJobParseUploadDocumentMutation = useMutation({
    mutationFn: createIngestJobParseUploadDocument,
    onSuccess: (result) => {
      if (result.success && result.parseJobId) {
        // console.log('good!');
        // console.log(result.parseJobId);

        router.push(`new/${result.parseJobId}`);
      } else {
        toast.add({
          type: 'error',
          description: 'Error creating parse job. Please try again.',
          priority: 'high',
        });
      }
    },
    onError: (error) => {
      const errorMessage = error.message;

      if (errorMessage.includes('body size limit')) {
        toast.add({
          type: 'error',
          description: 'Document file size exceeds limit',
          priority: 'high',
        });
      }
    },
  });

  const onSubmit = async (data: DocumentationIngestJobParseUploadDocumentForm) => {
    console.log(ingestJobname);
    console.log(data);

    const name = ingestJobname ?? 'New ingest job';

    createIngestJobParseUploadDocumentMutation.mutate({ name, formData: data });
  };

  return {
    form,
    onSubmit,
    isPending: createIngestJobParseUploadDocumentMutation.isPending,
  };
}

function useDocumentationIngestJobParseUploadWebpageForm() {
  const router = useRouter();

  const ingestJobname = useIngestJobNewStore((state) => state.ingestJobname);

  const form = useForm<DocumentationIngestJobParseUploadWebpageForm>({
    defaultValues: {
      url: '',
      tier: 'cost_effective',
      tierAccept: false,
    },
    resolver: zodResolver(DocumentationIngestJobParseUploadWebpageFormSchema),
  });

  const createIngestJobParseUploadWebpageMutation = useMutation({
    mutationFn: createIngestJobParseUploadWebpage,
    onSuccess: (result) => {
      if (result.success && result.parseJobId) {
        // console.log('good!');
        // console.log(result.parseJobId);

        router.push(result.parseJobId);
      } else {
        toast.add({
          type: 'error',
          description: 'Error creating parse job. Please try again.',
          priority: 'high',
        });
      }
    },
  });

  const onSubmit = async (data: DocumentationIngestJobParseUploadWebpageForm) => {
    console.log(ingestJobname);
    console.log(data);

    const name = ingestJobname ?? 'New ingest job';

    createIngestJobParseUploadWebpageMutation.mutate({ name, formData: data });
  };

  return {
    form,
    onSubmit,
    isPending: createIngestJobParseUploadWebpageMutation.isPending,
  };
}

export { useDocumentationIngestJobParseUploadDocumentForm, useDocumentationIngestJobParseUploadWebpageForm };
