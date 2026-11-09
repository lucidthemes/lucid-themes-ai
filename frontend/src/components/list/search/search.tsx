'use client';

import ListSearchForm from './form';
import ListSearchClear from './clear';

export default function ListSearch({ placeholder, search }: { placeholder: string; search?: string }) {
  return (
    <div className="flex w-full gap-4">
      <ListSearchForm placeholder={placeholder} search={search} />
      {search && <ListSearchClear />}
    </div>
  );
}
