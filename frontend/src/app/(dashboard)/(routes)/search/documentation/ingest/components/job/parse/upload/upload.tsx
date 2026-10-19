'use client';

import { cn } from 'cn';

import { useIngestJobNewStore } from '../../../../(routes)/new/store/ingest-job-new.store';
import type { DocumentationIngestJobStatus } from '../../../../types/ingest-job';

import DocumentationIngestJobParseUploadDocumentForm from './document';
import DocumentationIngestJobParseUploadWebpageForm from './webpage';
import DocumentationIngestJobParseUploadLoading from './loading';
import DocumentationIngestJobParseUploadFailed from './failed';

export default function DocumentationIngestJobParseUpload({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData;
}) {
  const ingestJobParseUploadType = useIngestJobNewStore((state) => state.ingestJobParseUploadType);

  if (
    (ingestJobStatus === 'pending' && ingestJobData && ingestJobData.parseJob.status === 'completed') ||
    ingestJobStatus === 'completed'
  )
    return;

  if (ingestJobStatus === 'pending' && ingestJobData && ingestJobData.parseJob.status === 'pending')
    return <DocumentationIngestJobParseUploadLoading />;

  if (ingestJobStatus === 'pending' && ingestJobData && ingestJobData.parseJob.status === 'failed')
    return <DocumentationIngestJobParseUploadFailed />;

  const showUploadDocumentForm = !ingestJobParseUploadType || ingestJobParseUploadType === 'document';
  const showUploadWebpageForm = !ingestJobParseUploadType || ingestJobParseUploadType === 'webpage';

  const formGridClasses = !ingestJobParseUploadType ? 'grid-cols-2' : '';

  return (
    <div className={cn('grid grid-cols-1 gap-5 px-(--card-spacing)', formGridClasses)}>
      {showUploadDocumentForm && <DocumentationIngestJobParseUploadDocumentForm />}
      {showUploadWebpageForm && <DocumentationIngestJobParseUploadWebpageForm />}
    </div>
  );
}
