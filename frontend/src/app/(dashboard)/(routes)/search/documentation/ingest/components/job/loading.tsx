import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';

export default function DocumentationIngestJobLoading({ title }: { title: string }) {
  return (
    <Empty className="w-full bg-muted">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-sidebar">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
