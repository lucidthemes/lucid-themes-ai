import { Suspense } from 'react';
import Link from 'next/link';

import { LoadingSpinner } from '@/components/loading';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import DocumentationIngestChunksList from '../(routes)/chunks/components/list';

export default function DashboardSearchDocumentationIngestPageChunks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href="ingest/chunks">Chunks</Link>
        </CardTitle>
        <CardDescription>Recently created chunks</CardDescription>
        <CardAction>
          <Link href="ingest/chunks">
            <Button variant="link" className="cursor-pointer">
              View more
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense key="documentation-ingest-chunks" fallback={<LoadingSpinner />}>
          <DocumentationIngestChunksList limit={5} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
