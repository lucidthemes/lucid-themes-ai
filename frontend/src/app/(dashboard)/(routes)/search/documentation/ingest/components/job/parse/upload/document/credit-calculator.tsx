import type { Dispatch, SetStateAction } from 'react';

import { Badge } from '@/components/ui/badge';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function DocumentationIngestJobParseUploadDocumentFormCreditCalculator({
  documentParseTier,
  pages,
  setPages,
}: {
  documentParseTier: {
    label: string;
    value: string;
    credits: number;
  };
  pages: number;
  setPages: Dispatch<SetStateAction<number>>;
}) {
  const pagesLabel = pages > 1 ? 'pages' : 'page';

  const parseCreditsTotal = pages * documentParseTier.credits;

  return (
    <>
      <Separator />
      <div className="flex flex-col gap-5">
        <Field orientation="horizontal" className="justify-end gap-1">
          <Label htmlFor="ingest-job-parse-credit-calculator">Number of pages:</Label>
          <Input
            id="ingest-job-parse-credit-calculator"
            name="ingest-job-parse-credit-calculator"
            type="number"
            className="max-w-20"
            min={1}
            value={pages}
            onChange={(value) => {
              const pagesValue = value.target.valueAsNumber;

              if (pagesValue) setPages(pagesValue);
            }}
          />
        </Field>
        {pages >= 1 && (
          <div className="flex justify-end gap-1">
            <span className="text-sm font-medium">
              Cost to parse{' '}
              <Badge variant="secondary">
                {pages} {pagesLabel}
              </Badge>{' '}
              on tier <Badge variant="secondary">{documentParseTier.label}</Badge> at{' '}
              <Badge variant="secondary">{documentParseTier.credits} credits per page</Badge> :
            </span>
            <Badge variant="default">{parseCreditsTotal} credits</Badge>
          </div>
        )}
      </div>
    </>
  );
}
