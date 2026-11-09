'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import useListControlLimit from './use-limit';

export default function ListControlLimit({
  currentValue = 12,
  limitOptions = [6, 12, 18, 24],
  label = 'Items per page',
  className,
}: {
  currentValue: number;
  limitOptions?: number[];
  label?: string;
  className?: string;
}) {
  const onLimitValueChange = useListControlLimit();

  return (
    <Field orientation="horizontal" className={`w-fit ${className}`}>
      <FieldLabel htmlFor="select-items-per-page">{label}</FieldLabel>
      <Select
        items={limitOptions}
        defaultValue={currentValue?.toString()}
        onValueChange={(value) => {
          if (value) onLimitValueChange(value);
        }}
      >
        <SelectTrigger className="w-20 cursor-pointer" id="select-items-per-page">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {limitOptions.map((option, index) => (
              <SelectItem key={index} value={option.toString()} className="cursor-pointer">
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
