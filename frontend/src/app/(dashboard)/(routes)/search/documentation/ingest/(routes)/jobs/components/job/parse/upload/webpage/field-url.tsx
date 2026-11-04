'use client';

import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { DocumentationIngestJobParseUploadWebpageForm } from '../../../../../(routes)/new/schemas/parse-upload-form.schema';

export default function DocumentationIngestJobParseUploadWebpageFormFieldUrl({
  form,
}: {
  form: UseFormReturn<DocumentationIngestJobParseUploadWebpageForm>;
}) {
  return (
    <Controller
      name="url"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="url">URL</FieldLabel>
          <Input
            {...field}
            aria-invalid={fieldState.invalid}
            name={field.name}
            type="url"
            className="cursor-text"
            placeholder="https://www.example.com"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
