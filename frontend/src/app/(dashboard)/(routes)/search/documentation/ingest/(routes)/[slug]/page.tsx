import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { isUUID } from '@/lib/validators';

import DashboardLayoutContainer from '../../../../../../components/container';
import DashboardLayoutHeading from '../../../../../../components/heading';

import DashboardSearchDocumentationIngestJobLayout from '../../components/job/job-layout';

export const metadata: Metadata = {
  title: 'Documentation - Completed ingest job',
  description: 'View a completed documentation ingest jobs',
};

export default async function DashboardSearchDocumentationIngestJobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug || !isUUID(slug)) redirect('new');

  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Completed ingest job" />
      <p>view ingest job! slug: {slug}</p>
      <DashboardSearchDocumentationIngestJobLayout ingestJobStatus="completed" />
    </DashboardLayoutContainer>
  );
}
