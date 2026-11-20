import type { UseFormReturn } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import type { DocumentationIngestJobTestForm } from '../../../../schemas/ingest-job-test.schema';

export default function DocumentationIngestJobTestingNewCommonPhrases({
  form,
}: {
  form: UseFormReturn<DocumentationIngestJobTestForm>;
}) {
  const { setValue } = form;

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
      value: 'How do I fix the stylesheet.css error?',
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <Label>Phrase</Label>
      <div className="flex flex-wrap items-center gap-2.5">
        {commonPhrases.map((phrase) => (
          <Button
            key={phrase.id}
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={() =>
              setValue('phrase', phrase.value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            {phrase.value}
          </Button>
        ))}
      </div>
    </div>
  );
}
