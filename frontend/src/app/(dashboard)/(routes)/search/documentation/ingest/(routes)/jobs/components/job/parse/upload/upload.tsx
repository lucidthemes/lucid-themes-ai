'use client';

import { cn } from 'cn';

import { useIngestJobNewStore } from '../../../../(routes)/new/store/ingest-job-new.store';
import type { DocumentationIngestJobStatus } from '../../../../schemas/ingest-job.schema';

import DocumentationIngestJobParseUploadDocumentForm from './document';
import DocumentationIngestJobParseUploadWebpageForm from './webpage';

export default function DocumentationIngestJobParseUpload({
  ingestJobStatus,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
}) {
  const ingestJobParseUploadType = useIngestJobNewStore((state) => state.ingestJobParseUploadType);

  if (ingestJobStatus !== 'new') return;

  const showUploadDocumentForm = !ingestJobParseUploadType || ingestJobParseUploadType === 'document';
  const showUploadWebpageForm = !ingestJobParseUploadType || ingestJobParseUploadType === 'webpage';

  const formGridClasses = !ingestJobParseUploadType ? 'md:grid-cols-2' : '';

  return (
    <div className={cn('grid grid-cols-1 gap-5 px-(--card-spacing)', formGridClasses)}>
      {showUploadDocumentForm && <DocumentationIngestJobParseUploadDocumentForm />}
      {showUploadWebpageForm && <DocumentationIngestJobParseUploadWebpageForm />}
    </div>
  );
}
