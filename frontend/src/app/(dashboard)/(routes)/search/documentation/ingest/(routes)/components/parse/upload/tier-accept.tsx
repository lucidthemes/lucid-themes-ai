import type { Dispatch, SetStateAction } from 'react';
import { Calculator } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function DocumentationIngestJobParseTierAccept({
  type,
  calculatorOpen,
  setCalculatorOpen,
}: {
  type: 'document' | 'webpage';
  calculatorOpen?: boolean;
  setCalculatorOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex justify-between">
      <Field orientation="horizontal">
        <Checkbox id="credit-accept" name="credit-accept" />
        <Label htmlFor="credit-accept">Accept LlamaParse credit usage</Label>
      </Field>
      {type === 'document' && (
        <Button
          variant={calculatorOpen ? 'secondary' : 'outline'}
          size="icon"
          title="Calculate"
          className="cursor-pointer"
          onClick={() => setCalculatorOpen && setCalculatorOpen((calculatorOpen) => !calculatorOpen)}
        >
          <Calculator />
        </Button>
      )}
    </div>
  );
}
