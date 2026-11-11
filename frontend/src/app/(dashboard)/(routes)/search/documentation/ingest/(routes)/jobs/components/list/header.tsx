import ListSearch from '@/components/list/search';
import ListSort from '@/components/list/sort';
import { Separator } from '@/components/ui/separator';

import DocumentationIngestJobsListFilters from './filters';

export default function DocumentationIngestJobsListHeader({ search_query }: { search_query?: string }) {
  return (
    <div className="flex flex-col justify-between gap-5 lg:flex-row">
      <div className="flex flex-col items-center gap-5 lg:flex-row">
        <ListSearch placeholder="Job Id or Name" search_query={search_query} />
        <Separator orientation="vertical" className="mt-2 hidden h-6! lg:block" />
        <DocumentationIngestJobsListFilters />
      </div>
      <ListSort />
    </div>
  );
}
