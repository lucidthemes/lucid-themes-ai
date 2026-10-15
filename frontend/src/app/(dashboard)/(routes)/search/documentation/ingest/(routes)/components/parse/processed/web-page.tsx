import type { Dispatch, SetStateAction } from 'react';
import { FileText } from 'lucide-react';

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import DocumentationIngestParseProcessedContentTabs from './content-tabs';
import DocumentationIngestParseProcessedViewContentButton from './view-content-button';

export default function DocumentationIngestParseProcessedWebpage({
  viewContentOpen,
  setViewContentOpen,
}: {
  viewContentOpen: boolean;
  setViewContentOpen: Dispatch<SetStateAction<boolean>>;
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
        {viewContentOpen && <DocumentationIngestParseProcessedContentTabs />}
      </ItemContent>
      <ItemActions>
        <DocumentationIngestParseProcessedViewContentButton
          viewContentOpen={viewContentOpen}
          setViewContentOpen={setViewContentOpen}
        />
      </ItemActions>
    </Item>
  );
}
