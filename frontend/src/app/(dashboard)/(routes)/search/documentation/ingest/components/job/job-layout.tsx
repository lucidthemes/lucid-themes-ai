import type { DocumentationIngestJobStatus } from '../../types/ingest-job';

import DocumentationIngestJobName from './name';
import DocumentationIngestJobParse from '../../(routes)/components/parse';
import DocumentationIngestJobChunks from './chunks';
import DocumentationIngestJobCosts from './costs';

export default function DashboardSearchDocumentationIngestJobLayout({
  ingestJobStatus,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
}) {
  return (
    <>
      <DocumentationIngestJobName ingestJobStatus={ingestJobStatus} />
      <DocumentationIngestJobParse ingestJobStatus={ingestJobStatus} />
      <DocumentationIngestJobChunks ingestJobStatus={ingestJobStatus} />
      <DocumentationIngestJobCosts />
    </>
  );
}
