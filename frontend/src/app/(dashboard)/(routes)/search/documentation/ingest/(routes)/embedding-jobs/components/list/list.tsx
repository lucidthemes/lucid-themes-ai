import getDocumentationIngestEmbeddingJobs from '../../data/get-ingest-embedding-jobs';
import DocumentationIngestEmbeddingJobsListTable from './table';

export default async function DocumentationIngestEmbeddingJobsList() {
  const ingestEmbeddingJobs = await getDocumentationIngestEmbeddingJobs();

  //console.log(ingestEmbeddingJobs);

  return <DocumentationIngestEmbeddingJobsListTable ingestEmbeddingJobs={ingestEmbeddingJobs} />;
}
