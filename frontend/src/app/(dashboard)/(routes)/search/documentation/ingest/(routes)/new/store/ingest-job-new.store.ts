import { create } from 'zustand';

type IngestJobParseUploadType = 'document' | 'webpage';

type State = {
  ingestJobname: string | null;

  ingestJobParseUploadType: IngestJobParseUploadType | null;
};

type Action = {
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
  updateIngestJobName: (name) => set({ ingestJobname: name }),

  setIngestJobParseUploadType: (type) => set({ ingestJobParseUploadType: type }),
  resetIngestJobParseUploadType: () => set({ ingestJobParseUploadType: null }),
}));
