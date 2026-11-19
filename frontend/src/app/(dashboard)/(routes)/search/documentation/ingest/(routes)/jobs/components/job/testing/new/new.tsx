'use client';

// import { useActionState } from 'react';

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import useDocumentationIngestJobTestForm from '../../../../hooks/use-job-test-form';

import DocumentationIngestJobTestingNewFieldSearchType from './field-search-type';
import DocumentationIngestJobTestingNewFieldSimilarityMetric from './field-similarity-metric';
import DocumentationIngestJobTestingNewFieldPhrase from './field-phrase';
import DocumentationIngestJobTestingNewCommonPhrases from './common-phrases';

// import createIngestJobTest from '../../../../actions/create-ingest-job-test.action';

export default function DocumentationIngestJobTestingNew({ tests, submitAction, isPending }) {
  //   const [state, submitAction, isPending] = useActionState(createIngestJobTest, tests);

  const { form, onSubmit } = useDocumentationIngestJobTestForm(submitAction);

  return (
    <>
      <CardHeader>
        <CardTitle>New test</CardTitle>
        <CardDescription>Create a new test by submitting a search phrase</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
          <DocumentationIngestJobTestingNewFieldSearchType form={form} />
          <DocumentationIngestJobTestingNewFieldSimilarityMetric form={form} />
          <DocumentationIngestJobTestingNewCommonPhrases />
          <DocumentationIngestJobTestingNewFieldPhrase form={form} isPending={isPending} />
        </form>
      </CardContent>
    </>
  );
}
