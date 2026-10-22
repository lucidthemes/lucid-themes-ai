import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Field, FieldContent, FieldError } from '@/components/ui/field';
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

import type { DocumentationIngestJobParseChunksForm } from '../../../../(routes)/new/schemas/parse-chunks-form.schema';

export default function DocumentationIngestJobParseProcessedFooterSettings({
  form,
}: {
  form: UseFormReturn<DocumentationIngestJobParseChunksForm>;
}) {
  const splitMethods = [
    { label: 'Markdown', value: 'markdown' },
    { label: 'Text', value: 'text' },
  ];

  return (
    <Controller
      name="method"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} orientation="horizontal">
          <FieldContent>
            <Select items={splitMethods} name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Split method</SelectLabel>
                  {splitMethods.map((splitMethod) => (
                    <SelectItem key={splitMethod.value} value={splitMethod.value} className="cursor-pointer">
                      {splitMethod.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
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
                  <span className="font-medium">Markdown:</span> split by specific header groups. Recommended for most
                  use cases
                </li>
                <li>
                  <span className="font-medium">Text:</span> split by list of characters. Recommended for generic text
                </li>
              </ul>
            </HoverCardContent>
          </HoverCard>
        </Field>
      )}
    />
  );
}
