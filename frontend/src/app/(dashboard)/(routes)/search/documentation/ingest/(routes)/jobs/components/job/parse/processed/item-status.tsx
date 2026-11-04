import { Check, CircleAlert } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';

import type { DocumentationIngestJobParseJob } from '../../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobParseJobsItemStatus({
  parse_job,
}: {
  parse_job: DocumentationIngestJobParseJob;
}) {
  if (parse_job.status === 'pending') return <Spinner className="size-5" />;

  if (parse_job.status === 'completed') return <Check className="size-5 text-green-500" />;

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
          <span>{parse_job.error_message ?? 'Unknown error'}</span>
        </HoverCardContent>
      </HoverCard>
    );
  }
}
