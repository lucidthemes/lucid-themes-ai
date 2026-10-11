'use client';

import { useShallow } from 'zustand/shallow';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAppSheetStore } from '@/store/sheet.store';

import type { DocumentationIngestChunk } from '../../schemas/ingest-chunk.schema';
import DocumentationIngestChunksViewSheet from '../view-sheet';

export default function DocumentationIngestChunksListColumnsViewButton({ item }: { item: DocumentationIngestChunk }) {
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
        setSheetTitle('Ingest chunk');
        setSheetDescription('View an ingest chunk');
        setSheetContent(<DocumentationIngestChunksViewSheet item={item} />);
      }}
    >
      <Eye />
    </Button>
  );
}
