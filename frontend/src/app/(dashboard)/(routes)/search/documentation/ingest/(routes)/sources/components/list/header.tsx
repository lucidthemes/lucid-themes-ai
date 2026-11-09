import ListSearch from '@/components/list/search';
import ListSort from '@/components/list/sort';
import { Separator } from '@/components/ui/separator';

import DocumentationIngestSourcesListFilters from './filters';

export default function DocumentationIngestSourcesListHeader({ search }: { search?: string }) {
  return (
    <div className="flex flex-col justify-between gap-5 lg:flex-row">
      <div className="flex flex-col items-center gap-5 lg:flex-row">
        <ListSearch placeholder="Source Id or Type" search={search} />
        <Separator orientation="vertical" className="mt-2 hidden h-6! lg:block" />
        <DocumentationIngestSourcesListFilters />
      </div>
      <ListSort />
    </div>
  );
}
