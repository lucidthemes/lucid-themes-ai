'use server';

import { z } from 'zod';

import { getAuthAccessToken } from '@/lib/supabase/auth';
import { serverApiUrl } from '@/lib/api-urls';

import type {
  DocumentationIngestJobParseUploadDocumentForm,
  DocumentationIngestJobParseUploadWebpageForm,
} from '../schemas/parse-upload-form.schema';

import {
  DocumentationIngestJobParseUploadDocumentAction,
  DocumentationIngestJobParseUploadWebpageAction,
} from '../schemas/parse-upload-action.schema';

interface ParseUploadDocumentParams {
  name: string;
  formData: DocumentationIngestJobParseUploadDocumentForm;
}

// interface ParseUploadWebpageParams {
//   name: string;
//   formData: Omit<DocumentationIngestJobParseUploadWebpageForm, 'accept'>;
// }

async function createIngestJobParseUploadDocument({ name, formData }: ParseUploadDocumentParams) {
  return { success: true, parseJobId: '9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3' };
}

async function createIngestJobParseUploadWebpage({
  formData,
}: {
  formData: DocumentationIngestJobParseUploadWebpageAction;
}) {
  const token = await getAuthAccessToken();

  const url = `${serverApiUrl}/api/v1/search/documentation/ingest/job/new/webpage`;

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

    return { success: true, parseJobId: result.job_id };
  } catch (error) {
    console.error(error);

    return { success: false };
  }

  //return { success: false, parseJobId: '9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3' };
}

export { createIngestJobParseUploadDocument, createIngestJobParseUploadWebpage };
