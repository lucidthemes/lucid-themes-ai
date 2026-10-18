'use client';

import DashboardSearchDocumentationIngestJobLayout from '../../../components/job/job-layout';
import type { DocumentationIngestJobStatus } from '../../../types/ingest-job';

import DocumentationIngestJobNewOptions from './options';
import DocumentationIngestJobNewBackButton from '../components/back-button';

import { useIngestJobNewStore } from '../store/ingest-job-new.store';

export default function DashboardSearchDocumentationIngestJobNewLayout({
  ingestJobStatus,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
}) {
  const ingestJobOption = useIngestJobNewStore((state) => state.ingestJobOption);

  console.log(ingestJobOption);

  const showIngestSections =
    ingestJobStatus === 'new' && ingestJobOption ? true : ingestJobStatus === 'pending' ? true : false;

  return (
    <>
      {ingestJobStatus === 'new' && ingestJobOption === null && <DocumentationIngestJobNewOptions />}

      {ingestJobStatus === 'new' && ingestJobOption && <DocumentationIngestJobNewBackButton />}

      {showIngestSections && <DashboardSearchDocumentationIngestJobLayout ingestJobStatus={ingestJobStatus} />}
    </>
  );
}
