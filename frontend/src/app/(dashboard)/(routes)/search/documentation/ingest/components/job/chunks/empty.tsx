import { SquareText } from 'lucide-react';

import { CardContent } from '@/components/ui/card';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';

export default function DocumentationIngestJobChunksEmpty() {
  return (
    <CardContent>
      <Empty className="w-full bg-muted">
        <EmptyHeader className="max-w-full">
          <EmptyMedia variant="icon" className="bg-sidebar">
            <SquareText />
          </EmptyMedia>
          <EmptyTitle>Empty chunks</EmptyTitle>
          <EmptyDescription>No chunks have been created</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </CardContent>
  );
}
