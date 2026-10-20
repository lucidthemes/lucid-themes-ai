'use client';

import { useState } from 'react';
import { SquareText, Settings } from 'lucide-react';

import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../../schemas/ingest-job.schema';

import DocumentationIngestJobParseProcessedFooterSettings from './footer-settings';

export default function DocumentationIngestJobParseProcessedFooter({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  // if (
  //   ingestJobStatus !== 'pending' ||
  //   (ingestJobStatus === 'pending' && ingestJobData && ingestJobData.parse_job.status !== 'completed')
  // )
  //   return;

  return (
    <CardFooter>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submittted!');
        }}
        className="flex w-full flex-col items-end gap-5"
      >
        {settingsOpen && <DocumentationIngestJobParseProcessedFooterSettings />}
        <div className="flex justify-end gap-5">
          <Button
            variant={settingsOpen ? 'secondary' : 'outline'}
            size="icon"
            className="cursor-pointer"
            onClick={() => setSettingsOpen((settingsOpen) => !settingsOpen)}
          >
            <Settings />
          </Button>
          <Button type="submit" className="cursor-pointer">
            <Spinner />
            Create chunks
            <SquareText />
          </Button>
        </div>
      </form>
    </CardFooter>
  );
}
