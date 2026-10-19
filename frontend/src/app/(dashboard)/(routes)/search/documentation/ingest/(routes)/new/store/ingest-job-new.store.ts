import { create } from 'zustand';

type IngestJobOptions = 'generated' | 'manual';
type IngestJobParseUploadType = 'document' | 'webpage';

type State = {
  ingestJobOption: IngestJobOptions | null;

  ingestJobname: string | null;

  ingestJobParseUploadType: IngestJobParseUploadType | null;
};

type Action = {
  setIngestJobOption: (option: IngestJobOptions) => void;
  resetIngestJobOption: () => void;

  updateIngestJobName: (name: string) => void;

  setIngestJobParseUploadType: (type: IngestJobParseUploadType) => void;
  resetIngestJobParseUploadType: () => void;
};

export const useIngestJobNewStore = create<State & Action>((set) => ({
  // State
  ingestJobOption: null,
  ingestJobname: null,
  ingestJobParseUploadType: null,

  // Actions
  setIngestJobOption: (option) => set({ ingestJobOption: option }),
  resetIngestJobOption: () => set({ ingestJobOption: null }),

  updateIngestJobName: (name) => set({ ingestJobname: name }),

  setIngestJobParseUploadType: (type) => set({ ingestJobParseUploadType: type }),
  resetIngestJobParseUploadType: () => set({ ingestJobParseUploadType: null }),
}));
