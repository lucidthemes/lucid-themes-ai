'use client';

import { useShallow } from 'zustand/shallow';
import { GlobeCode } from 'lucide-react';
import { cn } from 'cn';

import { CardContent } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { FieldGroup } from '@/components/ui/field';

import { useIngestJobNewStore } from '../../../../../(routes)/new/store/ingest-job-new.store';
import { useDocumentationIngestJobParseUploadWebpageForm } from '../../../../../(routes)/new/hooks/use-parse-upload-form';

import DocumentationIngestJobParseUploadFormFieldTierSelect from '../field-tier-select';
import DocumentationIngestJobParseUploadFormFieldTierAccept from '../field-tier-accept';
import DocumentationIngestJobParseUploadFormSubmitButton from '../submit-button';

import DocumentationIngestJobParseUploadWebpageFormFieldUrl from './field-url';

export default function DocumentationIngestJobParseUploadWebpageForm() {
  const { ingestJobParseUploadType, setIngestJobParseUploadType } = useIngestJobNewStore(
    useShallow((state) => ({
      ingestJobParseUploadType: state.ingestJobParseUploadType,
      setIngestJobParseUploadType: state.setIngestJobParseUploadType,
    })),
  );

  const { form, onSubmit, isPending } = useDocumentationIngestJobParseUploadWebpageForm();

  const documentActiveClass = ingestJobParseUploadType === 'webpage' ? 'active' : '';

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <CardContent className="flex gap-5 p-0">
        <Item
          variant="outline"
          className={cn('not-[.active]:cursor-pointer hover:not-[.active]:bg-muted', documentActiveClass)}
          onClick={() => setIngestJobParseUploadType('webpage')}
        >
          <ItemMedia variant="icon">
            <GlobeCode />
          </ItemMedia>
          <ItemContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <ItemTitle>Web page</ItemTitle>
              <ItemDescription>Parse a web page</ItemDescription>
            </div>
            {ingestJobParseUploadType === 'webpage' && (
              <FieldGroup className="w-full">
                <DocumentationIngestJobParseUploadWebpageFormFieldUrl form={form} />
                <DocumentationIngestJobParseUploadFormFieldTierSelect form={form} />
                <DocumentationIngestJobParseUploadFormFieldTierAccept form={form} />
              </FieldGroup>
            )}
          </ItemContent>
        </Item>
      </CardContent>
      {ingestJobParseUploadType === 'webpage' && (
        <DocumentationIngestJobParseUploadFormSubmitButton isPending={isPending} />
      )}
    </form>
  );
}
