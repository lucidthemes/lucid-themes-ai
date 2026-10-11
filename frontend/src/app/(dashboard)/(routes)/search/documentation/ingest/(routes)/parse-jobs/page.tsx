import { Suspense } from 'react';
import { Metadata } from 'next';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';

import DocumentationIngestParseJobsList from './components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest parse jobs',
  description: 'View documentation ingest parse jobs',
};

export default function DashboardSearchDocumentationIngestParseJobsPage() {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Ingest parse jobs" />
      <Suspense key="documentation-ingest-parse-jobs" fallback={<LoadingSpinner />}>
        <DocumentationIngestParseJobsList />
      </Suspense>
    </DashboardLayoutContainer>
  );
}
