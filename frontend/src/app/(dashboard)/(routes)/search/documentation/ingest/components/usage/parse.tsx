import { Item, ItemContent, ItemTitle } from '@/components/ui/item';

import { getDocumentationIngestUsageParse } from '../../data/get-usage';
import DashboardSearchDocumentationIngestPageUsageFailed from './failed';

export default async function DashboardSearchDocumentationIngestPageUsageParse({
  dateFrom,
  dateTo,
}: {
  dateFrom?: Date;
  dateTo?: Date;
}) {
  const parseUsage = await getDocumentationIngestUsageParse(dateFrom, dateTo);

  if (!parseUsage) return <DashboardSearchDocumentationIngestPageUsageFailed />;

  return (
    <Item variant="muted">
      <ItemContent>
        <ItemTitle className="text-3xl">{parseUsage.credits}</ItemTitle>
      </ItemContent>
    </Item>
  );
}
