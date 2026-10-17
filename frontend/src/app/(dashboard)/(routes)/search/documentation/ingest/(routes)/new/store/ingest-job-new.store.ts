import { create } from 'zustand';

type IngestJobOptions = 'automatic' | 'manual';

type State = {
  jobOption: IngestJobOptions | null;
};

type Action = {
  setJobOption: (option: IngestJobOptions) => void;
  resetJobOption: () => void;
};

export const useIngestJobNewStore = create<State & Action>((set) => ({
  // State
  jobOption: null,

  // Actions
  setJobOption: (option) => set({ jobOption: option }),
  resetJobOption: () => set({ jobOption: null }),
}));
