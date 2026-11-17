'use client';

import { Copy } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useAppFormDialogStore } from '@/store/dialogs/form';

import type { DocumentationIngestJobs } from '../../../schemas/ingest-jobs.schema';
import useDocumentationIngestJobDuplicateForm from '../../../hooks/use-duplicate-job-form';

import DocumentationIngestJobsListActionsButtonDuplicateForm from './duplicate-form';

export default function DocumentationIngestJobsListActionsButtonDuplicate({ item }: { item: DocumentationIngestJobs }) {
  const {
    setFormDialogOpen,
    setFormDialogTitle,
    setFormDialogDescription,
    setFormDialogFormId,
    setFormDialogFormFields,
    setFormDialogFormPending,
    setFormSubmitText,
  } = useAppFormDialogStore(
    useShallow((state) => ({
      setFormDialogOpen: state.setFormDialogOpen,
      setFormDialogTitle: state.setFormDialogTitle,
      setFormDialogDescription: state.setFormDialogDescription,
      setFormDialogFormId: state.setFormDialogFormId,
      setFormDialogFormFields: state.setFormDialogFormFields,
      setFormDialogFormPending: state.setFormDialogFormPending,
      setFormSubmitText: state.setFormSubmitText,
    })),
  );

  const { form, onSubmit, isPending } = useDocumentationIngestJobDuplicateForm({ item });

  const formId = 'documentation-ingest-job-duplicate-form';

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => {
        setFormDialogOpen(true);
        setFormDialogTitle('Duplicate ingest job');
        setFormDialogDescription(
          'Create a new ingest job with duplicate source and parse job data without needing to rerun a LlamaParse job',
        );
        setFormDialogFormId(formId);
        setFormDialogFormFields(
          <DocumentationIngestJobsListActionsButtonDuplicateForm form={form} onSubmit={onSubmit} formId={formId} />,
        );
        setFormDialogFormPending(isPending);
        setFormSubmitText('Duplicate');
      }}
    >
      <Copy />
      Duplicate parse
    </DropdownMenuItem>
  );
}
