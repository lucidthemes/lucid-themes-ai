// import { serverApiUrl } from '@/lib/api-urls';
// import { getAuthAccessToken } from '@/lib/supabase/auth';

import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestJobSchema } from '../../../schemas/ingest-job.schema';
import type { DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

export default async function getDocumentationIngestJob(jobId: string): Promise<DocumentationIngestJob | null> {
  // const token = await getAuthAccessToken();

  // const url = `${serverApiUrl}/api/v1/search/documentation/ingest/job/${jobId}`;

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

  //   // console.log(result);

  //   const parsed = DocumentationIngestJobSchema.safeParse(result);

  //   if (!parsed.success) {
  //     console.log(parsed.error.message);
  //     return null;
  //   }

  //   return parsed.data;
  //   // console.log(result);
  // } catch (error) {
  //   // console.error(error);

  //   return null;
  // }

  const { data, error } = await backendAPIFetch<null, DocumentationIngestJob>({
    url: `/api/v1/search/documentation/ingest/job/${jobId}`,
  });

  if (!data || error) {
    return null;
  }

  const parsed = DocumentationIngestJobSchema.safeParse(data);

  if (!parsed.success) {
    return null;
  }

  return parsed.data;
}
