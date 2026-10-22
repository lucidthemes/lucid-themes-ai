'use server';

import { z } from 'zod';

import { getAuthAccessToken } from '@/lib/supabase/auth';
import { serverApiUrl } from '@/lib/api-urls';

import { DocumentationIngestJobChunkSchema } from '../../../schemas/ingest-job.schema';

import { DocumentationIngestJobParseChunksFormSchema } from '../schemas/parse-chunks-form.schema';
import type { DocumentationIngestJobParseChunksForm } from '../schemas/parse-chunks-form.schema';

export default async function createIngestJobParseChunks({
  formData,
}: {
  formData: DocumentationIngestJobParseChunksForm;
}) {
  const parsedFormData = DocumentationIngestJobParseChunksFormSchema.safeParse(formData);

  if (!parsedFormData.success) {
    return { success: false };
  }

  const token = await getAuthAccessToken();

  const url = `${serverApiUrl}/api/v1/search/documentation/ingest/job/new/chunks`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    const parsedChunks = z.array(DocumentationIngestJobChunkSchema).safeParse(result.chunks);

    if (!parsedChunks.success) {
      return { success: false };
    }

    return { success: true, chunks: parsedChunks.data };
  } catch (error) {
    console.error(error);

    return { success: false };
  }
}
