'use client';

import { useState } from 'react';
import { cn } from 'cn';
import { SlidersVertical } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

import ListSearch from '../search';
import ListSort from '../sort';

export default function ListHeader({
  showSearch = true,
  searchPlaceholder,
  search_query,
  filters,
  showSort = true,
}: {
  showSearch?: boolean;
  searchPlaceholder?: string;
  search_query?: string;
  filters?: React.ReactNode;
  showSort?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const showFilterSection = filters || showSort;
  const mobileFilterSectionClass = mobileOpen ? 'flex' : '';
  const sortOnlyFilterSectionClass = !filters && showSort ? 'justify-end' : '';

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="flex items-center gap-5 lg:flex-row">
        {showSearch && (
          <>
            <ListSearch placeholder={searchPlaceholder} search_query={search_query} />
            {filters && <Separator orientation="vertical" className="mt-2 h-6!" />}
          </>
        )}
        {showFilterSection && (
          <Button
            variant={mobileOpen ? 'secondary' : 'outline'}
            size="icon"
            title="Filters"
            className="cursor-pointer lg:hidden"
            onClick={() => setMobileOpen((mobileOpen) => !mobileOpen)}
          >
            <SlidersVertical />
          </Button>
        )}
      </div>
      {showFilterSection && (
        <div
          className={cn(
            `hidden grow flex-col justify-between gap-5 lg:flex lg:flex-row`,
            mobileFilterSectionClass,
            sortOnlyFilterSectionClass,
          )}
        >
          {filters}
          {showSort && <ListSort />}
        </div>
      )}
    </div>
  );
}
