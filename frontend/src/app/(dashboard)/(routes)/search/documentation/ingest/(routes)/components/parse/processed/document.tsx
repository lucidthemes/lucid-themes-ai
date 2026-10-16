import type { Dispatch, SetStateAction } from 'react';
import { FileText } from 'lucide-react';

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import DocumentationIngestParseProcessedContent from './content';
import DocumentationIngestParseProcessedContentButtons from './content/buttons';

export default function DocumentationIngestParseProcessedDocument({
  viewContentOpen,
  setViewContentOpen,
  viewContentSplit,
  setViewContentSplit,
}: {
  viewContentOpen: boolean;
  setViewContentOpen: Dispatch<SetStateAction<boolean>>;
  viewContentSplit: boolean;
  setViewContentSplit: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <FileText />
      </ItemMedia>
      <ItemContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <ItemTitle>Document</ItemTitle>
          <ItemDescription>some-pdf-file-here.pdf</ItemDescription>
        </div>
        {viewContentOpen && <DocumentationIngestParseProcessedContent viewContentSplit={viewContentSplit} />}
      </ItemContent>
      <ItemActions>
        <DocumentationIngestParseProcessedContentButtons
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
          viewContentSplit={viewContentSplit}
          setViewContentSplit={setViewContentSplit}
        />
      </ItemActions>
    </Item>
  );
}
