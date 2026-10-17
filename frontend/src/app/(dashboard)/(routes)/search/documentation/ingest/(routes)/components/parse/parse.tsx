import { Card } from '@/components/ui/card';

import type { DocumentationIngestJobStatus } from '../../../types/ingest-job';

import DocumentationIngestJobParseHeader from './header';
import DocumentationIngestJobParseUpload from './upload';
import DocumentationIngestJobParseProcessed from './processed';

export default function DocumentationIngestJobParse({ jobStatus }: { jobStatus: DocumentationIngestJobStatus }) {
  return (
    <Card className="mx-auto w-full">
      <DocumentationIngestJobParseHeader jobStatus={jobStatus} />

      {jobStatus !== 'completed' && <DocumentationIngestJobParseUpload />}

      <DocumentationIngestJobParseProcessed jobStatus={jobStatus} />
    </Card>
  );
}
