import { CircleX, RotateCcw } from 'lucide-react';

import { CardContent } from '@/components/ui/card';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyContent } from '@/components/ui/empty';
import { Button } from '@/components/ui/button';

export default function DocumentationIngestJobParseUploadFailed() {
  return (
    <CardContent>
      <Empty className="w-full bg-muted">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-sidebar text-destructive">
            <CircleX />
          </EmptyMedia>
          <EmptyTitle>LlamaParse job failed</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" className="cursor-pointer">
            <RotateCcw data-icon="inline-start" />
            Retry
          </Button>
        </EmptyContent>
      </Empty>
    </CardContent>
  );
}
