import { Item, ItemContent, ItemTitle } from '@/components/ui/item';

import { getDocumentationIngestUsageEmbedding } from '../../data/get-usage';

export default async function DashboardSearchDocumentationIngestPageUsageEmbedding() {
  const embeddingUsage = await getDocumentationIngestUsageEmbedding();
  console.log(embeddingUsage);

  if (!embeddingUsage) return;

  return (
    <Item variant="muted">
      <ItemContent>
        <ItemTitle className="text-3xl">${embeddingUsage.total_tokens}</ItemTitle>
      </ItemContent>
    </Item>
  );
}
