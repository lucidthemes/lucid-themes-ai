import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import type { DocumentationIngestJobParseJob } from '../../../../schemas/ingest-job.schema';

import DocumentationIngestJobParseJobsItemContentTabs from './item-content-tabs';

export default function DocumentationIngestJobParseJobsItemContent({
  viewContentSplit,
  parse_job,
}: {
  viewContentSplit: boolean;
  parse_job: DocumentationIngestJobParseJob;
}) {
  if (!viewContentSplit) return <DocumentationIngestJobParseJobsItemContentTabs parse_job={parse_job} />;

  return (
    <ResizablePanelGroup orientation="horizontal" className="gap-4">
      <ResizablePanel defaultSize="50%">
        <iframe
          src="http://localhost:3000/search/documentation/ingest/jobs/new"
          title="description"
          className="h-full w-full"
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <DocumentationIngestJobParseJobsItemContentTabs parse_job={parse_job} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
