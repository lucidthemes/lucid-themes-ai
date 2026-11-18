import { create } from 'zustand';

type State = {
  open: boolean;
  title: string | null;
  description: string | null;
  button: React.ReactNode | null;
};

type Action = {
  setDeleteDialogOpen: (open: boolean) => void;
  setDeleteDialogTitle: (title: string) => void;
  setDeleteDialogDescription: (description: string) => void;
  setDeleteDialogButton: (button: React.ReactNode) => void;
  resetDeleteDialog: () => void;
};

export const useAppDeleteDialogStore = create<State & Action>((set) => ({
  // State
  open: false,
  title: null,
  description: null,
  button: null,

  // Actions
  setDeleteDialogOpen: (open) => set({ open: open }),
  setDeleteDialogTitle: (title) => set({ title: title }),
  setDeleteDialogDescription: (description) => set({ description: description }),
  setDeleteDialogButton: (button) => set({ button: button }),
  resetDeleteDialog: () => set({ open: false, title: null, description: null, button: null }),
}));
