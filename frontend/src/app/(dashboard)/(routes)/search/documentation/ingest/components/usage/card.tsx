import { Suspense } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import DashboardSearchDocumentationIngestPageUsageLoading from './loading';

export default async function DashboardSearchDocumentationIngestPageUsageCard({
  title,
  description,
  content,
  contentKey,
}: {
  title: string;
  description: string;
  content: React.ReactNode;
  contentKey: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense key={contentKey} fallback={<DashboardSearchDocumentationIngestPageUsageLoading />}>
          {content}
        </Suspense>
      </CardContent>
    </Card>
  );
}
