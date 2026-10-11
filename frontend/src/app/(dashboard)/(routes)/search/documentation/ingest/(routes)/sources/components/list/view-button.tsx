'use client';

import { useShallow } from 'zustand/shallow';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAppSheetStore } from '@/store/sheet.store';

import type { DocumentationIngestSource } from '../../schemas/ingest-source.schema';
import DocumentationIngestSourcesViewSheet from '../view-sheet';

export default function DocumentationIngestSourcesListColumnsViewButton({ item }: { item: DocumentationIngestSource }) {
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
        setSheetTitle('Ingest source');
        setSheetDescription('View an ingest source');
        setSheetContent(<DocumentationIngestSourcesViewSheet item={item} />);
      }}
    >
      <Eye />
    </Button>
  );
}
