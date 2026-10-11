import { Textarea } from '@/components/ui/textarea';
import { dateTimeFormat, capitalizeText } from '@/lib/formatters';

import type { DocumentationIngestParseJob } from '../schemas/ingest-parse-job.schema';

export default function DocumentationIngestParseJobsViewSheet({ item }: { item: DocumentationIngestParseJob }) {
  return (
    <div className="flex flex-col gap-5">
      {Object.entries(item).map(([key, value]) => {
        const formattedKey = capitalizeText(key.replaceAll('_', ' '));
        const formattedValue = key.includes('_at')
          ? dateTimeFormat(value as string)
          : key !== 'tier' && key !== 'usage'
            ? capitalizeText(value as string)
            : key === 'usage'
              ? (value = value ? JSON.stringify(value, null, 1) : '--')
              : (value as string);

        return (
          <div key={`parse-job-${key}`} className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{formattedKey}</span>
            {!key.includes('_full') && key !== 'usage' ? (
              <span>{formattedValue ?? '--'}</span>
            ) : (
              <Textarea
                name={`parse-job-${key}`}
                value={formattedValue ?? '--'}
                disabled
                className="max-h-100 opacity-100!"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
