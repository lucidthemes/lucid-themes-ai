'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ListSortProps {
  options?: {
    id: number;
    value: string;
    label: string;
  }[];
}

export default function ListSort({
  options = [
    { id: 1, value: 'date_desc', label: 'Date (newest)' },
    { id: 2, value: 'date_asc', label: 'Date (oldest)' },
  ],
}: ListSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!options) return;

  const activeSort = searchParams.get('sort') || '';

  const onSortValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      items={options}
      value={activeSort}
      onValueChange={(value) => {
        if (value) onSortValueChange(value);
      }}
    >
      <SelectTrigger className="w-full cursor-pointer lg:max-w-fit">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.value} className="cursor-pointer">
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
