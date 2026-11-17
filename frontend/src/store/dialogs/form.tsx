import { create } from 'zustand';

type State = {
  open: boolean;
  title: string | null;
  description: string | null;
  formId: string | null;
  formFields: React.ReactNode | null;
  formPending: boolean | null;
  formSubmitText: string | null;
};

type Action = {
  setFormDialogOpen: (open: boolean) => void;
  setFormDialogTitle: (title: string) => void;
  setFormDialogDescription: (description: string) => void;
  setFormDialogFormId: (id: string) => void;
  setFormDialogFormFields: (fields: React.ReactNode) => void;
  setFormDialogFormPending: (pending: boolean) => void;
  setFormSubmitText: (text: string) => void;
  resetFormDialog: () => void;
};

export const useAppFormDialogStore = create<State & Action>((set) => ({
  // State
  open: false,
  title: null,
  description: null,
  formId: null,
  formFields: null,
  formPending: null,
  formSubmitText: 'Save changes',

  // Actions
  setFormDialogOpen: (open) => set({ open: open }),
  setFormDialogTitle: (title) => set({ title: title }),
  setFormDialogDescription: (description) => set({ description: description }),
  setFormDialogFormId: (id) => set({ formId: id }),
  setFormDialogFormFields: (fields) => set({ formFields: fields }),
  setFormDialogFormPending: (pending) => set({ formPending: pending }),
  setFormSubmitText: (text) => set({ formSubmitText: text }),
  resetFormDialog: () =>
    set({
      open: false,
      title: null,
      description: null,
      formId: null,
      formFields: null,
      formPending: null,
      formSubmitText: null,
    }),
}));
