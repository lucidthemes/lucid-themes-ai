'use client';

import { useShallow } from 'zustand/shallow';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAppSheetStore } from '@/store/sheet.store';

import type { DocumentationIngestParseJob } from '../../schemas/ingest-parse-job.schema';
import DocumentationIngestParseJobsViewSheet from '../view-sheet';

export default function DocumentationIngestParseJobsListColumnsViewButton({
  item,
}: {
  item: DocumentationIngestParseJob;
}) {
  const { setSheetOpen, setSheetTitle, setSheetDescription, setSheetContent } = useAppSheetStore(
    useShallow((state) => ({
      setSheetOpen: state.setSheetOpen,
      setSheetTitle: state.setSheetTitle,
      setSheetDescription: state.setSheetDescription,
      setSheetContent: state.setSheetContent,
    })),
  );

  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      onClick={() => {
        setSheetOpen(true);
        setSheetTitle('Ingest parse job');
        setSheetDescription('View an ingest parse job');
        setSheetContent(<DocumentationIngestParseJobsViewSheet item={item} />);
      }}
    >
      <Eye />
    </Button>
  );
}
