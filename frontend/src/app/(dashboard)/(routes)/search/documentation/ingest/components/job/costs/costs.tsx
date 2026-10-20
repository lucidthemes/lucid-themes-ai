import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobCosts({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  if (ingestJobStatus !== 'completed') return;

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Costs</CardTitle>
        <CardDescription>A practical talk on component APIs, accessibility, and shipping faster.</CardDescription>
      </CardHeader>
    </Card>
  );
}
