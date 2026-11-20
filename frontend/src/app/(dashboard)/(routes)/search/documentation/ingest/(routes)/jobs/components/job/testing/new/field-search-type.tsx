import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import { Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import type { DocumentationIngestJobTestForm } from '../../../../schemas/ingest-job-test.schema';

export default function DocumentationIngestJobTestingNewFieldSearchType({
  form,
}: {
  form: UseFormReturn<DocumentationIngestJobTestForm>;
}) {
  const searchTypes = [
    { label: 'Semantic', value: 'semantic' },
    { label: 'Keyword', value: 'keyword' },
    { label: 'Hybrid', value: 'hybrid' },
  ];

  return (
    <div className="flex w-full items-end gap-5">
      <Controller
        name="search_type"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="search_type">Search type</FieldLabel>
            <Select items={searchTypes} name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Search type</SelectLabel>
                  {searchTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="cursor-pointer">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <HoverCard>
        <HoverCardTrigger
          delay={10}
          closeDelay={100}
          render={
            <Button variant="outline" size="icon">
              <Info />
            </Button>
          }
        />
        <HoverCardContent className="flex w-64 flex-col gap-0.5">
          <ul className="flex flex-col gap-2">
            <li>
              <span className="font-medium">Semantic:</span> search by meaning rather than exact keywords
            </li>
            <li>
              <span className="font-medium">Keyword:</span> search by words or phrases
            </li>
            <li>
              <span className="font-medium">Hybrid:</span> combine semantic search with keyword search
            </li>
          </ul>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
