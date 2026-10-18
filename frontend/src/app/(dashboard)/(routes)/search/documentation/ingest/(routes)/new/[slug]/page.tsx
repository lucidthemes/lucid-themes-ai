import { Metadata } from 'next';

import DashboardLayoutContainer from '../../../../../../../components/container';
import DashboardLayoutHeading from '../../../../../../../components/heading';

import DashboardSearchDocumentationIngestJobNewLayout from '../components/new-job-layout';

export const metadata: Metadata = {
  title: 'Documentation - Pending ingest job',
  description: 'Continue a pending documentation ingest jobs',
};

export default async function DashboardSearchDocumentationIngestJobNewContinuePage({}) {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Pending ingest job" />
      <DashboardSearchDocumentationIngestJobNewLayout ingestJobStatus="pending" />
    </DashboardLayoutContainer>
  );
}
