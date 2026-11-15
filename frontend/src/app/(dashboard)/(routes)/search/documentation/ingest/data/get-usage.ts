import { backendAPIFetch } from '@/lib/backend-api';

import type { DocumentationIngestParseJobUsage } from '../(routes)/parse-jobs/schemas/ingest-parse-job.schema';
import { DocumentationIngestParseJobUsageSchema } from '../(routes)/parse-jobs/schemas/ingest-parse-job.schema';

import type { DocumentationIngestEmbeddingJobUsage } from '../(routes)/embedding-jobs/schemas/ingest-embedding-job.schema';
import { DocumentationIngestEmbeddingJobUsageSchema } from '../(routes)/embedding-jobs/schemas/ingest-embedding-job.schema';

async function getDocumentationIngestUsageParse() {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestParseJobUsage>({
    url: '/api/v1/search/documentation/ingest/parse-jobs/usage',
    cacheTags: ['documentation-ingest-usage-parse'],
  });

  if (!data || error) {
    return null;
  }

  const parsedResponse = DocumentationIngestParseJobUsageSchema.safeParse(data);

  if (!parsedResponse.success) {
    return null;
  }

  return parsedResponse.data;
}

async function getDocumentationIngestUsageEmbedding() {
  const { data, error } = await backendAPIFetch<null, DocumentationIngestEmbeddingJobUsage>({
    url: '/api/v1/search/documentation/ingest/embedding-jobs/usage',
    cacheTags: ['documentation-ingest-usage-embedding'],
  });

  if (!data || error) {
    return null;
  }

  const parsedResponse = DocumentationIngestEmbeddingJobUsageSchema.safeParse(data);

  if (!parsedResponse.success) {
    return null;
  }

  return parsedResponse.data;
}

export { getDocumentationIngestUsageParse, getDocumentationIngestUsageEmbedding };
