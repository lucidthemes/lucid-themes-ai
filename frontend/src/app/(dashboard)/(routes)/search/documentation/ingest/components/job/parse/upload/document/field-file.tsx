'use client';

import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { DocumentationIngestJobParseUploadDocumentForm } from '../../../../../(routes)/new/schemas/parse-upload-form.schema';

export default function DocumentationIngestJobParseUploadDocumentFormFieldFile({
  form,
}: {
  form: UseFormReturn<DocumentationIngestJobParseUploadDocumentForm>;
}) {
  return (
    <Controller
      name="file"
      control={form.control}
      render={({ field: { onChange, value, ...fieldProps }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Input
            {...fieldProps}
            aria-invalid={fieldState.invalid}
            id="ingest-job-parse-document-file"
            type="file"
            className="cursor-pointer"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file);
            }}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
