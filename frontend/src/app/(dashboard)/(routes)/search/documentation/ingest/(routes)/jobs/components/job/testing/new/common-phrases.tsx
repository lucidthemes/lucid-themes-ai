import { Button } from '@/components/ui/button';

export default function DocumentationIngestJobTestingNewCommonPhrases() {
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
    <div className="flex flex-wrap items-center gap-2.5">
      {commonPhrases.map((phrase) => (
        <Button key={phrase.id} size="sm" variant="outline" className="cursor-pointer">
          {phrase.value}
        </Button>
      ))}
    </div>
  );
}
