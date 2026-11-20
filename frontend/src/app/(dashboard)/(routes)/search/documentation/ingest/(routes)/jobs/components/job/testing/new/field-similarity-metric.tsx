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

export default function DocumentationIngestJobTestingNewFieldSimilarityMetric({
  form,
}: {
  form: UseFormReturn<DocumentationIngestJobTestForm>;
}) {
  const similarityMetrics = [
    { label: 'Dot product', value: 'dot' },
    { label: 'Cosine distance', value: 'cosine' },
    { label: 'Euclidean distance', value: 'euclidean' },
  ];

  return (
    <div className="flex w-full items-end gap-5">
      <Controller
        name="similarity_metric"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="similarity_metric">Similarity metric</FieldLabel>
            <Select items={similarityMetrics} name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Similarity metric</SelectLabel>
                  {similarityMetrics.map((metric) => (
                    <SelectItem key={metric.value} value={metric.value} className="cursor-pointer">
                      {metric.label}
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
              <span className="font-medium">Cosine distance:</span> calculates the angle between vectors
            </li>
            <li>
              <span className="font-medium">Euclidean distance (L2 norm):</span> calculates the distance between vectors
            </li>
            <li>
              <span className="font-medium">Dot product (inner product):</span> more efficient for normalized embeddings
            </li>
          </ul>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
