import { Item, ItemContent, ItemTitle } from '@/components/ui/item';

import { getDocumentationIngestUsageEmbedding } from '../../data/get-usage';
import DashboardSearchDocumentationIngestPageUsageFailed from './failed';

export default async function DashboardSearchDocumentationIngestPageUsageEmbedding({
  dateFrom,
  dateTo,
}: {
  dateFrom?: Date;
  dateTo?: Date;
}) {
  const embeddingUsage = await getDocumentationIngestUsageEmbedding(dateFrom, dateTo);

  if (!embeddingUsage) return <DashboardSearchDocumentationIngestPageUsageFailed />;

  return (
    <Item variant="muted">
      <ItemContent>
        <ItemTitle className="text-3xl">{embeddingUsage.total_tokens}</ItemTitle>
      </ItemContent>
    </Item>
  );
}
