'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getAuthAccessToken } from '@/lib/supabase/auth';
import { serverApiUrl } from '@/lib/api-urls';

import { DocumentationIngestJobParseChunkSchema } from '../schemas/parse-chunks-form.schema';
import type { DocumentationIngestJobParseChunk } from '../schemas/parse-chunks-form.schema';

export default async function createIngestJobChunksEmbeddings({
  chunks,
  ingestJobPathname,
}: {
  chunks: DocumentationIngestJobParseChunk[];
  ingestJobPathname: string;
}): Promise<{ success: boolean } | void> {
  const parsedChunks = z.array(DocumentationIngestJobParseChunkSchema).safeParse(chunks);

  if (!parsedChunks.success) {
    return { success: false };
  }

  const requestChunks = parsedChunks.data.map((chunk) => {
    return {
      content: chunk.content,
    };
  });

  const token = await getAuthAccessToken();

  const url = `${serverApiUrl}/api/v1/search/documentation/ingest/job/new/embeddings`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chunks: requestChunks }),
    });

    // console.log(response);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    // console.log(result);

    if (result.success === true) {
      revalidatePath(ingestJobPathname);
    }
  } catch (error) {
    // console.error(error);

    return { success: false };
  }
}
