'use client';

import { useState } from 'react';

import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../../schemas/ingest-job.schema';
import useDocumentationIngestJobChunksCreateForm from '../../../../(routes)/new/hooks/use-chunks-create-form';

import DocumentationIngestJobChunksCreateFormFieldSplitMethod from './field-split-method';
import DocumentationIngestJobChunksCreateFormFieldChunkSize from './field-chunk-size';
import DocumentationIngestJobChunksCreateFormFieldChunkOverlap from './field-chunk-overlap';
import DocumentationIngestJobChunksCreateFormButtons from './buttons';

export default function DocumentationIngestJobChunksCreateForm({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { form, onSubmit, isPending } = useDocumentationIngestJobChunksCreateForm({ ingestJobData });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col items-end gap-5">
      {settingsOpen && (
        <>
          <DocumentationIngestJobChunksCreateFormFieldSplitMethod form={form} />
          <DocumentationIngestJobChunksCreateFormFieldChunkSize form={form} />
          <DocumentationIngestJobChunksCreateFormFieldChunkOverlap form={form} />
        </>
      )}
      <DocumentationIngestJobChunksCreateFormButtons
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        isPending={isPending}
      />
    </form>
  );
}
