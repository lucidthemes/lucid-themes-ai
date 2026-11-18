'use client';

import { useState } from 'react';
import { SearchCode, SquareText, ChevronDown, ChevronUp, ArrowUp, Settings, Info } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, ItemActions } from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import { DocumentationIngestJobTestingHeading } from '../heading';

export default function DocumentationIngestJobTesting({}) {
  const [itemOpen, setItemOpen] = useState(true);
  const [itemResultOpen, setItemResultOpen] = useState(true);

  const [settingsOpen, setSettingsOpen] = useState(true);

  const commonPhrases = [
    {
      id: 1,
      value: 'How do I install the theme?',
    },
    {
      id: 2,
      value: 'How do I change the logo?',
    },
    {
      id: 3,
      value: 'How do I fix a stylesheet.css error?',
    },
  ];

  const searchMethods = [
    { label: 'Semantic', value: 'semantic' },
    { label: 'Keyword', value: 'keyword' },
    { label: 'Hybrid', value: 'hybrid' },
  ];

  const similarityMetrics = [
    { label: 'Dot product', value: 'dot' },
    { label: 'Cosine distance', value: 'Cosine' },
    { label: 'Euclidean distance', value: 'euclidean' },
  ];

  return (
    <>
      <DocumentationIngestJobTestingHeading />
      <Card>
        <CardHeader>
          <CardTitle>Tests(1)</CardTitle>
          <CardDescription>Previous test results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <Item variant="outline">
              <ItemMedia variant="icon">
                <SearchCode />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>How do I install the theme?</ItemTitle>
                <ItemDescription>Method: semantic - cosine similarity</ItemDescription>
                <ItemDescription>Results: 5</ItemDescription>
                {itemOpen && (
                  <div className="mt-2.5 flex flex-col gap-5">
                    <Item variant="outline">
                      <ItemMedia variant="icon" className="translate-y-0! self-center!">
                        <SquareText />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle># 018204a2-9e58-4618-affe-e313be132aee</ItemTitle>
                        <ItemDescription>Similarity score: 0.8</ItemDescription>
                        {itemResultOpen && (
                          <Item variant="muted" className="mt-2.5 grow items-start">
                            <p>test</p>
                          </Item>
                        )}
                      </ItemContent>
                      <ItemActions>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setItemResultOpen((open) => !open)}
                          className="cursor-pointer"
                          title={!itemResultOpen ? 'Show content' : 'Hide content'}
                        >
                          <ChevronDown />
                        </Button>
                      </ItemActions>
                    </Item>
                  </div>
                )}
              </ItemContent>
              <ItemActions>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setItemOpen((open) => !open)}
                  className="cursor-pointer"
                  title={!itemOpen ? 'Show results' : 'Hide results'}
                >
                  {!itemOpen && <ChevronDown />}
                  {itemOpen && <ChevronUp />}
                </Button>
              </ItemActions>
            </Item>
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>New test</CardTitle>
          <CardDescription>Create a new test by submitting a search phrase</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2.5">
            {commonPhrases.map((phrase) => (
              <Button key={phrase.id} size="sm" variant="outline" className="cursor-pointer">
                {phrase.value}
              </Button>
            ))}
          </div>
          <Field>
            <InputGroup className="min-h-12.5">
              <InputGroupInput id="inline-end-input" type="password" placeholder="Enter a search phrase to test" />
              <InputGroupAddon align="inline-end">
                <Button
                  variant={settingsOpen ? 'default' : 'outline'}
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => setSettingsOpen((settingsOpen) => !settingsOpen)}
                  title={!settingsOpen ? 'Show settings' : 'Hide settings'}
                >
                  <Settings />
                </Button>
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Button variant="default" size="icon" className="cursor-pointer" title="Submit">
                  <ArrowUp />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          {settingsOpen && (
            <form className="flex w-full flex-col gap-5">
              {/* <Controller
                name="search_method"
                control={form.control}
                render={({ field, fieldState }) => ( */}
              <Field
              //   data-invalid={fieldState.invalid}
              >
                <FieldLabel htmlFor="search_method">Search method</FieldLabel>
                <Select
                  items={searchMethods}
                  // name={field.name} value={field.value} onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Search method</SelectLabel>
                      {searchMethods.map((searchMethod) => (
                        <SelectItem key={searchMethod.value} value={searchMethod.value} className="cursor-pointer">
                          {searchMethod.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
              </Field>
              {/* )}
              /> */}
              <div className="flex w-full items-end gap-5">
                {/* <Controller
                  name="split_method"
                  control={form.control}
                  render={({ field, fieldState }) => ( */}
                <Field
                // data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="split_method">Similarity metric</FieldLabel>
                  <Select
                    items={similarityMetrics}
                    //   name={field.name} value={field.value} onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Similarity metric</SelectLabel>
                        {similarityMetrics.map((similarityMetric) => (
                          <SelectItem
                            key={similarityMetric.value}
                            value={similarityMetric.value}
                            className="cursor-pointer"
                          >
                            {similarityMetric.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
                </Field>
                {/* )}
                /> */}
                <HoverCard>
                  <HoverCardTrigger
                    delay={10}
                    closeDelay={100}
                    render={
                      <Button variant="outline" size="icon">
                        <Info />
                      </Button>
                    }
                  />
                  <HoverCardContent className="flex w-64 flex-col gap-0.5">
                    <ul className="flex flex-col gap-2">
                      <li>
                        <span className="font-medium">Cosine distance:</span> calculates the angle between vectors
                      </li>
                      <li>
                        <span className="font-medium">Euclidean distance:</span> calculates the distance between vectors
                      </li>
                      <li>
                        <span className="font-medium">Dot product (inner product):</span> more efficient for normalized
                        embeddings
                      </li>
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </>
  );
}
