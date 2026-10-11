import getDocumentationIngestParseJobs from '../../data/get-ingest-parse-jobs';
import DocumentationIngestParseJobsListTable from './table';

export default async function DocumentationIngestParseJobsList() {
  const ingestParseJobs = await getDocumentationIngestParseJobs();

  //console.log(ingestParseJobs);

  return <DocumentationIngestParseJobsListTable ingestParseJobs={ingestParseJobs} />;
}
