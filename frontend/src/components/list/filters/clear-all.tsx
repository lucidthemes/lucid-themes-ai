'use client';

import { CircleX } from 'lucide-react';

import { Button } from '@/components/ui/button';

import useListFilterClearAll from './use-clear-all';

export default function ListFilterClearAll() {
  const handleFiltersRemove = useListFilterClearAll();

  return (
    <Button
      variant="outline"
      size="icon"
      className="hidden cursor-pointer lg:flex"
      onClick={() => handleFiltersRemove()}
    >
      <CircleX />
    </Button>
  );
}
