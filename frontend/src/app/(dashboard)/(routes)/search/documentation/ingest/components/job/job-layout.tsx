import type { DocumentationIngestJobStatus } from '../../types/ingest-job';

import DocumentationIngestJobName from './name';
import DocumentationIngestJobParse from './parse';
import DocumentationIngestJobChunks from './chunks';
import DocumentationIngestJobCosts from './costs';

export default function DashboardSearchDocumentationIngestJobLayout({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData;
}) {
  return (
    <>
      <DocumentationIngestJobName ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
      <DocumentationIngestJobParse ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
      <DocumentationIngestJobChunks ingestJobStatus={ingestJobStatus} />
      <DocumentationIngestJobCosts ingestJobStatus={ingestJobStatus} />
    </>
  );
}
