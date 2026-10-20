'use client';

import { useShallow } from 'zustand/shallow';
import { Pencil, Check } from 'lucide-react';

import { CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useIngestJobNewStore } from '../../../(routes)/new/store/ingest-job-new.store';
import type { DocumentationIngestJobStatus } from '../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobParseHeader({
  ingestJobStatus,
}: {
  ingestJobStatus: DocumentationIngestJobStatus;
}) {
  const { ingestJobParseUploadType, setIngestJobParseUploadType } = useIngestJobNewStore(
    useShallow((state) => ({
      ingestJobParseUploadType: state.ingestJobParseUploadType,
      setIngestJobParseUploadType: state.setIngestJobParseUploadType,
    })),
  );

  return (
    <CardHeader>
      <CardTitle>Parse</CardTitle>
      <CardDescription>A practical talk on component APIs, accessibility, and shipping faster.</CardDescription>
      {ingestJobStatus === 'new' && ingestJobParseUploadType && (
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="icon" className="cursor-pointer">
                  <Pencil />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex cursor-pointer justify-between"
                onClick={() => setIngestJobParseUploadType('document')}
              >
                Document
                {ingestJobParseUploadType === 'document' && <Check />}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex cursor-pointer justify-between"
                onClick={() => setIngestJobParseUploadType('webpage')}
              >
                Web page
                {ingestJobParseUploadType === 'webpage' && <Check />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      )}
    </CardHeader>
  );
}
