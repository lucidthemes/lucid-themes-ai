import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Eye, Plus } from 'lucide-react';

import DashboardLayoutContainer from '@/app/(dashboard)/components/container';
import DashboardLayoutHeading from '@/app/(dashboard)/components/heading';
import { LoadingSpinner } from '@/components/loading';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Item, ItemContent, ItemTitle } from '@/components/ui/item';

import DocumentationIngestJobsList from './(routes)/jobs/components/list';
import DocumentationIngestSourcesList from './(routes)/sources/components/list';
import DocumentationIngestParseJobsList from './(routes)/parse-jobs/components/list';
import DocumentationIngestEmbeddingJobsList from './(routes)/embedding-jobs/components/list';
import DocumentationIngestChunksList from './(routes)/chunks/components/list';

export const metadata: Metadata = {
  title: 'Documentation - Ingest',
  description: 'Overview of documentation ingest jobs, sources, parse jobs, embedding jobs, and chunks',
};

export default function DashboardSearchDocumentationIngestPage() {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Documentation ingest" />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10 xl:grid xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Parse credits</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Item variant="muted">
                <ItemContent>
                  <ItemTitle className="text-3xl">35</ItemTitle>
                </ItemContent>
              </Item>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Parse credits</CardTitle>
              <CardDescription>All time</CardDescription>
            </CardHeader>
            <CardContent>
              <Item variant="muted">
                <ItemContent>
                  <ItemTitle className="text-3xl">150</ItemTitle>
                </ItemContent>
              </Item>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Embedding costs</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Item variant="muted">
                <ItemContent>
                  <ItemTitle className="text-3xl">$5</ItemTitle>
                </ItemContent>
              </Item>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Embedding costs</CardTitle>
              <CardDescription>All time</CardDescription>
            </CardHeader>
            <CardContent>
              <Item variant="muted">
                <ItemContent>
                  <ItemTitle className="text-3xl">$250</ItemTitle>
                </ItemContent>
              </Item>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-10 xl:grid xl:grid-cols-2">
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
                <DocumentationIngestJobsList limit={5} />
              </Suspense>
            </CardContent>
          </Card>
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
        </div>
      </div>
    </DashboardLayoutContainer>
  );
}
