import DocumentationIngestNewCreateOptionCard from './option-card';

export default function DocumentationIngestNewCreateOptions() {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-10">
      <DocumentationIngestNewCreateOptionCard
        title="Automatic"
        description="A practical talk on component APIs, accessibility, and shipping faster."
        badge="Recommended"
      />
      <DocumentationIngestNewCreateOptionCard
        title="Manual"
        description="A practical talk on component APIs, accessibility, and shipping faster."
      />
    </div>
  );
}
