import DocumentationIngestJobNewOptionCard from './card';
import DocumentationIngestJobNewOptionInfo from './info';

export default function DocumentationIngestJobNewOptions() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-10">
        <DocumentationIngestJobNewOptionCard
          option="generated"
          title="Generated"
          description="A practical talk on component APIs, accessibility, and shipping faster."
          badge="Recommended"
        />
        <DocumentationIngestJobNewOptionCard
          option="manual"
          title="Manual"
          description="A practical talk on component APIs, accessibility, and shipping faster."
        />
      </div>
      <DocumentationIngestJobNewOptionInfo />
    </div>
  );
}
