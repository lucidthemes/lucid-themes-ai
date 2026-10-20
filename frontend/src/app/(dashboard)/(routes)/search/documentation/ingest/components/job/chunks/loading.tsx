import { CardContent } from '@/components/ui/card';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';

export default function DocumentationIngestJobChunksEmbeddingsLoading() {
  return (
    <CardContent>
      <Empty className="w-full bg-muted">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-sidebar">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Generating embeddings</EmptyTitle>
        </EmptyHeader>
      </Empty>
    </CardContent>
  );
}
