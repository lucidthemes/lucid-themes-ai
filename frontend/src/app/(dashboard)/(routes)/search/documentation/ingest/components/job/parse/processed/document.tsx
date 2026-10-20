import type { Dispatch, SetStateAction } from 'react';
import { FileText } from 'lucide-react';

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import type { DocumentationIngestJob } from '../../../../schemas/ingest-job.schema';

import DocumentationIngestJobParseProcessedContent from './content';
import DocumentationIngestJobParseProcessedContentButtons from './content/buttons';

export default function DocumentationIngestJobParseProcessedDocument({
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
  if (!ingestJobData || ingestJobData.source.type !== 'document') return;

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <FileText />
      </ItemMedia>
      <ItemContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <ItemTitle>Document</ItemTitle>
          {ingestJobData.source.file_name && <ItemDescription>{ingestJobData.source.file_name}</ItemDescription>}
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
