'use client';

import { Card } from '@/components/ui/card';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

import DocumentationIngestJobParseHeader from './header';
import DocumentationIngestJobParseUpload from './upload';
import DocumentationIngestJobParseJobs from './jobs';

export default function DocumentationIngestJobParse({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  return (
    <Card className="mx-auto w-full">
      <DocumentationIngestJobParseHeader ingestJobStatus={ingestJobStatus} />
      <DocumentationIngestJobParseUpload ingestJobStatus={ingestJobStatus} />
      <DocumentationIngestJobParseJobs ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
    </Card>
  );
}
