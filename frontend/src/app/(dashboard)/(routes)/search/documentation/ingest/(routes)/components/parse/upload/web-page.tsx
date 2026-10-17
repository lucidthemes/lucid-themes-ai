import { GlobeCode } from 'lucide-react';

import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import DocumentationIngestJobParseTierSelect from './tier-select';
import DocumentationIngestJobParseTierAccept from './tier-accept';

export default function DocumentationIngestJobParseUploadWebpage() {
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
          <DocumentationIngestJobParseTierSelect />
          <DocumentationIngestJobParseTierAccept type="webpage" />
        </FieldGroup>
      </ItemContent>
    </Item>
  );
}
