import { z } from 'zod';

import { backendAPIFetch } from '@/lib/backend-api';

import { DocumentationIngestSourcesSchema } from '../schemas/ingest-sources.schema';
import type { DocumentationIngestSources } from '../schemas/ingest-sources.schema';

export default async function getDocumentationIngestSources(): Promise<DocumentationIngestSources[]> {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestSources[]>({
    url: '/api/v1/search/documentation/ingest/sources',
  });

  if (!data || error) {
    return [];
  }

  const parsedResponse = z.array(DocumentationIngestSourcesSchema).safeParse(data ?? []);

  if (!parsedResponse.success) {
    return [];
  }

  return parsedResponse.data;
}
