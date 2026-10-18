import { Metadata } from 'next';

import DashboardLayoutContainer from '../../../../../../components/container';
import DashboardLayoutHeading from '../../../../../../components/heading';

import DashboardSearchDocumentationIngestJobNewLayout from './components/new-job-layout';

export const metadata: Metadata = {
  title: 'Documentation - New ingest job',
  description: 'Create a new documentation ingest jobs',
};

export default function DashboardSearchDocumentationIngestJobNewPage() {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="New ingest job" />
      <DashboardSearchDocumentationIngestJobNewLayout ingestJobStatus="new" />
    </DashboardLayoutContainer>
  );
}
