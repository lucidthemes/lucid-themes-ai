import type { DocumentationIngestJobTest } from '../../../../schemas/ingest-job-test.schema';

import DocumentationIngestJobTestingResultsItem from './item';

export default function DocumentationIngestJobTestingResultsItems({
  tests,
  showMetadata,
  showEmbeddings,
}: {
  tests: DocumentationIngestJobTest[];
  showMetadata: boolean;
  showEmbeddings: boolean;
}) {
  if (!tests) return;

  return (
    <div className="flex flex-col gap-5">
      {tests.map((test) => (
        <DocumentationIngestJobTestingResultsItem
          key={test.id}
          test={test}
          showMetadata={showMetadata}
          showEmbeddings={showEmbeddings}
        />
      ))}
    </div>
  );
}
