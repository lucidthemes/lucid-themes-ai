'use client';

import { Card } from '@/components/ui/card';

// import { useIngestJobNewStore } from '../../../(routes)/new/store/ingest-job-new.store';
import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

import DocumentationIngestJobParseHeader from './header';
import DocumentationIngestJobParseUpload from './upload';
import DocumentationIngestJobParseProcessed from './processed';

export default function DocumentationIngestJobParse({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  // const showIngestJobParseUpload = ingestJobStatus !== 'completed' ? true : false;
  // const showIngestJobParseUploadLoading =
  //   ingestJobStatus === 'pending' && ingestJobData && ingestJobData.parseJobStatus === 'pending' ? true : false;
  // const showIngestJobParseProcessed =
  //   ingestJobStatus === 'pending' ? true : ingestJobStatus === 'completed' ? true : false;

  // const ingestJobOption = useIngestJobNewStore((state) => state.ingestJobOption);

  // console.log(ingestJobOption);

  // if (
  //   ingestJobOption === 'manual' ||
  //   (ingestJobStatus === 'pending' && ingestJobData && ingestJobData.option === 'manual') ||
  //   (ingestJobStatus === 'completed' && ingestJobData && ingestJobData.option === 'manual')
  // )
  //   return;

  return (
    <Card className="mx-auto w-full">
      <DocumentationIngestJobParseHeader ingestJobStatus={ingestJobStatus} />
      <DocumentationIngestJobParseUpload ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
      <DocumentationIngestJobParseProcessed ingestJobStatus={ingestJobStatus} ingestJobData={ingestJobData} />
    </Card>
  );
}
