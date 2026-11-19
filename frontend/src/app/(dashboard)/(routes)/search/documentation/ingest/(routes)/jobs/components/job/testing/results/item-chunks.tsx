import DocumentationIngestJobTestingResultsItemChunk from './item-chunk';

export default function DocumentationIngestJobTestingResultsItemChunks({ chunks }) {
  return (
    <div className="mt-2.5 flex flex-col gap-5">
      {chunks.map((chunk) => (
        <DocumentationIngestJobTestingResultsItemChunk key={chunk.id} chunk={chunk} />
      ))}
    </div>
  );
}
