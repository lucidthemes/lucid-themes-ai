import type { DocumentationIngestJobStatus } from '../../types/ingest-job';

import DocumentationIngestJobParse from '../../(routes)/components/parse';
import DocumentationIngestJobChunks from './chunks';
import DocumentationIngestJobCosts from './costs';

export default function DashboardSearchDocumentationIngestJobLayout({
  jobStatus,
}: {
  jobStatus: DocumentationIngestJobStatus;
}) {
  return (
    <>
      <DocumentationIngestJobParse jobStatus={jobStatus} />
      <DocumentationIngestJobChunks jobStatus={jobStatus} />
      <DocumentationIngestJobCosts />
    </>
  );
}
