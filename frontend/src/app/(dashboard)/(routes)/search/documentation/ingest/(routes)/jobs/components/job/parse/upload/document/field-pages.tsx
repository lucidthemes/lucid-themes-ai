'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';

import type { DocumentationIngestJobParseUploadDocumentForm } from '../../../../../(routes)/new/schemas/parse-upload-form.schema';

export default function DocumentationIngestJobParseUploadDocumentFormFieldPages({
  form,
}: {
  form: UseFormReturn<DocumentationIngestJobParseUploadDocumentForm>;
}) {
  const [pagesOption, setPagesOption] = useState('all');

  const pagesOptions = [
    { label: 'All', value: 'all' },
    { label: 'Range', value: 'range' },
  ];

  return (
    <div className="flex items-end gap-5">
      <Controller
        name="pages"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="pages">Pages</FieldLabel>
            <Select items={pagesOptions} name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pages</SelectLabel>
                  {pagesOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer"
                      onClick={() => setPagesOption(option.value)}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {pagesOption === 'range' && (
        <div className="flex basis-1/2 items-baseline gap-2.5">
          <Controller
            name="range_from"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
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
          <span>to</span>
          <Controller
            name="range_to"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
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
        </div>
      )}
    </div>
  );
}
