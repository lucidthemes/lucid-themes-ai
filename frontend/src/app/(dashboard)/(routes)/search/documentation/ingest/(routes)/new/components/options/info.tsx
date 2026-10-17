import { Info } from 'lucide-react';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

export default function DocumentationIngestJobNewOptionInfo({}) {
  return (
    <Item variant="outline" className="max-w-fit">
      <ItemMedia variant="icon">
        <Info />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Please note</ItemTitle>
        <ItemDescription>New ingest jobs that are pending can be found on the ingest page</ItemDescription>
      </ItemContent>
    </Item>
  );
}
