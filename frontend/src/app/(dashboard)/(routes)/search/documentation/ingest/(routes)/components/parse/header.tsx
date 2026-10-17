import { Pencil, Check } from 'lucide-react';

import { CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { DocumentationIngestJobStatus } from '../../../types/ingest-job';

export default function DocumentationIngestJobParseHeader({ jobStatus }: { jobStatus: DocumentationIngestJobStatus }) {
  return (
    <CardHeader>
      <CardTitle>Parse</CardTitle>
      <CardDescription>A practical talk on component APIs, accessibility, and shipping faster.</CardDescription>
      {jobStatus !== 'completed' && (
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="icon" className="cursor-pointer">
                  <Pencil />
                </Button>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuItem className="flex cursor-pointer justify-between">
                Document <Check />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer justify-between">Web page</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      )}
    </CardHeader>
  );
}
