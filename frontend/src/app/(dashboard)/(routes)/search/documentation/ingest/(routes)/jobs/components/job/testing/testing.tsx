'use client';

import { useActionState, useEffect } from 'react';

import { Card } from '@/components/ui/card';

import { DocumentationIngestJobTestingHeading } from '../heading';
import DocumentationIngestJobTestingResults from './results';
import DocumentationIngestJobTestingNew from './new';

import createIngestJobTest from '../../../actions/create-ingest-job-test.action';

import { toast } from '@/components/ui/toast';

export default function DocumentationIngestJobTesting() {
  const tests = [
    {
      id: '018204a2-9e58-4618-affe-e313be132aee',
      phrase: 'How do I install the theme?',
      method: 'semantic',
      metric: 'cosine',
      chunks: [
        {
          id: '018204a2-9e48-4618-affe-e313be132aee',
        },
        {
          id: '018204a2-9e58-4618-affe-e313be182aee',
        },
      ],
    },
  ];

  const [state, submitAction, isPending] = useActionState(createIngestJobTest, tests);

  console.log(state);

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
        <DocumentationIngestJobTestingResults tests={state} />
        <DocumentationIngestJobTestingNew tests={state.tests} submitAction={submitAction} isPending={isPending} />
      </Card>
    </>
  );
}
