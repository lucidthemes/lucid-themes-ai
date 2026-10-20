'use client';

import { useShallow } from 'zustand/shallow';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useIngestJobNewStore } from '../../../(routes)/new/store/ingest-job-new.store';
import type { DocumentationIngestJobStatus, DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobName({
  ingestJobStatus,
  ingestJobData,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
  ingestJobData?: DocumentationIngestJob;
}) {
  const { ingestJobname, updateIngestJobName } = useIngestJobNewStore(
    useShallow((state) => ({
      ingestJobname: state.ingestJobname,
      updateIngestJobName: state.updateIngestJobName,
    })),
  );

  const nameInputDisabled = ingestJobStatus === 'new' ? false : true;

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Name</CardTitle>
        <CardDescription>Give the ingest job a name to describe it</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          id="ingest-job-name"
          type="text"
          disabled={nameInputDisabled}
          // value={ingestJobname ?? ''}
          defaultValue={ingestJobData && ingestJobData.name ? ingestJobData.name : ''}
          onBlur={(e) => {
            const value = e.target.value;

            if (value !== ingestJobname) updateIngestJobName(e.target.value);
          }}
        />
      </CardContent>
    </Card>
  );
}
