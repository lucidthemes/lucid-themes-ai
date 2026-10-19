import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type { DocumentationIngestJobStatus } from '../../../types/ingest-job';

export default function DocumentationIngestJobCosts({
  ingestJobStatus,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
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
