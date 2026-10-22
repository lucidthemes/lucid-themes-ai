import { z } from 'zod';

import { serverApiUrl } from '@/lib/api-urls';
import { getAuthAccessToken } from '@/lib/supabase/auth';

import { DocumentationIngestJobsListSchema } from '../schemas/ingest-jobs-list.schema';
import type { DocumentationIngestJobsList } from '../schemas/ingest-jobs-list.schema';

export default async function getDocumentationIngestJobs(): Promise<DocumentationIngestJobsList[]> {
  const token = await getAuthAccessToken();

  const url = `${serverApiUrl}/api/v1/search/documentation/ingest/jobs`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    console.log(result);

    const parsed = z.array(DocumentationIngestJobsListSchema).safeParse(result ?? []);

    if (!parsed.success) {
      console.log(parsed.error.message);
      return [];
    }

    return parsed.data;
    // console.log(result);
  } catch (error) {
    // console.error(error);

    return [];
  }
}
