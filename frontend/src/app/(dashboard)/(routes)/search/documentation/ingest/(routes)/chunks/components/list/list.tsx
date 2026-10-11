import getDocumentationIngestChunks from '../../data/get-ingest-chunks';
import DocumentationIngestChunksListTable from './table';

export default async function DocumentationIngestChunksList() {
  const ingestChunks = await getDocumentationIngestChunks();

  //console.log(ingestChunks);

  return <DocumentationIngestChunksListTable ingestChunks={ingestChunks} />;
}
