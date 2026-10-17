import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import DocumentationIngestJobParseProcessedContentTabs from './tabs';

export default function DocumentationIngestJobParseProcessedContent({
  viewContentSplit,
}: {
  viewContentSplit: boolean;
}) {
  if (!viewContentSplit) return <DocumentationIngestJobParseProcessedContentTabs />;

  return (
    <ResizablePanelGroup orientation="horizontal" className="gap-4">
      <ResizablePanel defaultSize="50%">
        <iframe
          src="http://localhost:3000/search/documentation/ingest/new"
          title="description"
          className="h-full w-full"
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <DocumentationIngestJobParseProcessedContentTabs />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
