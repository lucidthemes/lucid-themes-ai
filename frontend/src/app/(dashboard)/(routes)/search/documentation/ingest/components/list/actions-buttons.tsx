'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { EllipsisVertical, Eye, Copy, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/toast';

import duplicateIngestJob from '../../actions/duplicate-ingest-job.action';
import type { DocumentationIngestJobs } from '../../schemas/ingest-jobs.schema';

export default function DocumentationIngestJobsListActionsButtons({ item }: { item: DocumentationIngestJobs }) {
  const [isPending, startTransition] = useTransition();

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
          <Link href={`ingest/${item.id}`}>
            <DropdownMenuItem className="cursor-pointer">
              <Eye />
              View
            </DropdownMenuItem>
          </Link>
          {item.status === 'completed' && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    const result = await duplicateIngestJob(item.id);

                    if (result.success) {
                      toast.add({
                        type: 'success',
                        description: 'Successfully duplicated',
                      });
                    } else {
                      toast.add({
                        type: 'error',
                        description: 'Error duplicating ingest job. Please try again.',
                        priority: 'high',
                      });
                    }
                  });
                }}
              >
                <Copy />
                Duplicate parse
              </DropdownMenuItem>
            </>
          )}
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
