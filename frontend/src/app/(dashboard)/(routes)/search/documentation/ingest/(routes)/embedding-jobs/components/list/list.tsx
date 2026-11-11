import ListControls from '@/components/list/controls';

import getDocumentationIngestEmbeddingJobs from '../../data/get-ingest-embedding-jobs';
import DocumentationIngestEmbeddingJobsListTable from './table';

interface DocumentationIngestEmbeddingJobsListProps {
  page?: number;
  limit?: number;
  search_query?: string;
  sort_by?: string;
  includeCount?: boolean;
  showControls?: boolean;
}

export default async function DocumentationIngestEmbeddingJobsList({
  page,
  limit,
  search_query,
  sort_by,
  includeCount = false,
  showControls = false,
}: DocumentationIngestEmbeddingJobsListProps) {
  const { embeddingjobs, totalCount } = await getDocumentationIngestEmbeddingJobs(
    page,
    limit,
    search_query,
    sort_by,
    includeCount,
  );

  return (
    <>
      <DocumentationIngestEmbeddingJobsListTable ingestEmbeddingJobs={embeddingjobs} />
      {showControls && page && limit && <ListControls page={page} limit={limit} totalCount={totalCount} />}
    </>
  );
}
