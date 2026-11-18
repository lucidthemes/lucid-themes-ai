'use client';

import { useShallow } from 'zustand/shallow';
import { Trash2Icon } from 'lucide-react';

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Spinner } from '@/components/ui/spinner';

import { useAppFormDialogStore } from '@/store/dialogs/form';
import { useAppDeleteDialogStore } from '@/store/dialogs/delete';

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

  if (!open || !formId || !formFields) return;

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

function AppDeleteDialog() {
  const { open, title, description, button, setDeleteDialogOpen } = useAppDeleteDialogStore(
    useShallow((state) => ({
      open: state.open,
      title: state.title,
      description: state.description,
      button: state.button,
      setDeleteDialogOpen: state.setDeleteDialogOpen,
    })),
  );

  if (!open || !button) return;

  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && setDeleteDialogOpen(false)}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" render={button as React.ReactElement} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { AppFormDialog, AppDeleteDialog };
