'use client';

import { useState } from 'react';

import { CardContent, CardDescription, CardHeader, CardTitle, CardAction } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import type { DocumentationIngestJobTest } from '../../../../schemas/ingest-job-test.schema';

import DocumentationIngestJobTestingResultsItems from './items';
import DocumentationIngestJobTestingResultsEmpty from './empty';

export default function DocumentationIngestJobTestingResults({ tests }: { tests: DocumentationIngestJobTest[] }) {
  const [showMetadata, setShowMetadata] = useState(false);
  const [showEmbeddings, setShowEmbeddings] = useState(false);

  if (!tests) return;

  const resultsCount = tests.length;

  return (
    <>
      <CardHeader>
        <CardTitle>Tests ({resultsCount})</CardTitle>
        <CardDescription>Previous test results</CardDescription>
        <CardAction className="self-end">
          <div className="flex justify-end gap-5">
            <div className="flex items-center gap-2.5">
              <Switch
                id="show-tests-chunks-metadata"
                className="cursor-pointer"
                checked={showMetadata}
                onCheckedChange={() => setShowMetadata((showMetadata) => !showMetadata)}
              />
              <Label htmlFor="show-tests-chunks-metadata">Show metadata</Label>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <Switch
                id="show-tests-chunks-embeddings"
                className="cursor-pointer"
                checked={showEmbeddings}
                onCheckedChange={() => setShowEmbeddings((showEmbeddings) => !showEmbeddings)}
              />
              <Label htmlFor="show-tests-chunks-embeddings">Show embeddings</Label>
            </div>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        {resultsCount > 0 && (
          <DocumentationIngestJobTestingResultsItems
            tests={tests}
            showMetadata={showMetadata}
            showEmbeddings={showEmbeddings}
          />
        )}
        {resultsCount === 0 && <DocumentationIngestJobTestingResultsEmpty />}
      </CardContent>
    </>
  );
}
