import type { DocumentationIngestSources } from '../schemas/ingest-sources.schema';

export default function DocumentationIngestSourcesViewSheet({ item }: { item: DocumentationIngestSources }) {
  return <p>source! {item.id}</p>;
}
