import { Suspense } from 'react';
import { Metadata } from 'next';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';

import DocumentationIngestSourcesList from './components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest sources',
  description: 'View documentation ingest sources',
};

export default function DashboardSearchDocumentationIngestSourcesPage() {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Ingest sources" />
      <Suspense key="documentation-ingest-sources" fallback={<LoadingSpinner />}>
        <DocumentationIngestSourcesList />
      </Suspense>
    </DashboardLayoutContainer>
  );
}
