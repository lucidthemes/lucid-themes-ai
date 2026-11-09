'use server';

import { revalidateTag } from 'next/cache';

import { backendAPIFetch } from '@/lib/backend-api';

import {
  DocumentationIngestJobParseUploadDocumentActionSchema,
  DocumentationIngestJobParseUploadWebpageActionSchema,
  DocumentationIngestJobParseUploadActionResponseSchema,
} from '../schemas/parse-upload-action.schema';
import type {
  DocumentationIngestJobParseUploadDocumentAction,
  DocumentationIngestJobParseUploadWebpageAction,
  DocumentationIngestJobParseUploadActionResponse,
} from '../schemas/parse-upload-action.schema';

async function createIngestJobParseUploadDocument({
  formData,
}: {
  formData: DocumentationIngestJobParseUploadDocumentAction;
}) {
  const parsedRequest = DocumentationIngestJobParseUploadDocumentActionSchema.safeParse(formData);

  if (!parsedRequest.success) {
    return { success: false };
  }

  const { data, error } = await backendAPIFetch<
    DocumentationIngestJobParseUploadDocumentAction,
    DocumentationIngestJobParseUploadActionResponse
  >({
    url: '/api/v1/search/documentation/ingest/jobs/document',
    method: 'POST',
    requestData: parsedRequest.data,
    requestDataFormat: 'form',
  });

  if (!data || error) {
    return { success: false };
  }

  const parsedResponse = DocumentationIngestJobParseUploadActionResponseSchema.safeParse(data);

  if (!parsedResponse.success) {
    return { success: false };
  }

  revalidateTag('documentation-ingest-jobs', 'max');
  revalidateTag('documentation-ingest-sources', 'max');
  revalidateTag('documentation-ingest-parse-jobs', 'max');

  return { success: true, parseJobId: parsedResponse.data.id };
}

async function createIngestJobParseUploadWebpage({
  formData,
}: {
  formData: DocumentationIngestJobParseUploadWebpageAction;
}) {
  const parsedRequest = DocumentationIngestJobParseUploadWebpageActionSchema.safeParse(formData);

  if (!parsedRequest.success) {
    return { success: false };
  }

  const { data, error } = await backendAPIFetch<
    DocumentationIngestJobParseUploadWebpageAction,
    DocumentationIngestJobParseUploadActionResponse
  >({
    url: '/api/v1/search/documentation/ingest/jobs/webpage',
    method: 'POST',
    requestData: parsedRequest.data,
  });

  if (!data || error) {
    return { success: false };
  }

  const parsedResponse = DocumentationIngestJobParseUploadActionResponseSchema.safeParse(data);

  if (!parsedResponse.success) {
    return { success: false };
  }

  revalidateTag('documentation-ingest-jobs', 'max');
  revalidateTag('documentation-ingest-sources', 'max');
  revalidateTag('documentation-ingest-parse-jobs', 'max');

  return { success: true, parseJobId: parsedResponse.data.id };
}

export { createIngestJobParseUploadDocument, createIngestJobParseUploadWebpage };
