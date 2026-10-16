'use client';

import { useState } from 'react';

import { FileText } from 'lucide-react';

import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import DocumentationIngestParseUploadDocumentPages from './document-pages';
import DocumentationIngestParseTierSelect from './tier-select';
import DocumentationIngestParseTierAccept from './tier-accept';
import DocumentationIngestParseCreditCalculator from './credit-calculator';

export default function DocumentationIngestParseUploadDocument() {
  const [documentParseTier, setDocumentParseTier] = useState({
    label: 'Cost Effective',
    value: 'cost_effective',
    credits: 3,
  });
  const [pages, setPages] = useState(1);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  return (
    <Item variant="outline" className="cursor-pointer hover:bg-muted">
      <ItemMedia variant="icon">
        <FileText />
      </ItemMedia>
      <ItemContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <ItemTitle>Document</ItemTitle>
          <ItemDescription>Parse a PDF document</ItemDescription>
        </div>
        <FieldGroup className="w-full">
          <Field>
            <Input id="document" type="file" className="cursor-pointer" accept=".pdf" />
          </Field>
          <DocumentationIngestParseUploadDocumentPages setPages={setPages} />
          <DocumentationIngestParseTierSelect setDocumentParseTier={setDocumentParseTier} />
          <DocumentationIngestParseTierAccept
            type="document"
            calculatorOpen={calculatorOpen}
            setCalculatorOpen={setCalculatorOpen}
          />
        </FieldGroup>
        {calculatorOpen && (
          <DocumentationIngestParseCreditCalculator
            documentParseTier={documentParseTier}
            pages={pages}
            setPages={setPages}
          />
        )}
      </ItemContent>
    </Item>
  );
}
