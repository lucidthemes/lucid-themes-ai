import { Textarea } from '@/components/ui/textarea';
import { dateTimeFormat, capitalizeText } from '@/lib/formatters';

import type { DocumentationIngestChunk } from '../schemas/ingest-chunk.schema';

export default function DocumentationIngestChunksViewSheet({ item }: { item: DocumentationIngestChunk }) {
  return (
    <div className="flex flex-col gap-5">
      {Object.entries(item).map(([key, value]) => {
        const formattedKey = capitalizeText(key.replaceAll('_', ' '));
        const formattedValue = key.includes('_at')
          ? dateTimeFormat(value as string)
          : key !== 'metadata'
            ? capitalizeText(value as string)
            : key === 'metadata'
              ? (value = value ? JSON.stringify(value, null, 1) : '--')
              : (value as string);

        return (
          <div key={`chunk-${key}`} className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">{formattedKey}</span>
            {key !== 'metadata' && key !== 'embedding' ? (
              <span>{formattedValue ?? '--'}</span>
            ) : (
              <Textarea
                name={`chunk-${key}`}
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
