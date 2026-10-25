'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Info } from 'lucide-react';
import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

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

export default function DocumentationIngestJobParseUploadFormFieldTierSelect({
  form,
  setDocumentParseTier,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  setDocumentParseTier?: Dispatch<
    SetStateAction<{
      label: string;
      value: string;
      credits: number;
    }>
  >;
}) {
  const tiers = [
    { label: 'Agentic Plus', value: 'agentic_plus', credits: 45 },
    { label: 'Agentic ', value: 'agentic', credits: 10 },
    { label: 'Cost Effective', value: 'cost_effective', credits: 3 },
    { label: 'Fast', value: 'fast', credits: 1 },
  ];

  return (
    <div className="flex w-full items-end gap-5">
      <Controller
        name="tier"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="tier">LlamaParse tier</FieldLabel>
            <Select items={tiers} name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tier</SelectLabel>
                  {tiers.map((tier) => (
                    <SelectItem
                      key={tier.value}
                      value={tier.value}
                      className="cursor-pointer"
                      onClick={() => {
                        if (setDocumentParseTier) setDocumentParseTier(tier);
                      }}
                    >
                      {tier.label}
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
              <span className="font-medium">Agentic Plus:</span> state-of-the-art models for maximum accuracy on the
              hardest documents. 45 credits per page
            </li>
            <li>
              <span className="font-medium">Agentic:</span> advanced parsing agents for complex, visually rich files. 10
              credits per page
            </li>
            <li>
              <span className="font-medium">Cost Effective:</span> balanced performance and cost for everyday workloads.
              3 credits per page
            </li>
            <li>
              <span className="font-medium">Fast:</span> lowest-latency, lowest-cost tier for plain-text documents at
              high volume; returns text and spatial text only (no markdown). 1 credit per page
            </li>
          </ul>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
