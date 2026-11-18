'use client';

import { Trash } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useAppDeleteDialogStore } from '@/store/dialogs/delete';

import type { DocumentationIngestJobs } from '../../../schemas/ingest-jobs.schema';

import DocumentationIngestJobsListActionsButtonDeleteButton from './delete-button';

export default function DocumentationIngestJobsListActionsButtonDelete({ item }: { item: DocumentationIngestJobs }) {
  const { setDeleteDialogOpen, setDeleteDialogTitle, setDeleteDialogDescription, setDeleteDialogButton } =
    useAppDeleteDialogStore(
      useShallow((state) => ({
        setDeleteDialogOpen: state.setDeleteDialogOpen,
        setDeleteDialogTitle: state.setDeleteDialogTitle,
        setDeleteDialogDescription: state.setDeleteDialogDescription,
        setDeleteDialogButton: state.setDeleteDialogButton,
      })),
    );

  return (
    <DropdownMenuItem
      variant="destructive"
      className="cursor-pointer"
      onClick={() => {
        setDeleteDialogOpen(true);
        setDeleteDialogTitle('Delete job');
        setDeleteDialogDescription('This will permanently delete the ingest job. This action cannot be undone.');
        setDeleteDialogButton(<DocumentationIngestJobsListActionsButtonDeleteButton item={item} />);
      }}
    >
      <Trash />
      Delete
    </DropdownMenuItem>
  );
}
