import { Item, ItemContent, ItemTitle } from '@/components/ui/item';

import { getDocumentationIngestUsageParse } from '../../data/get-usage';
import DashboardSearchDocumentationIngestPageUsageFailed from './failed';

export default async function DashboardSearchDocumentationIngestPageUsageParse() {
  const parseUsage = await getDocumentationIngestUsageParse();
  console.log(parseUsage);

  if (!parseUsage || parseUsage.credits === 0) return <DashboardSearchDocumentationIngestPageUsageFailed />;

  return (
    <Item variant="muted">
      <ItemContent>
        <ItemTitle className="text-3xl">{parseUsage.credits}</ItemTitle>
      </ItemContent>
    </Item>
  );
}
