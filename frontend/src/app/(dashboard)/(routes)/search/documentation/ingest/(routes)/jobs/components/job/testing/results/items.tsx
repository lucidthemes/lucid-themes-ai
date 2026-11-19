import DocumentationIngestJobTestingResultsItem from './item';

export default function DocumentationIngestJobTestingResultsItems({ tests }) {
  if (!tests) return;

  return (
    <div className="flex flex-col gap-5">
      {tests.map((test) => (
        <DocumentationIngestJobTestingResultsItem key={test.id} test={test} />
      ))}
    </div>
  );
}
