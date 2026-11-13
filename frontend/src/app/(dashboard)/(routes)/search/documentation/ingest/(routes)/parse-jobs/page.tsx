import { Suspense } from 'react';
import { Metadata } from 'next';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';
import ListHeader from '@/components/list/header';

import DocumentationIngestParseJobsListFilters from './components/list/filters';
import DocumentationIngestParseJobsList from './components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest parse jobs',
  description: 'View documentation ingest parse jobs',
};

export default async function DashboardSearchDocumentationIngestParseJobsPage({
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
      <DashboardLayoutHeading heading="Ingest parse jobs" />
      <div className="flex flex-col gap-5">
        <ListHeader
          searchPlaceholder="Parse Job Id"
          search_query={search_query}
          filters={<DocumentationIngestParseJobsListFilters />}
        />
        <Suspense key="documentation-ingest-parse-jobs" fallback={<LoadingSpinner />}>
          <DocumentationIngestParseJobsList
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
