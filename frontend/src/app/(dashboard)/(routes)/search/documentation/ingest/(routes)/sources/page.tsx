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
    search?: string;
    filter_type?: string;
    sort?: string;
  }>;
}) {
  const { page = 1, limit = 12, search = '', filter_type = '', sort = '' } = await searchParams;

  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Ingest sources" />
      <div className="flex flex-col gap-5">
        <DocumentationIngestSourcesListHeader search={search} />
        <Suspense key="documentation-ingest-sources" fallback={<LoadingSpinner />}>
          <DocumentationIngestSourcesList
            page={page}
            limit={limit}
            search={search}
            filter_type={filter_type}
            sort={sort}
          />
        </Suspense>
      </div>
    </DashboardLayoutContainer>
  );
}
