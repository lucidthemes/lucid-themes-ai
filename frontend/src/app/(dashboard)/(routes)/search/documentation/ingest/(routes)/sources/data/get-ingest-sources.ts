import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import type { DocumentationIngestSource } from '../schemas/ingest-source.schema';
import { DocumentationIngestSourceSchema } from '../schemas/ingest-source.schema';

export default async function getDocumentationIngestSources(): Promise<DocumentationIngestSource[]> {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestSource[]>({
    url: '/api/v1/search/documentation/ingest/sources',
    cacheTags: ['documentation-ingest-sources'],
  });

  if (!data || error) {
    return [];
  }

  const parsedResponse = z.array(DocumentationIngestSourceSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return [];
  }

  return parsedResponse.data;
}
