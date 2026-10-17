import type { Dispatch, SetStateAction } from 'react';
import { FileText } from 'lucide-react';

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import DocumentationIngestJobParseProcessedContent from './content';
import DocumentationIngestJobParseProcessedContentButtons from './content/buttons';

export default function DocumentationIngestJobParseProcessedWebpage({
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
          <ItemTitle>Web page</ItemTitle>
          <ItemDescription>www.example.com</ItemDescription>
        </div>
        {viewContentOpen && <DocumentationIngestJobParseProcessedContent viewContentSplit={viewContentSplit} />}
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
