import { DatabasePlus, DatabaseCheck, FlaskConical } from 'lucide-react';

import { Spinner } from '@/components/ui/spinner';

function DocumentationIngestJobNewHeading() {
  return (
    <div className="flex flex-col items-center gap-2">
      <DatabasePlus />
      <h1 className="font-heading text-base font-medium">New ingest job</h1>
      <span className="text-sm text-muted-foreground">Create a new documentation ingest job</span>
    </div>
  );
}

function DocumentationIngestJobPendingHeading() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Spinner className="size-6" />
      <h1 className="font-heading text-base font-medium">Pending ingest job</h1>
      <span className="text-sm text-muted-foreground">View a pending documentation ingest job</span>
    </div>
  );
}

function DocumentationIngestJobCompletedHeading() {
  return (
    <div className="flex flex-col items-center gap-2">
      <DatabaseCheck />
      <h1 className="font-heading text-base font-medium">Completed ingest job</h1>
      <span className="text-sm text-muted-foreground">View a completed documentation ingest job</span>
    </div>
  );
}

function DocumentationIngestJobTestingHeading() {
  return (
    <div className="flex flex-col items-center gap-2">
      <FlaskConical />
      <h1 className="font-heading text-base font-medium">Test ingest job</h1>
      <span className="text-sm text-muted-foreground">
        Use this ingest job embedding vectors in isolation to test responses
      </span>
    </div>
  );
}

export {
  DocumentationIngestJobNewHeading,
  DocumentationIngestJobPendingHeading,
  DocumentationIngestJobCompletedHeading,
  DocumentationIngestJobTestingHeading,
};
