'use client';

import { Button } from '@/components/ui/button';
import { CircleX } from 'lucide-react';

import useListSearchClear from './use-clear';

export default function ListSearchClear() {
  const handleSearchRemove = useListSearchClear();

  return (
    <Button variant="outline" size="icon" className="cursor-pointer" onClick={() => handleSearchRemove()}>
      <CircleX />
    </Button>
  );
}
