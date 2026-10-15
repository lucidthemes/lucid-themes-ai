import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function DocumentationIngestParseCreditCalculator() {
  const [pages, setPages] = useState(1);

  const pagesLabel = pages > 1 ? 'pages' : 'page';

  return (
    <>
      <Separator />
      <div className="flex flex-col gap-5">
        <Field orientation="horizontal" className="justify-end gap-1">
          <Label htmlFor="credit-calculator">Number of pages:</Label>
          <Input
            id="credit-calculator"
            name="credit-calculator"
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
              on tier <Badge variant="secondary">Cost Effective</Badge> at{' '}
              <Badge variant="secondary">3 credits per page</Badge> :
            </span>
            <Badge variant="default">9 credits</Badge>
          </div>
        )}
      </div>
    </>
  );
}
