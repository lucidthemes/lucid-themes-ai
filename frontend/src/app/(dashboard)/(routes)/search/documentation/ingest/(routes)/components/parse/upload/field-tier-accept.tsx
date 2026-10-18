import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Field, FieldSet, FieldGroup, FieldError } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DocumentationIngestJobParseUploadFormFieldTierAccept({ form }: { form: UseFormReturn<any> }) {
  return (
    <Controller
      name="tierAccept"
      control={form.control}
      render={({ field, fieldState }) => (
        <FieldSet data-invalid={fieldState.invalid} className="w-full gap-2.5">
          <FieldGroup>
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="ingest-job-parse-credit-accept"
                name="ingest-job-parse-credit-accept"
                aria-invalid={fieldState.invalid}
                checked={field.value}
                onCheckedChange={(checked) => {
                  const newValue = checked;

                  field.onChange(newValue);
                }}
              />
              <Label htmlFor="ingest-job-parse-credit-accept">Accept LlamaParse credit usage</Label>
            </Field>
          </FieldGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </FieldSet>
      )}
    />
  );
}
