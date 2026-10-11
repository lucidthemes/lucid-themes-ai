import getDocumentationIngestSources from '../../data/get-ingest-sources';
import DocumentationIngestSourcesListTable from './table';

export default async function DocumentationIngestSourcesList() {
  const ingestSources = await getDocumentationIngestSources();

  //console.log(ingestSources);

  return <DocumentationIngestSourcesListTable ingestSources={ingestSources} />;
}
