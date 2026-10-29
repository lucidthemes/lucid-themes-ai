import Link from 'next/link';
import { EllipsisVertical, Eye, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { DocumentationIngestJobsResult } from '../../schemas/ingest-jobs-list.schema';

export default function DocumentationIngestJobsListActionsButtons({ item }: { item: DocumentationIngestJobsResult }) {
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
          <DropdownMenuGroup>
            <Link href={`ingest/${item.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Eye />
                View
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" className="cursor-pointer">
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
