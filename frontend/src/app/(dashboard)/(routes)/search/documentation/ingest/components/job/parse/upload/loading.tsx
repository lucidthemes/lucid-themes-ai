import { CardContent } from '@/components/ui/card';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';

export default function DocumentationIngestJobParseUploadLoading() {
  return (
    <CardContent>
      <Empty className="w-full bg-muted">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-sidebar">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Processing LlamaParse job</EmptyTitle>
        </EmptyHeader>
      </Empty>
    </CardContent>
  );
}
