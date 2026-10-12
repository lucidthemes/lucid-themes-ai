import { Spinner } from '@/components/ui/spinner';

export default function DocumentationIngestLoading() {
  return (
    <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-muted/50">
      <Spinner className="size-10" />
    </div>
  );
}
