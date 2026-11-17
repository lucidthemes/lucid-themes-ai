'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import type { DocumentationIngestJobDuplicateForm } from '../schemas/duplicate-job-form.schema';
import { DocumentationIngestJobDuplicateFormSchema } from '../schemas/duplicate-job-form.schema';

export default async function duplicateIngestJob({
  id,
  formData,
}: {
  id: string;
  formData: DocumentationIngestJobDuplicateForm;
}) {
  const parsedJobId = z.uuid().safeParse(id);
  const parsedFormData = DocumentationIngestJobDuplicateFormSchema.safeParse(formData);

  if (!parsedJobId.success || !parsedFormData.success) {
    return { success: false };
  }

  const { error, status } = await backendAPIFetch({
    url: `/api/v1/search/documentation/ingest/jobs/${parsedJobId.data}/duplicate`,
    method: 'POST',
    requestQueryParams: {
      name: parsedFormData.data.name,
    },
  });

  if (error || status !== 204) {
    return { success: false };
  }

  revalidateTag('documentation-ingest-jobs', 'max');

  return { success: true };
}
