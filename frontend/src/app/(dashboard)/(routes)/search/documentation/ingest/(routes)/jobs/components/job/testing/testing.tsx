'use client';

import { useActionState, useEffect } from 'react';

import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/toast';

import createIngestJobTest from '../../../actions/create-ingest-job-test.action';
import type { DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

import { DocumentationIngestJobTestingHeading } from '../heading';
import DocumentationIngestJobTestingResults from './results';
import DocumentationIngestJobTestingNew from './new';

import type {
  DocumentationIngestJobTest,
  DocumentationIngestJobTestState,
} from '../../../schemas/ingest-job-test.schema';

export default function DocumentationIngestJobTesting({ ingestJobData }: { ingestJobData: DocumentationIngestJob }) {
  const tests: DocumentationIngestJobTest[] = [
    {
      id: '018204a2-9e58-4618-affe-e313be132aee',
      phrase: 'How do I install the theme?',
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
    },
  ];

  const initialState: DocumentationIngestJobTestState = {
    success: null,
    tests: tests ?? [],
  };

  const [state, submitAction, isPending] = useActionState(createIngestJobTest, initialState);

  useEffect(() => {
    if (state.success === null) return;

    if (state.success) {
      toast.add({
        type: 'success',
        description: 'Successfully completed test',
      });
    } else {
      toast.add({
        type: 'error',
        description: 'Error running test. Please try again.',
        priority: 'high',
      });
    }
  }, [state]);

  return (
    <>
      <DocumentationIngestJobTestingHeading />
      <Card>
        <DocumentationIngestJobTestingResults tests={state.tests} />
        <DocumentationIngestJobTestingNew submitAction={submitAction} isPending={isPending} />
      </Card>
    </>
  );
}
