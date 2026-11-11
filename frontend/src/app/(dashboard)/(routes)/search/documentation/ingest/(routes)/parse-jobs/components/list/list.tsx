import ListControls from '@/components/list/controls';

import getDocumentationIngestParseJobs from '../../data/get-ingest-parse-jobs';
import DocumentationIngestParseJobsListTable from './table';

interface DocumentationIngestParseJobsListProps {
  page?: number;
  limit?: number;
  search_query?: string;
  filter_status?: string;
  sort_by?: string;
  includeCount?: boolean;
  showControls?: boolean;
}

export default async function DocumentationIngestParseJobsList({
  page,
  limit,
  search_query,
  filter_status,
  sort_by,
  includeCount = false,
  showControls = false,
}: DocumentationIngestParseJobsListProps) {
  const { parsejobs, totalCount } = await getDocumentationIngestParseJobs(
    page,
    limit,
    search_query,
    filter_status,
    sort_by,
    includeCount,
  );

  return (
    <>
      <DocumentationIngestParseJobsListTable ingestParseJobs={parsejobs} />
      {showControls && page && limit && <ListControls page={page} limit={limit} totalCount={totalCount} />}
    </>
  );
}
