import { dateTimeFormat, capitalizeText } from '@/lib/formatters';

import type { DocumentationIngestSource } from '../schemas/ingest-source.schema';

export default function DocumentationIngestSourcesViewSheet({ item }: { item: DocumentationIngestSource }) {
  return (
    <div className="flex flex-col gap-5">
      {Object.entries(item).map(([key, value]) => {
        const formattedKey = capitalizeText(key.replaceAll('_', ' '));
        const formattedValue = key.includes('_at') ? dateTimeFormat(value as string) : capitalizeText(value as string);

        return (
          <div key={`source-${key}`} className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{formattedKey}</span>
            <span>{formattedValue ?? '--'}</span>
          </div>
        );
      })}
    </div>
  );
}
