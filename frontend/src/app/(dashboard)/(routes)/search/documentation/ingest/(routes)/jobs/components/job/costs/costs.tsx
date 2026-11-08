import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

import DocumentationIngestJobCostsParse from './parse';
import DocumentationIngestJobCostsEmbeddings from './embeddings';

export default function DocumentationIngestJobCosts({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  if (ingestJobStatus !== 'completed' || !ingestJobData) return;

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Costs</CardTitle>
        <CardDescription>Parse and embedding costs for this ingest job</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2">
          <DocumentationIngestJobCostsParse ingestJobData={ingestJobData} />
          <DocumentationIngestJobCostsEmbeddings ingestJobData={ingestJobData} />
        </div>
      </CardContent>
    </Card>
  );
}
