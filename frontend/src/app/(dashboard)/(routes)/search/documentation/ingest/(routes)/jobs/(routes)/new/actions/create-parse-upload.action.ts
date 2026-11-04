'use server';

// import { z } from 'zod';

// import { getAuthAccessToken } from '@/lib/supabase/auth';
// import { serverApiUrl } from '@/lib/api-urls';

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
    url: '/api/v1/search/documentation/ingest/job/new/document',
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

  return { success: true, parseJobId: parsedResponse.data.job_id };

  // const token = await getAuthAccessToken();

  // const url = `${serverApiUrl}/api/v1/search/documentation/ingest/job/new/document`;

  // const fetchFormData = new FormData();

  // Object.entries(formData).forEach(([key, value]) => {
  //   fetchFormData.append(key, value as string | Blob);
  // });

  // try {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: fetchFormData,
  //   });

  //   console.log(response);

  //   if (!response.ok) {
  //     throw new Error(`Response status: ${response.status}`);
  //   }

  //   const result = await response.json();
  //   console.log(result);

  //   return { success: true, parseJobId: result.job_id };
  // } catch (error) {
  //   console.error(error);

  //   return { success: false };
  // }
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
    url: '/api/v1/search/documentation/ingest/job/new/webpage',
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

  return { success: true, parseJobId: parsedResponse.data.job_id };

  // const token = await getAuthAccessToken();

  // const url = `${serverApiUrl}/api/v1/search/documentation/ingest/job/new/webpage`;

  // try {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   });

  //   console.log(response);

  //   if (!response.ok) {
  //     throw new Error(`Response status: ${response.status}`);
  //   }

  //   const result = await response.json();
  //   console.log(result);

  //   return { success: true, parseJobId: result.job_id };
  // } catch (error) {
  //   console.error(error);

  //   return { success: false };
  // }
}

export { createIngestJobParseUploadDocument, createIngestJobParseUploadWebpage };
