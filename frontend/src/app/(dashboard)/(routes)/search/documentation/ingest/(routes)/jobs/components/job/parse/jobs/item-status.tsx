import { CircleAlert } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';

import type { DocumentationIngestJobParseJob } from '../../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobParseJobsItemStatus({
  parse_job,
}: {
  parse_job: DocumentationIngestJobParseJob;
}) {
  if (parse_job.status === 'pending') {
    return (
      <HoverCard>
        <HoverCardTrigger
          delay={10}
          closeDelay={100}
          render={
            <Button variant="outline" size="icon">
              <Spinner />
            </Button>
          }
        />
        <HoverCardContent className="flex w-fit max-w-64 flex-col gap-0.5">
          <span className="font-medium">Processing LlamaParse job</span>
        </HoverCardContent>
      </HoverCard>
    );
  }

  if (parse_job.status === 'failed') {
    return (
      <HoverCard>
        <HoverCardTrigger
          delay={10}
          closeDelay={100}
          render={
            <Button variant="outline" size="icon">
              <CircleAlert className="text-red-500" />
            </Button>
          }
        />
        <HoverCardContent className="flex w-fit max-w-64 flex-col gap-0.5">
          <span className="font-medium">LlamaParse job failed</span>
          Error: {parse_job.error_message ?? 'Unknown error'}
        </HoverCardContent>
      </HoverCard>
    );
  }
}
