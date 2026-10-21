import { create } from 'zustand';

type IngestJobParseUploadType = 'document' | 'webpage';

type State = {
  ingestJobName: string | null;
  ingestJobNameError: { message: string } | null;

  ingestJobParseUploadType: IngestJobParseUploadType | null;
};

type Action = {
  updateIngestJobName: (name: string) => void;
  setIngestJobNameError: (error: string) => void;

  setIngestJobParseUploadType: (type: IngestJobParseUploadType) => void;
  resetIngestJobParseUploadType: () => void;
};

export const useIngestJobNewStore = create<State & Action>((set) => ({
  // State
  ingestJobName: null,
  ingestJobNameError: null,
  ingestJobParseUploadType: null,

  // Actions
  updateIngestJobName: (name) => set({ ingestJobName: name, ingestJobNameError: null }),
  setIngestJobNameError: (error) => set({ ingestJobNameError: { message: error } }),

  setIngestJobParseUploadType: (type) => set({ ingestJobParseUploadType: type }),
  resetIngestJobParseUploadType: () => set({ ingestJobParseUploadType: null }),
}));
