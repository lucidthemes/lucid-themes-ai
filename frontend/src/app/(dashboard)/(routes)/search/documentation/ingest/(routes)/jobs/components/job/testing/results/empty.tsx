import { SearchCode } from 'lucide-react';

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';

export default function DocumentationIngestJobTestingResultsEmpty() {
  return (
    <Empty className="w-full bg-muted">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-sidebar">
          <SearchCode />
        </EmptyMedia>
        <EmptyTitle>No tests found</EmptyTitle>
        <EmptyDescription>Enter a phrase below to create a new test</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
