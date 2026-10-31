'use server';

import { revalidatePath } from 'next/cache';
import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestJobDuplicateActionSchema } from '../schemas/duplicate-ingest-job.schema';
import type { DocumentationIngestJobDuplicateAction } from '../schemas/duplicate-ingest-job.schema';

export default async function duplicateIngestJob(ingestJobId: string) {
  const parsedRequest = DocumentationIngestJobDuplicateActionSchema.safeParse(ingestJobId);

  if (!parsedRequest.success) {
    return { success: false };
  }

  const { error, status } = await backendAPIFetch<DocumentationIngestJobDuplicateAction, null>({
    url: `/api/v1/search/documentation/ingest/jobs/duplicate/${ingestJobId}`,
    method: 'POST',
    requestData: parsedRequest.data,
  });

  if (error || status !== 204) {
    return { success: false };
  }

  revalidatePath('/ingest');

  return { success: true };
}
