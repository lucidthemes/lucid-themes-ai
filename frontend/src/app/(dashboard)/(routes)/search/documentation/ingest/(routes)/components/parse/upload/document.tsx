'use client';

import { useState } from 'react';

import { FileText } from 'lucide-react';

import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

import DocumentationIngestJobParseUploadDocumentPages from './document-pages';
import DocumentationIngestJobParseTierSelect from './tier-select';
import DocumentationIngestJobParseTierAccept from './tier-accept';
import DocumentationIngestJobParseCreditCalculator from './credit-calculator';

export default function DocumentationIngestJobParseUploadDocument() {
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
          <DocumentationIngestJobParseUploadDocumentPages setPages={setPages} />
          <DocumentationIngestJobParseTierSelect setDocumentParseTier={setDocumentParseTier} />
          <DocumentationIngestJobParseTierAccept
            type="document"
            calculatorOpen={calculatorOpen}
            setCalculatorOpen={setCalculatorOpen}
          />
        </FieldGroup>
        {calculatorOpen && (
          <DocumentationIngestJobParseCreditCalculator
            documentParseTier={documentParseTier}
            pages={pages}
            setPages={setPages}
          />
        )}
      </ItemContent>
    </Item>
  );
}
