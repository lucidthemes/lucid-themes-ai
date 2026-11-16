import { EllipsisVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { DocumentationIngestJobs } from '../../../schemas/ingest-jobs.schema';

import DocumentationIngestJobsListActionsButtonView from './view';
import DocumentationIngestJobsListActionsButtonDuplicate from './duplicate';
import DocumentationIngestJobsListActionsButtonDelete from './delete';

export default function DocumentationIngestJobsListActionsButtons({ item }: { item: DocumentationIngestJobs }) {
  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <EllipsisVertical />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DocumentationIngestJobsListActionsButtonView item={item} />
          {item.status === 'completed' && (
            <>
              <DropdownMenuSeparator />
              <DocumentationIngestJobsListActionsButtonDuplicate item={item} />
            </>
          )}
          <DropdownMenuSeparator />
          <DocumentationIngestJobsListActionsButtonDelete item={item} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
