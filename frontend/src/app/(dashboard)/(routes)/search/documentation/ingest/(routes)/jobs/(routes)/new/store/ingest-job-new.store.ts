import { create } from 'zustand';

import type { DocumentationIngestJobChunk } from '../../../schemas/ingest-job.schema';

type IngestJobParseUploadType = 'document' | 'webpage';

type State = {
  ingestJobName: string | null;
  ingestJobNameError: { message: string } | null;

  ingestJobParseUploadType: IngestJobParseUploadType | null;

  ingestJobChunksCreated: DocumentationIngestJobChunk[] | null;
};

type Action = {
  updateIngestJobName: (name: string) => void;
  setIngestJobNameError: (error: string) => void;

  setIngestJobParseUploadType: (type: IngestJobParseUploadType) => void;
  resetIngestJobParseUploadType: () => void;

  setIngestJobChunksCreated: (chunks: DocumentationIngestJobChunk[]) => void;
  updateIngestJobChunkCreated: ({
    chunkId,
    field,
    value,
  }: {
    chunkId: string;
    field: 'content' | 'metadata';
    value: string;
  }) => void;
  removeIngestJobChunkCreated: (chunkId: string) => void;
};

export const useIngestJobNewStore = create<State & Action>((set) => ({
  // State
  ingestJobName: null,
  ingestJobNameError: null,
  ingestJobParseUploadType: null,
  ingestJobChunksCreated: null,

  // Actions
  updateIngestJobName: (name) => set({ ingestJobName: name, ingestJobNameError: null }),
  setIngestJobNameError: (error) => set({ ingestJobNameError: { message: error } }),

  setIngestJobParseUploadType: (type) => set({ ingestJobParseUploadType: type }),
  resetIngestJobParseUploadType: () => set({ ingestJobParseUploadType: null }),

  setIngestJobChunksCreated: (chunks) => set({ ingestJobChunksCreated: chunks }),
  updateIngestJobChunkCreated: ({ chunkId, field, value }) =>
    set((state) => {
      if (!state.ingestJobChunksCreated || !chunkId || !field || !value) return state;

      const updatedChunks = state.ingestJobChunksCreated.map((chunk) => {
        if (chunk.id !== chunkId) return chunk;

        const updatedChunk = {
          ...chunk,
          [field]: field === 'metadata' ? JSON.parse(value) : value,
        };

        return updatedChunk;
      });

      return { ingestJobChunksCreated: updatedChunks };
    }),
  removeIngestJobChunkCreated: (chunkId) =>
    set((state) => {
      if (!state.ingestJobChunksCreated || !chunkId) return state;

      const updatedChunks = state.ingestJobChunksCreated.filter((chunk) => chunk.id !== chunkId);

      return { ingestJobChunksCreated: updatedChunks };
    }),
}));
