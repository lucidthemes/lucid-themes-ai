import {
  Maximize2,
  ChevronsLeftRightEllipsis,
  ShieldAlertIcon,
  SquareText,
  ChevronDown,
  FileText,
  GlobeCode,
  Send,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Textarea } from '@/components/ui/textarea';

import DocumentationIngestLoading from '../loading';

export default function DocumentationIngestParse() {
  return (
    <Card className="relative mx-auto w-full">
      <CardHeader>
        <CardTitle>Parse</CardTitle>
        <CardDescription>A practical talk on component APIs, accessibility, and shipping faster.</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-5">
        <Item variant="outline" className="cursor-pointer hover:bg-muted">
          <ItemMedia variant="icon">
            <FileText />
          </ItemMedia>
          <ItemContent className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <ItemTitle>Document</ItemTitle>
              <ItemDescription>Select a document to parse</ItemDescription>
            </div>
            <Field>
              <Input id="picture" type="file" className="cursor-pointer" />
              {/* <FieldDescription>Select a document to parse</FieldDescription> */}
            </Field>
          </ItemContent>
        </Item>

        <Item variant="outline" className="cursor-pointer hover:bg-muted">
          <ItemMedia variant="icon">
            <GlobeCode />
          </ItemMedia>
          <ItemContent className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <ItemTitle>Web page</ItemTitle>
              <ItemDescription>Enter a web page to parse</ItemDescription>
            </div>
            <Field>
              <Input id="picture" type="url" className="cursor-text" placeholder="https://www.example.com" />
              {/* <FieldDescription>Enter a web page to parse</FieldDescription> */}
            </Field>
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter className="justify-end">
        <Button className="cursor-pointer">
          Send to LlamaParse
          <Send />
        </Button>
      </CardFooter>

      <DocumentationIngestLoading />
    </Card>
  );
}
