'use client';

import { useState } from 'react';
import { SquareText, Settings } from 'lucide-react';

import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../../schemas/ingest-job.schema';
import useDocumentationIngestJobParseChunksForm from '../../../../(routes)/new/hooks/use-parse-chunks-form';
import { useIngestJobNewStore } from '../../../../(routes)/new/store/ingest-job-new.store';

import DocumentationIngestJobParseProcessedFooterSettings from './footer-settings';

export default function DocumentationIngestJobParseProcessedFooter({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { form, onSubmit, isPending } = useDocumentationIngestJobParseChunksForm({ ingestJobData });

  const ingestJobParseChunks = useIngestJobNewStore((state) => state.ingestJobParseChunks);

  if (
    (ingestJobStatus === 'pending' && ingestJobParseChunks && ingestJobParseChunks.length > 0) ||
    ingestJobStatus === 'completed'
  )
    return;

  return (
    <CardFooter>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col items-end gap-5">
        {settingsOpen && <DocumentationIngestJobParseProcessedFooterSettings form={form} />}
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
            {isPending && <Spinner />}
            Create chunks
            <SquareText />
          </Button>
        </div>
      </form>
    </CardFooter>
  );
}
