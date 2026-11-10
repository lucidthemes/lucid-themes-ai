import { Suspense } from 'react';
import { Metadata } from 'next';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';

import DocumentationIngestSourcesListHeader from './components/list/header';
import DocumentationIngestSourcesList from './components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest sources',
  description: 'View documentation ingest sources',
};

export default async function DashboardSearchDocumentationIngestSourcesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
    search_query?: string;
    filter_type?: string;
    sort_by?: string;
  }>;
}) {
  const { page = 1, limit = 10, search_query = '', filter_type = '', sort_by = '' } = await searchParams;

  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Ingest sources" />
      <div className="flex flex-col gap-5">
        <DocumentationIngestSourcesListHeader search_query={search_query} />
        <Suspense key="documentation-ingest-sources" fallback={<LoadingSpinner />}>
          <DocumentationIngestSourcesList
            page={page}
            limit={limit}
            search_query={search_query}
            filter_type={filter_type}
            sort_by={sort_by}
          />
        </Suspense>
      </div>
    </DashboardLayoutContainer>
  );
}
