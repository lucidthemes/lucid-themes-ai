'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

export default async function deleteIngestJob(ingestJobId: string) {
  const parsedIngestJobId = z.uuid().safeParse(ingestJobId);

  if (!parsedIngestJobId.success) {
    return { success: false };
  }

  const { error, status } = await backendAPIFetch({
    url: `/api/v1/search/documentation/ingest/jobs/${ingestJobId}`,
    method: 'DELETE',
  });

  if (error || status !== 204) {
    return { success: false };
  }

  revalidateTag('documentation-ingest-jobs', 'max');

  return { success: true };
}
