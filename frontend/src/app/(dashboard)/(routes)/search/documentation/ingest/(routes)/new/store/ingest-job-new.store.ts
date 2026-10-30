import { create } from 'zustand';

import type { DocumentationIngestJobParseChunk } from '../schemas/parse-chunks-form.schema';

type IngestJobParseUploadType = 'document' | 'webpage';

type State = {
  ingestJobName: string | null;
  ingestJobNameError: { message: string } | null;

  ingestJobParseUploadType: IngestJobParseUploadType | null;

  ingestJobParseChunks: DocumentationIngestJobParseChunk[] | null;
};

type Action = {
  updateIngestJobName: (name: string) => void;
  setIngestJobNameError: (error: string) => void;

  setIngestJobParseUploadType: (type: IngestJobParseUploadType) => void;
  resetIngestJobParseUploadType: () => void;

  setIngestJobParseChunks: (chunks: DocumentationIngestJobParseChunk[]) => void;
  updateIngestJobParseChunk: ({
    chunkId,
    field,
    value,
  }: {
    chunkId: number;
    field: 'content' | 'metadata';
    value: string;
  }) => void;
  removeIngestJobParseChunk: (chunkId: number) => void;
};

export const useIngestJobNewStore = create<State & Action>((set) => ({
  // State
  ingestJobName: null,
  ingestJobNameError: null,
  ingestJobParseUploadType: null,
  ingestJobParseChunks: null,

  // Actions
  updateIngestJobName: (name) => set({ ingestJobName: name, ingestJobNameError: null }),
  setIngestJobNameError: (error) => set({ ingestJobNameError: { message: error } }),

  setIngestJobParseUploadType: (type) => set({ ingestJobParseUploadType: type }),
  resetIngestJobParseUploadType: () => set({ ingestJobParseUploadType: null }),

  setIngestJobParseChunks: (chunks) => set({ ingestJobParseChunks: chunks }),
  updateIngestJobParseChunk: ({ chunkId, field, value }) =>
    set((state) => {
      if (!state.ingestJobParseChunks || !chunkId || !field || !value) return state;

      const updatedChunks = state.ingestJobParseChunks.map((chunk) => {
        if (chunk.id !== chunkId) return chunk;

        // const formattedValue = field === 'metadata' ? JSON.parse(value) : value;

        const updatedChunk = {
          ...chunk,
          [field]: field === 'metadata' ? JSON.parse(value) : value,
        };

        return updatedChunk;
      });

      return { ingestJobParseChunks: updatedChunks };
    }),
  removeIngestJobParseChunk: (chunkId) =>
    set((state) => {
      if (!state.ingestJobParseChunks || !chunkId) return state;

      const updatedChunks = state.ingestJobParseChunks.filter((chunk) => chunk.id !== chunkId);

      return { ingestJobParseChunks: updatedChunks };
    }),
}));
