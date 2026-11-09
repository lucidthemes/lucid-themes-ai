'use client';

import { CircleX } from 'lucide-react';

import { Button } from '@/components/ui/button';

import useListFilterClearSingle from './use-clear-single';

export default function ListFilterClearSingle({ type }: { type: string }) {
  const handleFilterRemove = useListFilterClearSingle();

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-fit w-fit cursor-pointer hover:bg-white"
      onClick={() => handleFilterRemove(type)}
    >
      <CircleX />
    </Button>
  );
}
