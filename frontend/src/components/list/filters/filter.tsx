'use client';

import { useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import useListFilter from './use-filter';
import ListFilterClearSingle from './clear-single';

interface ListFilterProps {
  type: string;
  label: string;
  options: {
    id: number;
    section: string;
    items: {
      id: number | string;
      value: string;
      label: string;
    }[];
  }[];
}

export default function ListFilter({ type, label, options }: ListFilterProps) {
  const onFilterValueChange = useListFilter(type);

  const searchParams = useSearchParams();

  if (!options) return;

  const activeFilter = searchParams.get('filter_' + type) || '';

  return (
    <div className="flex items-center gap-2">
      <Select
        items={options}
        value={activeFilter}
        onValueChange={(value) => {
          if (value) onFilterValueChange(value);
        }}
      >
        <SelectTrigger className="w-full cursor-pointer lg:max-w-48">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => (
            <SelectGroup key={item.id}>
              {options.length > 1 && item.id > 1 && <SelectSeparator />}
              <SelectLabel>{item.section}</SelectLabel>
              {item.items.map((item) => (
                <SelectItem key={item.id} value={item.value} className="cursor-pointer">
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      {activeFilter && <ListFilterClearSingle type={type} />}
    </div>
  );
}
