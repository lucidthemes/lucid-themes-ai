import { Suspense } from 'react';
import { Metadata } from 'next';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';

import DocumentationIngestJobsList from './components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest jobs',
  description: 'Create and view documentation ingest jobs',
};

export default function DashboardSearchDocumentationIngestJobsPage() {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Ingest jobs" buttonUrl="jobs/new" buttonText="New job" />
      {/* <DashboardLayoutHeading heading="Jobs" level={2} /> */}
      <Suspense key="documentation-ingest" fallback={<LoadingSpinner />}>
        <DocumentationIngestJobsList />
      </Suspense>
    </DashboardLayoutContainer>
  );
}
