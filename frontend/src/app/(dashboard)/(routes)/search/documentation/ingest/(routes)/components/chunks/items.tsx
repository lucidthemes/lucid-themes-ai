import DocumentationIngestChunksItem from './item';

export default function DocumentationIngestChunksItems({
  chunks,
}: {
  chunks: {
    id: string;
    content: string;
  }[];
}) {
  return (
    <>
      {chunks.map((chunk) => (
        <DocumentationIngestChunksItem key={chunk.id} chunk={chunk} />
      ))}
    </>
  );
}
