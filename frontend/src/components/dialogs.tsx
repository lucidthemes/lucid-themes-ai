'use client';

import { useShallow } from 'zustand/shallow';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';

import { useAppFormDialogStore } from '@/store/dialogs/form';

function AppFormDialog() {
  const { open, title, description, formId, formFields, formPending, formSubmitText, setFormDialogOpen } =
    useAppFormDialogStore(
      useShallow((state) => ({
        open: state.open,
        title: state.title,
        description: state.description,
        formId: state.formId,
        formFields: state.formFields,
        formPending: state.formPending,
        formSubmitText: state.formSubmitText,
        setFormDialogOpen: state.setFormDialogOpen,
      })),
    );

  if (!formId || !formFields) return;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && setFormDialogOpen(false)}>
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {formFields}
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            }
          />
          <Button type="submit" form={formId} className="cursor-pointer">
            {formPending && <Spinner data-icon="inline-start" />}
            {formSubmitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { AppFormDialog };
