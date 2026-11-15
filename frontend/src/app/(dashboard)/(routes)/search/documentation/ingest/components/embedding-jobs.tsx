import { Suspense } from 'react';
import Link from 'next/link';

import { LoadingSpinner } from '@/components/loading';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import DocumentationIngestEmbeddingJobsList from '../(routes)/embedding-jobs/components/list';

export default function DashboardSearchDocumentationIngestPageEmbeddingJobs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href="ingest/embedding-jobs">Embedding jobs</Link>
        </CardTitle>
        <CardDescription>Recent embedding jobs</CardDescription>
        <CardAction>
          <Link href="ingest/embedding-jobs">
            <Button variant="link" className="cursor-pointer">
              View more
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense key="documentation-ingest-embedding-jobs" fallback={<LoadingSpinner />}>
          <DocumentationIngestEmbeddingJobsList limit={5} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
