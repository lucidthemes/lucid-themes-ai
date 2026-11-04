import type { Dispatch, SetStateAction } from 'react';
import { FileText } from 'lucide-react';

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import type { DocumentationIngestJob } from '../../../../schemas/ingest-job.schema';

import DocumentationIngestJobParseProcessedContent from './content';
import DocumentationIngestJobParseProcessedContentButtons from './content/buttons';

export default function DocumentationIngestJobParseProcessedWebpage({
  viewContentOpen,
  setViewContentOpen,
  viewContentSplit,
  setViewContentSplit,
  ingestJobData,
}: {
  viewContentOpen: boolean;
  setViewContentOpen: Dispatch<SetStateAction<boolean>>;
  viewContentSplit: boolean;
  setViewContentSplit: Dispatch<SetStateAction<boolean>>;
  ingestJobData?: DocumentationIngestJob;
}) {
  if (!ingestJobData || ingestJobData.source.type !== 'webpage') return;

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <FileText />
      </ItemMedia>
      <ItemContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <ItemTitle>Web page</ItemTitle>
          {ingestJobData.source.webpage_url && <ItemDescription>{ingestJobData.source.webpage_url}</ItemDescription>}
        </div>
        {viewContentOpen && (
          <DocumentationIngestJobParseProcessedContent
            viewContentSplit={viewContentSplit}
            ingestJobData={ingestJobData}
          />
        )}
      </ItemContent>
      <ItemActions>
        <DocumentationIngestJobParseProcessedContentButtons
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
        />
      </ItemActions>
    </Item>
  );
}
