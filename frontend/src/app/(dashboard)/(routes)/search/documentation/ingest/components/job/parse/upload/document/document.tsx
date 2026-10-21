'use client';

import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { FileText, Calculator } from 'lucide-react';
import { cn } from 'cn';

import { CardContent } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { FieldGroup } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

import { useIngestJobNewStore } from '../../../../../(routes)/new/store/ingest-job-new.store';
import { useDocumentationIngestJobParseUploadDocumentForm } from '../../../../../(routes)/new/hooks/use-parse-upload-form';

import DocumentationIngestJobParseUploadFormFieldTierSelect from '../field-tier-select';
import DocumentationIngestJobParseUploadFormFieldTierAccept from '../field-tier-accept';
import DocumentationIngestJobParseUploadFormSubmitButton from '../submit-button';

import DocumentationIngestJobParseUploadDocumentFormFieldFile from './field-file';
import DocumentationIngestJobParseUploadDocumentFormFieldPages from './field-pages';
import DocumentationIngestJobParseUploadDocumentFormCreditCalculator from './credit-calculator';

export default function DocumentationIngestJobParseUploadDocumentForm() {
  const [documentParseTier, setDocumentParseTier] = useState({
    label: 'Cost Effective',
    value: 'cost_effective',
    credits: 3,
  });
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const { ingestJobParseUploadType, setIngestJobParseUploadType } = useIngestJobNewStore(
    useShallow((state) => ({
      ingestJobParseUploadType: state.ingestJobParseUploadType,
      setIngestJobParseUploadType: state.setIngestJobParseUploadType,
    })),
  );

  const { form, onSubmit, isPending } = useDocumentationIngestJobParseUploadDocumentForm();

  const documentActiveClass = ingestJobParseUploadType === 'document' ? 'active' : '';

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <CardContent className="flex gap-5 p-0">
        <Item
          variant="outline"
          className={cn('not-[.active]:cursor-pointer hover:not-[.active]:bg-muted', documentActiveClass)}
          onClick={() => setIngestJobParseUploadType('document')}
        >
          <ItemMedia variant="icon">
            <FileText />
          </ItemMedia>
          <ItemContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <ItemTitle>Document</ItemTitle>
              <ItemDescription>Parse a PDF document</ItemDescription>
            </div>
            {ingestJobParseUploadType === 'document' && (
              <FieldGroup className="w-full">
                <DocumentationIngestJobParseUploadDocumentFormFieldFile form={form} />
                <DocumentationIngestJobParseUploadDocumentFormFieldPages form={form} />
                <DocumentationIngestJobParseUploadFormFieldTierSelect
                  form={form}
                  setDocumentParseTier={setDocumentParseTier}
                />
                <div className="flex justify-between">
                  <DocumentationIngestJobParseUploadFormFieldTierAccept form={form} />
                  <Button
                    variant={calculatorOpen ? 'secondary' : 'outline'}
                    size="icon"
                    title="Calculate"
                    className="cursor-pointer"
                    onClick={() => setCalculatorOpen && setCalculatorOpen((calculatorOpen) => !calculatorOpen)}
                  >
                    <Calculator />
                  </Button>
                </div>
              </FieldGroup>
            )}
            {calculatorOpen && (
              <DocumentationIngestJobParseUploadDocumentFormCreditCalculator documentParseTier={documentParseTier} />
            )}
          </ItemContent>
        </Item>
      </CardContent>
      {ingestJobParseUploadType === 'document' && (
        <DocumentationIngestJobParseUploadFormSubmitButton isPending={isPending} />
      )}
    </form>
  );
}
