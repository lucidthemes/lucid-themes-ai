'use client';

import { useShallow } from 'zustand/shallow';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAppSheetStore } from '@/store/sheet.store';

import type { DocumentationIngestSources } from '../../schemas/ingest-sources.schema';
import DocumentationIngestSourcesViewSheet from '../view-sheet';

export default function DocumentationIngestSourcesListcolumnsViewButton({
  item,
}: {
  item: DocumentationIngestSources;
}) {
  const { setSheetOpen, setSheetContent } = useAppSheetStore(
    useShallow((state) => ({
      setSheetOpen: state.setSheetOpen,
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
        setSheetContent(<DocumentationIngestSourcesViewSheet item={item} />);
      }}
    >
      <Eye />
    </Button>
  );
}
