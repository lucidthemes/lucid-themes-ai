import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Field, FieldContent } from '@/components/ui/field';
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

export default function DocumentationIngestParseProcessedFooterSettings() {
  const splitMethods = [
    { label: 'Markdown', value: 'markdown' },
    { label: 'Text', value: 'text' },
  ];

  return (
    <Field orientation="horizontal">
      <FieldContent>
        <Select items={splitMethods} defaultValue="markdown">
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Split method</SelectLabel>
              {splitMethods.map((splitMethod) => (
                <SelectItem key={splitMethod.value} value={splitMethod.value} className="cursor-pointer">
                  {splitMethod.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FieldContent>
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
              <span className="font-medium">Markdown:</span> split by specific header groups. Recommended for most use
              cases
            </li>
            <li>
              <span className="font-medium">Text:</span> split by list of characters. Recommended for generic text
            </li>
          </ul>
        </HoverCardContent>
      </HoverCard>
    </Field>
  );
}
