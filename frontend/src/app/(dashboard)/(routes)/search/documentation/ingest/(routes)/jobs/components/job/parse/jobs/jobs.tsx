'use client';

import { useState } from 'react';

import { CardContent } from '@/components/ui/card';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../../schemas/ingest-job.schema';

import DocumentationIngestJobParseJobsItem from './item';
import DocumentationIngestJobParseJobsResendButton from './resend-button';

export default function DocumentationIngestJobParseJobs({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  const [viewContentOpen, setViewContentOpen] = useState(false);
  const [viewContentSplit, setViewContentSplit] = useState(false);

  if (ingestJobStatus === 'new' || !ingestJobData || ingestJobData.parse_jobs.length === 0) return;

  return (
    <>
      <CardContent>
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
      <DocumentationIngestJobParseJobsResendButton ingestJobData={ingestJobData} />
    </>
  );
}
