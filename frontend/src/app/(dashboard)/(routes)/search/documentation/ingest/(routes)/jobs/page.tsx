import { Suspense } from 'react';
import { Metadata } from 'next';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';

import DocumentationIngestJobsListHeader from './components/list/header';
import DocumentationIngestJobsList from './components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest jobs',
  description: 'Create and view documentation ingest jobs',
};

export default async function DashboardSearchDocumentationIngestJobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
    search_query?: string;
    filter_status?: string;
    sort_by?: string;
  }>;
}) {
  const { page = 1, limit = 10, search_query = '', filter_status = '', sort_by = '' } = await searchParams;

  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Ingest jobs" buttonUrl="jobs/new" buttonText="New job" />
      <div className="flex flex-col gap-5">
        <DocumentationIngestJobsListHeader search_query={search_query} />
        <Suspense key="documentation-ingest-jobs" fallback={<LoadingSpinner />}>
          <DocumentationIngestJobsList
            page={page}
            limit={limit}
            search_query={search_query}
            filter_status={filter_status}
            sort_by={sort_by}
            includeCount={true}
            showControls={true}
          />
        </Suspense>
      </div>
    </DashboardLayoutContainer>
  );
}
