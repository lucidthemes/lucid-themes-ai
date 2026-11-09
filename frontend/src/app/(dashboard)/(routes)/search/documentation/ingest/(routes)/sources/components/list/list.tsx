import ListControls from '@/components/list/controls';

import getDocumentationIngestSources from '../../data/get-ingest-sources';
import DocumentationIngestSourcesListTable from './table';

interface DocumentationIngestSourcesListProps {
  page?: number;
  limit?: number;
  search?: string;
  filter_type?: string;
  sort?: string;
  showControls?: boolean;
}

export default async function DocumentationIngestSourcesList({
  page,
  limit,
  search,
  filter_type,
  sort,
  showControls = true,
}: DocumentationIngestSourcesListProps) {
  const ingestSources = await getDocumentationIngestSources(page, limit, search, filter_type, sort);

  //console.log(ingestSources);

  const totalCount = 2;

  return (
    <>
      <DocumentationIngestSourcesListTable ingestSources={ingestSources} />
      {showControls && page && limit && <ListControls page={page} limit={limit} totalCount={totalCount} />}
    </>
  );
}
