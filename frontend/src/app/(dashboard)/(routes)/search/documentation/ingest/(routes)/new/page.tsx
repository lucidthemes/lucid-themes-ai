import { Metadata } from 'next';

import DashboardLayoutContainer from '../../../../../../components/container';

import { DocumentationIngestJobNewHeading } from '../../components/job/heading';
import DocumentationIngestJobLayout from '../../components/job/job-layout';

export const metadata: Metadata = {
  title: 'Documentation - New ingest job',
  description: 'Create a new documentation ingest jobs',
};

export default function DashboardSearchDocumentationIngestJobNewPage() {
  return (
    <DashboardLayoutContainer className="py-6">
      <div className="flex flex-col gap-10">
        <DocumentationIngestJobNewHeading />
        <DocumentationIngestJobLayout ingestJobStatus="new" />
      </div>
    </DashboardLayoutContainer>
  );
}
