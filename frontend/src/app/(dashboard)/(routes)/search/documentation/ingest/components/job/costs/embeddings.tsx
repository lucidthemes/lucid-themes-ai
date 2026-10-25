import { ChevronsLeftRightEllipsis } from 'lucide-react';

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import type { DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobCostsEmbeddings({
  ingestJobData,
}: {
  ingestJobData: DocumentationIngestJob;
}) {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <ChevronsLeftRightEllipsis />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Embeddings</ItemTitle>
        <ItemDescription>{ingestJobData.embeddings_job.model}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ul className="flex flex-col items-end gap-1.5">
          <li>
            <span className="font-medium">Prompt tokens:</span> {ingestJobData.embeddings_job.usage.prompt_tokens}
          </li>
          <li>
            <span className="font-medium">Total tokens:</span> {ingestJobData.embeddings_job.usage.total_tokens}
          </li>
        </ul>
      </ItemActions>
    </Item>
  );
}
