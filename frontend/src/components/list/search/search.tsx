'use client';

import ListSearchForm from './form';
import ListSearchClear from './clear';

export default function ListSearch({ placeholder, search_query }: { placeholder: string; search_query?: string }) {
  return (
    <div className="flex w-full gap-4">
      <ListSearchForm placeholder={placeholder} search_query={search_query} />
      {search_query && <ListSearchClear />}
    </div>
  );
}
