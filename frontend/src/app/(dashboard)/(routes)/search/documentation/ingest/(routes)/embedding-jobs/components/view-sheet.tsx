import { Textarea } from '@/components/ui/textarea';
import { dateTimeFormat, capitalizeText } from '@/lib/formatters';

import type { DocumentationIngestEmbeddingJob } from '../schemas/ingest-embedding-job.schema';

export default function DocumentationIngestEmbeddingJobsViewSheet({ item }: { item: DocumentationIngestEmbeddingJob }) {
  return (
    <div className="flex flex-col gap-5">
      {Object.entries(item).map(([key, value]) => {
        const formattedKey = capitalizeText(key.replaceAll('_', ' '));
        const formattedValue = key.includes('_at')
          ? dateTimeFormat(value as string)
          : key !== 'usage'
            ? capitalizeText(value as string)
            : key === 'usage'
              ? (value = value ? JSON.stringify(value, null, 1) : '--')
              : (value as string);

        return (
          <div key={`embedding-job-${key}`} className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{formattedKey}</span>
            {key !== 'usage' && <span>{formattedValue ?? '--'}</span>}
            {key.includes('usage') && (
              <Textarea
                name={`embedding-job-${key}`}
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
