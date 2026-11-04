import getDocumentationIngestJobs from '../../data/get-ingest-jobs';

import DocumentationIngestJobsListTable from './table';

export default async function DocumentationIngestJobsList() {
  const ingestJobs = await getDocumentationIngestJobs();

  console.log(ingestJobs);

  return <DocumentationIngestJobsListTable ingestJobs={ingestJobs} />;
}
