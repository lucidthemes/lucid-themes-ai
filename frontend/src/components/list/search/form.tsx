'use client';

import { Controller } from 'react-hook-form';
import { Search } from 'lucide-react';

import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';

import useListSearchForm from '@/components/list/search/use-form';

export default function ListSearchForm({ placeholder, search }: { placeholder: string; search?: string }) {
  const { form, onSubmit } = useListSearchForm(search);

  return (
    <form id="list-search-form" className="w-full lg:w-80" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="search"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="search"
                  aria-invalid={fieldState.invalid}
                  placeholder={placeholder}
                  autoComplete="on"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton type="submit" variant="ghost" size="icon-sm" className="cursor-pointer">
                    <Search />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
