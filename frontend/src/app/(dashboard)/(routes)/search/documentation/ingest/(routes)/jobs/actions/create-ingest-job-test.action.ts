'use server';

import type {
  DocumentationIngestJobTest,
  DocumentationIngestJobTestState,
  DocumentationIngestJobTestForm,
} from '../schemas/ingest-job-test.schema';

export default async function createIngestJobTest(
  previousState: DocumentationIngestJobTestState,
  formData: DocumentationIngestJobTestForm,
) {
  const result: DocumentationIngestJobTest = {
    id: '018244a2-9e58-4618-affe-e313be132aee',
    phrase: 'How do I install the theme? 222',
    search_type: 'semantic',
    similarity_metric: 'cosine',
    chunks: [
      {
        id: '018204a2-9e58-4618-affe-e313be132aee',
        content: 'test content 1 python',
        metadata: {
          source_type: 'document',
          file_name: 'some-pdf-file-here.pdf',
          'Header 1': 'Intro',
          'Header 2': 'History',
        },
        embedding: '[1.5, -0.4, 7.2, 19.6, 20.2]',
      },
      {
        id: '01df1db6-87f1-45f4-b34f-b6c5820addad',
        content: 'test content 2',
        metadata: {
          source_type: 'document',
          file_name: 'some-pdf-file-here.pdf',
          'Header 1': 'Intro',
          'Header 2': 'History',
        },
        embedding: '[1.5, -0.4, 7.2, 19.6, 20.2]',
      },
    ],
  };

  return { success: true, tests: [...previousState.tests, result] };
}
