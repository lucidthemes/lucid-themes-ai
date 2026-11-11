import ListSearch from '@/components/list/search';
import ListSort from '@/components/list/sort';
import { Separator } from '@/components/ui/separator';

export default function DocumentationIngestEmbeddingJobsListHeader({ search_query }: { search_query?: string }) {
  return (
    <div className="flex flex-col justify-between gap-5 lg:flex-row">
      <div className="flex flex-col items-center gap-5 lg:flex-row">
        <ListSearch placeholder="Embedding Job Id" search_query={search_query} />
        <Separator orientation="vertical" className="mt-2 hidden h-6! lg:block" />
      </div>
      <ListSort />
    </div>
  );
}
