import type { UseFormReturn, SubmitHandler } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { DocumentationIngestJobDuplicateForm } from '../../../schemas/duplicate-job-form.schema';

export default function DocumentationIngestJobsListActionsButtonDuplicateForm({
  form,
  onSubmit,
  formId,
}: {
  form: UseFormReturn<DocumentationIngestJobDuplicateForm>;
  onSubmit: SubmitHandler<DocumentationIngestJobDuplicateForm>;
  formId: string;
}) {
  return (
    <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input {...field} aria-invalid={fieldState.invalid} name={field.name} className="cursor-text" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}
