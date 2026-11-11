import { Suspense } from 'react';
import { Metadata } from 'next';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';

import DocumentationIngestChunksListHeader from './components/list/header';
import DocumentationIngestChunksList from './components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest chunks',
  description: 'View documentation ingest chunks',
};

export default async function DashboardSearchDocumentationIngestChunksPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
    search_query?: string;
    sort_by?: string;
  }>;
}) {
  const { page = 1, limit = 10, search_query = '', sort_by = '' } = await searchParams;

  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Ingest chunks" />
      <div className="flex flex-col gap-5">
        <DocumentationIngestChunksListHeader search_query={search_query} />
        <Suspense key="documentation-ingest-chunks" fallback={<LoadingSpinner />}>
          <DocumentationIngestChunksList
            page={page}
            limit={limit}
            search_query={search_query}
            sort_by={sort_by}
            includeCount={true}
            showControls={true}
          />
        </Suspense>
      </div>
    </DashboardLayoutContainer>
  );
}
