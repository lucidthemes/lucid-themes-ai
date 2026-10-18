import { create } from 'zustand';

type IngestJobOptions = 'automatic' | 'manual';
type IngestJobParseUploadType = 'document' | 'webpage';

type State = {
  ingestJobOption: IngestJobOptions | null;

  ingestJobParseUploadType: IngestJobParseUploadType | null;
};

type Action = {
  setIngestJobOption: (option: IngestJobOptions) => void;
  resetIngestJobOption: () => void;

  setIngestJobParseUploadType: (type: IngestJobParseUploadType) => void;
  resetIngestJobParseUploadType: () => void;
};

export const useIngestJobNewStore = create<State & Action>((set) => ({
  // State
  ingestJobOption: null,
  ingestJobParseUploadType: null,

  // Actions
  setIngestJobOption: (option) => set({ ingestJobOption: option }),
  resetIngestJobOption: () => set({ ingestJobOption: null }),

  setIngestJobParseUploadType: (type) => set({ ingestJobParseUploadType: type }),
  resetIngestJobParseUploadType: () => set({ ingestJobParseUploadType: null }),
}));
