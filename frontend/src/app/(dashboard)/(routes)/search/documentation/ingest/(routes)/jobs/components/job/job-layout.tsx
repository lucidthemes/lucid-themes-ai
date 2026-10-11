import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../schemas/ingest-job.schema';

import DocumentationIngestJobName from './name';
import DocumentationIngestJobParse from './parse';
import DocumentationIngestJobChunks from './chunks';
import DocumentationIngestJobCosts from './costs';

export default function DocumentationIngestJobLayout({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  return (
    <>
      <DocumentationIngestJobName ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
      <DocumentationIngestJobParse ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
      <DocumentationIngestJobChunks ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
      <DocumentationIngestJobCosts ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
    </>
  );
}
