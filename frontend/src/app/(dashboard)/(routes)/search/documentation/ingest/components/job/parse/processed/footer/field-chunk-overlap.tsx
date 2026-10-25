import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';

import type { DocumentationIngestJobParseChunksForm } from '../../../../../(routes)/new/schemas/parse-chunks-form.schema';

export default function DocumentationIngestJobParseProcessedFooterFieldChunkOverlap({
  form,
}: {
  form: UseFormReturn<DocumentationIngestJobParseChunksForm>;
}) {
  return (
    <Controller
      name="chunk_overlap"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="chunk_overlap">Chunk overlap</FieldLabel>
          <Input
            {...field}
            aria-invalid={fieldState.invalid}
            name={field.name}
            type="number"
            min={1}
            value={field.value ?? ''}
            onChange={(e) => {
              const value = e.target.valueAsNumber;
              field.onChange(Number.isNaN(value) ? undefined : value);
            }}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
