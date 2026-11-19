'use client';

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import useDocumentationIngestJobTestForm from '../../../../hooks/use-job-test-form';

import DocumentationIngestJobTestingNewFieldSearchType from './field-search-type';
import DocumentationIngestJobTestingNewFieldSimilarityMetric from './field-similarity-metric';
import DocumentationIngestJobTestingNewFieldPhrase from './field-phrase';
import DocumentationIngestJobTestingNewCommonPhrases from './common-phrases';

export default function DocumentationIngestJobTestingNew({}) {
  const { form, onSubmit } = useDocumentationIngestJobTestForm();

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
          <DocumentationIngestJobTestingNewFieldPhrase form={form} />
        </form>
      </CardContent>
    </>
  );
}
