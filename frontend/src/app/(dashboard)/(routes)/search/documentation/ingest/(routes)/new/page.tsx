import DashboardLayoutContainer from '../../../../../../components/container';
import DashboardLayoutHeading from '../../../../../../components/heading';

import DocumentationIngestParse from '../../components/parse';
import DocumentationIngestChunks from '../../components/chunks';

import DocumentationIngestNewBackButton from './components/back-button';
import DocumentationIngestNewCreateOptions from './components/create-options/create-options';

import { Maximize2, ChevronsLeftRightEllipsis, ShieldAlertIcon, SquareText, ChevronDown } from 'lucide-react';

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
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Textarea } from '@/components/ui/textarea';

// const chunks = [
//   { id: '1', content: 'A practical talk on component APIs, accessibility, and shipping faster.' },
//   { id: '2', content: 'A practical talk on component APIs, accessibility, and shipping faster.' },
// ];

export default async function DashboardSearchDocumentationIngestNewPage({}) {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="New job" />
      <div className="flex flex-col gap-10">
        <DocumentationIngestNewBackButton />
        <DocumentationIngestNewCreateOptions />
      </div>
      <DocumentationIngestParse />
      <DocumentationIngestChunks />
      {/* <Card className="relative mx-auto w-full">
        <CardHeader>
          <CardTitle>Document chunks</CardTitle>
          <CardDescription>A practical talk on component APIs, accessibility, and shipping faster.</CardDescription>
          <CardAction className="flex gap-5">
            <Button className="cursor-pointer" variant="secondary">
              Expand <Maximize2 />
            </Button>
            <Button className="cursor-pointer">
              Generate embeddings <ChevronsLeftRightEllipsis />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {chunks.map((chunk) => (
            <Field key={chunk.id}>
              <FieldLabel htmlFor={chunk.id}>Chunk</FieldLabel>
              <FieldDescription>ID: {chunk.id}</FieldDescription>
              <Textarea id={chunk.id} placeholder="Type your message here." defaultValue={chunk.content} />
            </Field>
          ))}
          {chunks.map((chunk) => (
            <Item key={chunk.id} variant="outline">
              <ItemMedia variant="icon">
                <SquareText />
              </ItemMedia>
              <ItemContent>
                <ItemTitle># {chunk.id}</ItemTitle>
                <Item className="p-0">
                  <ItemContent>
                    <ItemTitle>Markdown</ItemTitle>
                    <Textarea id={chunk.id} placeholder="Type your message here." defaultValue={chunk.content} />
                    <ItemTitle>Vector</ItemTitle>
                    <Textarea id={chunk.id} placeholder="Type your message here." defaultValue={chunk.content} />
                  </ItemContent>
                </Item>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="icon">
                  <ChevronDown />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </CardContent>
        <CardFooter className="justify-end">
          <Button className="cursor-pointer">
            Generate embeddings <ChevronsLeftRightEllipsis />
          </Button>
        </CardFooter>
      </Card> */}
    </DashboardLayoutContainer>
  );
}
