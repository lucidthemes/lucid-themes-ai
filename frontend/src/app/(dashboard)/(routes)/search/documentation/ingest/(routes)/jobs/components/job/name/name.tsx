'use client';

import { useShallow } from 'zustand/shallow';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError } from '@/components/ui/field';
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
  const { ingestJobName, ingestJobNameError, updateIngestJobName } = useIngestJobNewStore(
    useShallow((state) => ({
      ingestJobName: state.ingestJobName,
      ingestJobNameError: state.ingestJobNameError,
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
        <Field aria-invalid={ingestJobNameError ? true : false}>
          <Input
            id="name"
            name="name"
            aria-invalid={ingestJobNameError ? true : false}
            type="text"
            disabled={nameInputDisabled}
            defaultValue={ingestJobData && ingestJobData.name ? ingestJobData.name : ''}
            onBlur={(e) => {
              const value = e.target.value;

              if (value !== ingestJobName) updateIngestJobName(e.target.value);
            }}
          />
          {ingestJobNameError && <FieldError errors={[ingestJobNameError]} />}
        </Field>
      </CardContent>
    </Card>
  );
}
