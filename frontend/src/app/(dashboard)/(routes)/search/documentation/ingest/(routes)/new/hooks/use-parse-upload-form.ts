// import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useMutation } from '@tanstack/react-query';

import {
  DocumentationIngestJobParseUploadDocumentFormSchema,
  DocumentationIngestJobParseUploadWebpageFormSchema,
} from '../schemas/parse-upload-form.schema';
import type {
  DocumentationIngestJobParseUploadDocumentForm,
  DocumentationIngestJobParseUploadWebpageForm,
} from '../schemas/parse-upload-form.schema';

function useDocumentationIngestJobParseUploadDocumentForm() {
  //   const router = useRouter();

  const form = useForm<DocumentationIngestJobParseUploadDocumentForm>({
    defaultValues: {
      //file: '',
      pages: 'all',
      tier: 'cost_effective',
      tierAccept: false,
    },
    resolver: zodResolver(DocumentationIngestJobParseUploadDocumentFormSchema),
  });

  //   const loginFormMutation = useMutation({
  //     mutationFn: signIn,
  //     onSuccess: (result) => {
  //       if (result.success) {
  //         router.push('/');
  //       } else {
  //         toast.error('Invalid login credentials');
  //       }
  //     },
  //   });

  const onSubmit = async (data: DocumentationIngestJobParseUploadDocumentForm) => {
    console.log(data);
    //loginFormMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    // isPending: loginFormMutation.isPending
  };
}

function useDocumentationIngestJobParseUploadWebpageForm() {
  //   const router = useRouter();

  const form = useForm<DocumentationIngestJobParseUploadWebpageForm>({
    defaultValues: {
      //url: '',
      tier: 'cost_effective',
      tierAccept: false,
    },
    resolver: zodResolver(DocumentationIngestJobParseUploadWebpageFormSchema),
  });

  //   const loginFormMutation = useMutation({
  //     mutationFn: signIn,
  //     onSuccess: (result) => {
  //       if (result.success) {
  //         router.push('/');
  //       } else {
  //         toast.error('Invalid login credentials');
  //       }
  //     },
  //   });

  const onSubmit = async (data: DocumentationIngestJobParseUploadWebpageForm) => {
    console.log(data);
    //loginFormMutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    // isPending: loginFormMutation.isPending
  };
}

export { useDocumentationIngestJobParseUploadDocumentForm, useDocumentationIngestJobParseUploadWebpageForm };
