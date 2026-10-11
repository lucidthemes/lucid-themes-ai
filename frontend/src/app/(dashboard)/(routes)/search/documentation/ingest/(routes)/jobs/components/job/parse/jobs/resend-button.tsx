import { Send } from 'lucide-react';

import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import type { DocumentationIngestJob } from '../../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobParseJobsResendButton({
  ingestJobData,
}: {
  ingestJobData: DocumentationIngestJob;
}) {
  const lastParseJob = ingestJobData.parse_jobs.at(-1);

  if (!lastParseJob || lastParseJob.status !== 'failed') return;

  console.log(lastParseJob);

  return (
    <CardFooter className="justify-end">
      <Button className="cursor-pointer">
        {/* {isPending && <Spinner />} */}
        Resend to LlamaParse
        <Send />
      </Button>
    </CardFooter>
  );
}
