import { Suspense } from 'react';
import Link from 'next/link';

import { LoadingSpinner } from '@/components/loading';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import DocumentationIngestSourcesList from '../(routes)/sources/components/list';

export default function DashboardSearchDocumentationIngestPageSources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href="ingest/sources">Sources</Link>
        </CardTitle>
        <CardDescription>Recently created sources</CardDescription>
        <CardAction>
          <Link href="ingest/sources">
            <Button variant="link" className="cursor-pointer">
              View more
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense key="documentation-ingest-sources" fallback={<LoadingSpinner />}>
          <DocumentationIngestSourcesList limit={5} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
