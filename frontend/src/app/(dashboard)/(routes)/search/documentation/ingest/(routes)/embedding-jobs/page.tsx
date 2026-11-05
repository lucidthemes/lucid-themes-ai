import { Suspense } from 'react';
import { Metadata } from 'next';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';

import DocumentationIngestEmbeddingJobsList from './components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest embedding jobs',
  description: 'View documentation ingest embedding jobs',
};

export default function DashboardSearchDocumentationIngestEmbeddingJobsPage() {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Ingest embedding jobs" />
      <Suspense key="documentation-ingest-embedding-jobs" fallback={<LoadingSpinner />}>
        <DocumentationIngestEmbeddingJobsList />
      </Suspense>
    </DashboardLayoutContainer>
  );
}
