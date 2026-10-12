import { CardContent } from '@/components/ui/card';

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
    <CardContent className="flex flex-col gap-5">
      {chunks.map((chunk) => (
        <DocumentationIngestChunksItem key={chunk.id} chunk={chunk} />
      ))}
    </CardContent>
  );
}
