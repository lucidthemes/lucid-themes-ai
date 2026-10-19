import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useIngestJobNewStore } from '../../store/ingest-job-new.store';

export default function DocumentationIngestJobNewOptionCard({
  option,
  title,
  description,
  badge,
}: {
  option: 'generated' | 'manual';
  title: string;
  description?: string;
  badge?: string;
}) {
  const setIngestJobOption = useIngestJobNewStore((state) => state.setIngestJobOption);

  return (
    <Card
      className="relative mx-auto w-full cursor-pointer pt-0 hover:bg-muted"
      onClick={() => setIngestJobOption(option)}
    >
      <div className="relative inset-0 z-30 aspect-video bg-sidebar">
        {badge && (
          <CardAction className="absolute top-5 right-5">
            <Badge variant="secondary">{badge}</Badge>
          </CardAction>
        )}
      </div>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    </Card>
  );
}
