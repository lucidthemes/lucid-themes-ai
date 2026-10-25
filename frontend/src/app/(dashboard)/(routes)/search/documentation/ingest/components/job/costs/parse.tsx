import { FileText, GlobeCode } from 'lucide-react';

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import type { DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobCostsParse({ ingestJobData }: { ingestJobData: DocumentationIngestJob }) {
  const parseTier = ingestJobData.parse_job.tier?.replace('_', ' ');

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">{ingestJobData.source.type === 'document' ? <FileText /> : <GlobeCode />}</ItemMedia>
      <ItemContent>
        <ItemTitle>Parse</ItemTitle>
        <ItemDescription>{parseTier}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <span className="font-medium">Credits:</span> {ingestJobData.parse_job.usage?.credits}
      </ItemActions>
    </Item>
  );
}
