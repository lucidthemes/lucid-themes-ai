import { GlobeCode } from 'lucide-react';

import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import DocumentationIngestParseTierSelect from './tier-select';
import DocumentationIngestParseTierAccept from './tier-accept';

export default function DocumentationIngestParseUploadWebpage() {
  return (
    <Item variant="outline" className="cursor-pointer hover:bg-muted">
      <ItemMedia variant="icon">
        <GlobeCode />
      </ItemMedia>
      <ItemContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <ItemTitle>Web page</ItemTitle>
          <ItemDescription>Parse a web page</ItemDescription>
        </div>
        <FieldGroup className="w-full">
          <Field>
            <Input id="webpage" type="url" className="cursor-text" placeholder="https://www.example.com" />
          </Field>
          <DocumentationIngestParseTierSelect />
          <DocumentationIngestParseTierAccept type="webpage" />
        </FieldGroup>
      </ItemContent>
    </Item>
  );
}
