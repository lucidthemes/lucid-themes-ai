import { Suspense } from 'react';
import Link from 'next/link';

import { LoadingSpinner } from '@/components/loading';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import DocumentationIngestParseJobsList from '../(routes)/parse-jobs/components/list';

export default function DashboardSearchDocumentationIngestPageParseJobs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href="ingest/parse-jobs">Parse jobs</Link>
        </CardTitle>
        <CardDescription>Recent parse jobs</CardDescription>
        <CardAction>
          <Link href="ingest/parse-jobs">
            <Button variant="link" className="cursor-pointer">
              View more
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense key="documentation-ingest-parse-jobs" fallback={<LoadingSpinner />}>
          <DocumentationIngestParseJobsList limit={5} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
