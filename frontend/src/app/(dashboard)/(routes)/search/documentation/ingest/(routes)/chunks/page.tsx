import { Suspense } from 'react';
import { Metadata } from 'next';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';

import DocumentationIngestChunksList from './components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest chunks',
  description: 'View documentation ingest chunks',
};

export default function DashboardSearchDocumentationIngestChunksPage() {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Ingest chunks" />
      <Suspense key="documentation-ingest-chunks" fallback={<LoadingSpinner />}>
        <DocumentationIngestChunksList />
      </Suspense>
    </DashboardLayoutContainer>
  );
}
