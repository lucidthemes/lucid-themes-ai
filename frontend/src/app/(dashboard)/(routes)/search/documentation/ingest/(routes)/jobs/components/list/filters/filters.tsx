import ListFilters from '@/components/list/filters/filters';

import DocumentationIngestJobsListFilterStatus from './status';

export default function DocumentationIngestJobsListFilters() {
  return (
    <ListFilters>
      <DocumentationIngestJobsListFilterStatus />
    </ListFilters>
  );
}
