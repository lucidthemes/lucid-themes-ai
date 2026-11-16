import Link from 'next/link';
import { Eye } from 'lucide-react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import type { DocumentationIngestJobs } from '../../../schemas/ingest-jobs.schema';

export default function DocumentationIngestJobsListActionsButtonView({ item }: { item: DocumentationIngestJobs }) {
  return (
    <Link href={`/search/documentation/ingest/jobs/${item.id}`}>
      <DropdownMenuItem className="cursor-pointer">
        <Eye />
        View
      </DropdownMenuItem>
    </Link>
  );
}
