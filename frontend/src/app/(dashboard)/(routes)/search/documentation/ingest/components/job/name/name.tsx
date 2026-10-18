import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import type { DocumentationIngestJobStatus } from '../../../types/ingest-job';

export default function DocumentationIngestJobName({
  ingestJobStatus,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
}) {
  const nameInputDisabled = ingestJobStatus === 'new' ? false : true;

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Name</CardTitle>
        <CardDescription>Give the ingest job a name to describe it</CardDescription>
      </CardHeader>
      <CardContent>
        <Input id="ingest-job-name" type="text" disabled={nameInputDisabled} />
      </CardContent>
    </Card>
  );
}
