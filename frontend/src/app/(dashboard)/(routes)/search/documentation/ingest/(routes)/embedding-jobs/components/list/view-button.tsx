'use client';

import { useShallow } from 'zustand/shallow';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAppSheetStore } from '@/store/sheet.store';

import type { DocumentationIngestEmbeddingJob } from '../../schemas/ingest-embedding-job.schema';
import DocumentationIngestEmbeddingJobsViewSheet from '../view-sheet';

export default function DocumentationIngestEmbeddingJobsListColumnsViewButton({
  item,
}: {
  item: DocumentationIngestEmbeddingJob;
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
        setSheetTitle('Ingest embedding job');
        setSheetDescription('View an ingest embedding job');
        setSheetContent(<DocumentationIngestEmbeddingJobsViewSheet item={item} />);
      }}
    >
      <Eye />
    </Button>
  );
}
