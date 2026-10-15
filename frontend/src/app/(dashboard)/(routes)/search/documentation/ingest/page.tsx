import { Metadata } from 'next';
import { Suspense } from 'react';

import { LoadingSpinner } from '@/components/loading';

import DashboardLayoutContainer from '../../../../components/container';
import DashboardLayoutHeading from '../../../../components/heading';

import DocumentationIngestJobsList from './components/list';

export const metadata: Metadata = {
  title: 'Search Documentation - Ingest',
  description: 'View frontend and dashboard logs',
};

export default function DashboardSearchDocumentationIngestPage() {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Ingest" buttonUrl="/new" buttonText="New job" />
      <p>search documentation ingest!</p>
      <DashboardLayoutHeading heading="Jobs" level={2} />
      <Suspense key="documentation-ingest" fallback={<LoadingSpinner />}>
        <DocumentationIngestJobsList />
      </Suspense>
    </DashboardLayoutContainer>
  );
}
