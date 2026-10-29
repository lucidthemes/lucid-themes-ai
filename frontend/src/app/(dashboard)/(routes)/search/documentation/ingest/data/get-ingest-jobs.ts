import { z } from 'zod';

// import { serverApiUrl } from '@/lib/api-urls';
// import { getAuthAccessToken } from '@/lib/supabase/auth';

import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestJobsSchema } from '../schemas/ingest-jobs.schema';
import type { DocumentationIngestJobs } from '../schemas/ingest-jobs.schema';

export default async function getDocumentationIngestJobs(): Promise<DocumentationIngestJobs[]> {
  // const token = await getAuthAccessToken();

  // const url = `${serverApiUrl}/api/v1/search/documentation/ingest/jobs`;

  // try {
  //   const response = await fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error(`Response status: ${response.status}`);
  //   }

  //   const result = await response.json();

  //   console.log(result);

  //   const parsed = z.array(DocumentationIngestJobsListSchema).safeParse(result ?? []);

  //   if (!parsed.success) {
  //     console.log(parsed.error.message);
  //     return [];
  //   }

  //   return parsed.data;
  //   // console.log(result);
  // } catch (error) {
  //   // console.error(error);

  //   return [];
  // }

  const { data, error } = await backendAPIFetch<null, DocumentationIngestJobs[]>({
    url: '/api/v1/search/documentation/ingest/jobs',
  });

  if (!data || error) {
    return [];
  }

  const parsed = z.array(DocumentationIngestJobsSchema).safeParse(data ?? []);

  if (!parsed.success) {
    return [];
  }

  return parsed.data;
}
