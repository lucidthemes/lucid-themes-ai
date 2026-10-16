import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import DocumentationIngestParseProcessedContentTabs from './tabs';

export default function DocumentationIngestParseProcessedContent({ viewContentSplit }: { viewContentSplit: boolean }) {
  if (!viewContentSplit) return <DocumentationIngestParseProcessedContentTabs />;

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
        <DocumentationIngestParseProcessedContentTabs />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
