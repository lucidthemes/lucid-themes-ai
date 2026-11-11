import ListControls from '@/components/list/controls';

import getDocumentationIngestChunks from '../../data/get-ingest-chunks';
import DocumentationIngestChunksListTable from './table';

interface DocumentationIngestChunksListProps {
  page?: number;
  limit?: number;
  search_query?: string;
  sort_by?: string;
  includeCount?: boolean;
  showControls?: boolean;
}

export default async function DocumentationIngestChunksList({
  page,
  limit,
  search_query,
  sort_by,
  includeCount = false,
  showControls = false,
}: DocumentationIngestChunksListProps) {
  const { chunks, totalCount } = await getDocumentationIngestChunks(page, limit, search_query, sort_by, includeCount);

  return (
    <>
      <DocumentationIngestChunksListTable ingestChunks={chunks} />
      {showControls && page && limit && <ListControls page={page} limit={limit} totalCount={totalCount} />}
    </>
  );
}
