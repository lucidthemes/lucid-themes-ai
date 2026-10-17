import DocumentationIngestJobChunksItem from './item';

export default function DocumentationIngestJobChunksItems({
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
        <DocumentationIngestJobChunksItem key={chunk.id} chunk={chunk} />
      ))}
    </>
  );
}
