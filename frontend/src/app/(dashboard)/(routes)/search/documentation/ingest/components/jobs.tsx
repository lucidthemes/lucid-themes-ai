import { Suspense } from 'react';
import Link from 'next/link';
import { Eye, Plus } from 'lucide-react';

import { LoadingSpinner } from '@/components/loading';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import DocumentationIngestJobsList from '../(routes)/jobs/components/list';

export default function DashboardSearchDocumentationIngestPageJobs({ limit }: { limit: number }) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>
          <Link href="ingest/jobs">Jobs</Link>
        </CardTitle>
        <CardDescription>Recent ingest jobs</CardDescription>
        <CardAction className="flex gap-5">
          <Link href="ingest/jobs">
            <Button variant="outline" className="cursor-pointer">
              <Eye /> View more
            </Button>
          </Link>
          <Link href="ingest/jobs/new">
            <Button className="cursor-pointer">
              <Plus /> New job
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense key="documentation-ingest-jobs" fallback={<LoadingSpinner />}>
          <DocumentationIngestJobsList limit={limit} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
