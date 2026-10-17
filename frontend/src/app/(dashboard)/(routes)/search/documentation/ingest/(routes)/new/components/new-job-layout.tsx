'use client';

import DashboardSearchDocumentationIngestJobLayout from '../../../components/job/job-layout';
import type { DocumentationIngestJobStatus } from '../../../types/ingest-job';

import DocumentationIngestJobNewOptions from './options';
import DocumentationIngestJobNewBackButton from '../components/back-button';

import { useIngestJobNewStore } from '../store/ingest-job-new.store';

export default function DashboardSearchDocumentationIngestJobNewLayout({
  jobStatus,
}: {
  jobStatus: DocumentationIngestJobStatus;
}) {
  const jobOption = useIngestJobNewStore((state) => state.jobOption);

  console.log(jobOption);

  const showIngestSections = jobStatus === 'new' && jobOption ? true : jobStatus === 'pending' ? true : false;

  return (
    <>
      {jobStatus === 'new' && jobOption === null && <DocumentationIngestJobNewOptions />}

      {jobStatus === 'new' && jobOption && <DocumentationIngestJobNewBackButton />}

      {showIngestSections && <DashboardSearchDocumentationIngestJobLayout jobStatus={jobStatus} />}
    </>
  );
}
