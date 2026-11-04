import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import DocumentationIngestJobsList from './(routes)/jobs/components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest',
  description: 'Overview of documentation ingest jobs, sources, parse jobs, embedding jobs, and chunks',
};

export default function DashboardSearchDocumentationIngestPage() {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Documentation ingest" />
      <div className="grid grid-cols-2 gap-10">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Jobs</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Link href="ingest/jobs">
                <Button variant="link" className="cursor-pointer">
                  View more
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Suspense key="documentation-ingest-jobs" fallback={<LoadingSpinner />}>
              <DocumentationIngestJobsList />
            </Suspense>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sources</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Link href="ingest/sources">
                <Button variant="link" className="cursor-pointer">
                  View more
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>sources list...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Parse jobs</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Link href="ingest/parse-jobs">
                <Button variant="link" className="cursor-pointer">
                  View more
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>parse jobs list...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Embedding jobs</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Link href="ingest/embedding-jobs">
                <Button variant="link" className="cursor-pointer">
                  View more
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>embedding jobs list...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Chunks</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Link href="ingest/chunks">
                <Button variant="link" className="cursor-pointer">
                  View more
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>chunks list...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayoutContainer>
  );
}
