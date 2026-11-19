'use client';

import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import { ArrowUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

import type { DocumentationIngestJobTestForm } from '../../../../schemas/job-test-form.schema';

export default function DocumentationIngestJobTestingNewFieldPhrase({
  form,
}: {
  form: UseFormReturn<DocumentationIngestJobTestForm>;
}) {
  return (
    <Controller
      name="phrase"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <InputGroup className="min-h-12.5">
            <InputGroupInput
              {...field}
              name="phrase"
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Enter a search phrase or select a preset"
            />
            <InputGroupAddon align="inline-end">
              <Button type="submit" variant="default" size="icon" className="cursor-pointer" title="Submit">
                <ArrowUp />
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
