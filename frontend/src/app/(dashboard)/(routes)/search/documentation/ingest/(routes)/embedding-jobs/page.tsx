import { Suspense } from 'react';
import { Metadata } from 'next';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';
import ListHeader from '@/components/list/header';

import DocumentationIngestEmbeddingJobsList from './components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest embedding jobs',
  description: 'View documentation ingest embedding jobs',
};

export default async function DashboardSearchDocumentationIngestEmbeddingJobsPage({
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
      <DashboardLayoutHeading heading="Ingest embedding jobs" />
      <div className="flex flex-col gap-5">
        <ListHeader searchPlaceholder="Embedding Job Id" search_query={search_query} />
        <Suspense key="documentation-ingest-embedding-jobs" fallback={<LoadingSpinner />}>
          <DocumentationIngestEmbeddingJobsList
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
