import { Metadata } from 'next';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';

import DashboardSearchDocumentationIngestPageUsage from './components/usage';
import DashboardSearchDocumentationIngestPageJobs from './components/jobs';
import DashboardSearchDocumentationIngestPageSources from './components/sources';
import DashboardSearchDocumentationIngestPageParseJobs from './components/parse-jobs';
import DashboardSearchDocumentationIngestPageEmbeddingJobs from './components/embedding-jobs';
import DashboardSearchDocumentationIngestPageChunks from './components/chunks';

export const metadata: Metadata = {
  title: 'Documentation - Ingest',
  description: 'Overview of documentation ingest jobs, sources, parse jobs, embedding jobs, and chunks',
};

export default function DashboardSearchDocumentationIngestPage() {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Documentation - Ingest" />
      <div className="flex flex-col gap-10">
        <DashboardSearchDocumentationIngestPageUsage />
        <div className="flex flex-col gap-10 xl:grid xl:grid-cols-2">
          <DashboardSearchDocumentationIngestPageJobs limit={5} />
          <DashboardSearchDocumentationIngestPageSources limit={5} />
          <DashboardSearchDocumentationIngestPageParseJobs limit={5} />
          <DashboardSearchDocumentationIngestPageEmbeddingJobs limit={5} />
          <DashboardSearchDocumentationIngestPageChunks limit={5} />
        </div>
      </div>
    </DashboardLayoutContainer>
  );
}
