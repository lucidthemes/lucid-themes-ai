import { DatabasePlus, DatabaseCheck, FlaskConical } from 'lucide-react';

import { Spinner } from '@/components/ui/spinner';

function DocumentationIngestJobHeading({
  icon,
  heading,
  subHeading,
}: {
  icon: React.ReactNode;
  heading: string;
  subHeading: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      {icon}
      <h1 className="font-heading text-xl font-medium">{heading}</h1>
      <span className="text-sm text-muted-foreground">{subHeading}</span>
    </div>
  );
}

function DocumentationIngestJobNewHeading() {
  return DocumentationIngestJobHeading({
    icon: <DatabasePlus />,
    heading: 'New ingest job',
    subHeading: 'Create a new documentation ingest job',
  });
}

function DocumentationIngestJobPendingHeading() {
  return DocumentationIngestJobHeading({
    icon: <Spinner className="size-6" />,
    heading: 'Pending ingest job',
    subHeading: 'View a pending documentation ingest job',
  });
}

function DocumentationIngestJobCompletedHeading() {
  return DocumentationIngestJobHeading({
    icon: <DatabaseCheck />,
    heading: 'Completed ingest job',
    subHeading: 'View a completed documentation ingest job',
  });
}

function DocumentationIngestJobTestingHeading() {
  return DocumentationIngestJobHeading({
    icon: <FlaskConical />,
    heading: 'Test ingest job',
    subHeading: 'Use this ingest job embeddings in isolation to test results',
  });
}

export {
  DocumentationIngestJobNewHeading,
  DocumentationIngestJobPendingHeading,
  DocumentationIngestJobCompletedHeading,
  DocumentationIngestJobTestingHeading,
};
