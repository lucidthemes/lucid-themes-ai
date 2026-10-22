'use client';

import { useState } from 'react';
import { SquareText, Settings } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../../schemas/ingest-job.schema';
import useDocumentationIngestJobParseChunksForm from '../../../../(routes)/new/hooks/use-parse-chunks-form';

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

  // if (
  //   ingestJobStatus !== 'pending' ||
  //   (ingestJobStatus === 'pending' && ingestJobData && ingestJobData.parse_job.status !== 'completed')
  // )
  //   return;

  return (
    <CardFooter>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col items-end gap-5">
        {settingsOpen && <DocumentationIngestJobParseProcessedFooterSettings form={form} />}
        {/* <input {...register("content", { value: "data" })} type="hidden" /> */}
        {/* <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              name={field.name}
              type="text"
              value={
                ingestJobData?.parse_job.markdown_full
                  ? ingestJobData?.parse_job.markdown_full
                  : ingestJobData?.parse_job.text_full
              }
            />
          )}
        /> */}
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
