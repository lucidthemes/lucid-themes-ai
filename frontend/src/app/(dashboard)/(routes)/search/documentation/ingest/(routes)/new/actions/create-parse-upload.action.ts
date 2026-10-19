'use server';

import { z } from 'zod';

import type {
  DocumentationIngestJobParseUploadDocumentForm,
  DocumentationIngestJobParseUploadWebpageForm,
} from '../schemas/parse-upload-form.schema';

interface ParseUploadDocumentParams {
  name: string;
  formData: DocumentationIngestJobParseUploadDocumentForm;
}

interface ParseUploadWebpageParams {
  name: string;
  formData: DocumentationIngestJobParseUploadWebpageForm;
}

async function createIngestJobParseUploadDocument({ name, formData }: ParseUploadDocumentParams) {
  return { success: true, parseJobId: '9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3' };
}

async function createIngestJobParseUploadWebpage({ name, formData }: ParseUploadWebpageParams) {
  return { success: true, parseJobId: '9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3' };
}

export { createIngestJobParseUploadDocument, createIngestJobParseUploadWebpage };
