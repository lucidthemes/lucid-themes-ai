import { create } from 'zustand';

type SheetType = 'content' | 'form';

type SheetSize = 'default' | 'medium' | 'large' | 'xlarge';

type State = {
  open: boolean;
  type: SheetType;
  size: SheetSize;
  title: string | null;
  description: string | null;
  content: React.ReactNode | null;
};

type Action = {
  setSheetOpen: (open: boolean) => void;
  setSheetType: (type: SheetType) => void;
  setSheetSize: (size: SheetSize) => void;
  setSheetTitle: (title: string) => void;
  setSheetDescription: (description: string) => void;
  setSheetContent: (content: React.ReactNode) => void;
};

export const useAppSheetStore = create<State & Action>((set) => ({
  // State
  open: false,
  type: 'content',
  size: 'default',
  title: null,
  description: null,
  content: null,

  // Actions
  setSheetOpen: (open) => set({ open: open }),
  setSheetType: (type) => set({ type: type }),
  setSheetSize: (size) => set({ size: size }),
  setSheetTitle: (title) => set({ title: title }),
  setSheetDescription: (description) => set({ description: description }),
  setSheetContent: (content) => set({ content: content }),
}));
