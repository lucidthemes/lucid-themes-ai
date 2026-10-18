import { Card } from '@/components/ui/card';

import type { DocumentationIngestJobStatus } from '../../../types/ingest-job';

import DocumentationIngestJobParseHeader from './header';
import DocumentationIngestJobParseUpload from './upload';
import DocumentationIngestJobParseProcessed from './processed';

export default function DocumentationIngestJobParse({
  ingestJobStatus,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
}) {
  return (
    <Card className="mx-auto w-full">
      <DocumentationIngestJobParseHeader ingestJobStatus={ingestJobStatus} />

      {ingestJobStatus !== 'completed' && <DocumentationIngestJobParseUpload />}

      <DocumentationIngestJobParseProcessed ingestJobStatus={ingestJobStatus} />
    </Card>
  );
}
