import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { isUUID } from '@/lib/validators';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';

import {
  DocumentationIngestJobPendingHeading,
  DocumentationIngestJobCompletedHeading,
} from '../../components/job/heading';
import DocumentationIngestJobLayout from '../../components/job/job-layout';
import DocumentationIngestJobTesting from '../../components/job/testing/testing';

import getDocumentationIngestJob from './data/get-ingest-job';

export const metadata: Metadata = {
  title: 'Documentation - Ingest job',
  description: 'View a pending or completed documentation ingest jobs',
};

export default async function DashboardSearchDocumentationIngestJobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug || !isUUID(slug)) redirect('new');

  const ingestJobData = await getDocumentationIngestJob(slug);

  console.log(ingestJobData);

  if (!ingestJobData) redirect('ingest');

  return (
    <DashboardLayoutContainer>
      <div className="flex flex-col gap-10">
        {ingestJobData.status === 'pending' && <DocumentationIngestJobPendingHeading />}
        {ingestJobData.status === 'completed' && <DocumentationIngestJobCompletedHeading />}
        <DocumentationIngestJobLayout ingestJobStatus={ingestJobData.status} ingestJobData={ingestJobData} />
        {ingestJobData.status === 'completed' && <DocumentationIngestJobTesting />}
      </div>
    </DashboardLayoutContainer>
  );
}
