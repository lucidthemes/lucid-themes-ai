import ListControls from '@/components/list/controls';

import getDocumentationIngestJobs from '../../data/get-ingest-jobs';
import DocumentationIngestJobsListTable from './table';

interface DocumentationIngestJobsListProps {
  page?: number;
  limit?: number;
  search_query?: string;
  filter_status?: string;
  sort_by?: string;
  includeCount?: boolean;
  showControls?: boolean;
}

export default async function DocumentationIngestJobsList({
  page,
  limit,
  search_query,
  filter_status,
  sort_by,
  includeCount = false,
  showControls = false,
}: DocumentationIngestJobsListProps) {
  const { jobs, totalCount } = await getDocumentationIngestJobs(
    page,
    limit,
    search_query,
    filter_status,
    sort_by,
    includeCount,
  );

  return (
    <>
      <DocumentationIngestJobsListTable ingestJobs={jobs} />
      {showControls && page && limit && <ListControls page={page} limit={limit} totalCount={totalCount} />}
    </>
  );
}
