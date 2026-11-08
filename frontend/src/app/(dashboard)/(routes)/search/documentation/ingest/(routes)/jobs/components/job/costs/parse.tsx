import { FileText, GlobeCode } from 'lucide-react';

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { capitalizeText } from '@/lib/formatters';

import type { DocumentationIngestJob } from '../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobCostsParse({ ingestJobData }: { ingestJobData: DocumentationIngestJob }) {
  if (ingestJobData.parse_jobs.length === 0) return;

  const lastParseJob = ingestJobData.parse_jobs.at(-1);

  if (!lastParseJob) return;

  const parseTier = lastParseJob.tier ? capitalizeText(lastParseJob.tier.replace('_', ' ')) : '';

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">{ingestJobData.source.type === 'document' ? <FileText /> : <GlobeCode />}</ItemMedia>
      <ItemContent>
        <ItemTitle>Parse</ItemTitle>
        {parseTier && <ItemDescription>{parseTier}</ItemDescription>}
      </ItemContent>
      {lastParseJob.usage && (
        <ItemActions>
          <span className="font-medium">Credits:</span> {lastParseJob.usage.credits}
        </ItemActions>
      )}
    </Item>
  );
}
