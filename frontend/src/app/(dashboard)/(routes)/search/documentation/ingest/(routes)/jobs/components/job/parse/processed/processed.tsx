'use client';

import { useState } from 'react';

import { CardContent } from '@/components/ui/card';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../../schemas/ingest-job.schema';

import DocumentationIngestJobParseProcessedDocument from './document';
import DocumentationIngestJobParseProcessedWebpage from './web-page';

// import DocumentationIngestJobParseJobsItems from './items';
import DocumentationIngestJobParseJobsItem from './item';

export default function DocumentationIngestJobParseProcessed({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  const [viewContentOpen, setViewContentOpen] = useState(false);
  const [viewContentSplit, setViewContentSplit] = useState(false);

  // if (
  //   ingestJobStatus === 'new' ||
  //   (ingestJobStatus === 'pending' && ingestJobData && ingestJobData.parse_job.status !== 'completed')
  // )
  //   return;

  if (ingestJobStatus === 'new' || !ingestJobData) return;

  return (
    <>
      <CardContent>
        {/* <DocumentationIngestJobParseProcessedDocument
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
          ingestJobData={ingestJobData}
        />
        <DocumentationIngestJobParseProcessedWebpage
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
          ingestJobData={ingestJobData}
        /> */}
        {/* <DocumentationIngestJobParseJobsItems
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
          ingestJobData={ingestJobData}
        /> */}
        <div className="flex flex-col gap-5">
          {ingestJobData.parse_jobs.map((parse_job) => (
            <DocumentationIngestJobParseJobsItem
              key={parse_job.id}
              parse_job={parse_job}
              ingestJobData={ingestJobData}
              viewContentOpen={viewContentOpen}
              setViewContentOpen={setViewContentOpen}
              viewContentSplit={viewContentSplit}
              setViewContentSplit={setViewContentSplit}
            />
          ))}
        </div>
      </CardContent>
    </>
  );
}
