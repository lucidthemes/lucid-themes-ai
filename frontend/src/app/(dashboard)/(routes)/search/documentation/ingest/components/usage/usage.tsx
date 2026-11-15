import DashboardSearchDocumentationIngestPageUsageCard from './card';
import DashboardSearchDocumentationIngestPageUsageParse from './parse';
import DashboardSearchDocumentationIngestPageUsageEmbedding from './embedding';

export default function DashboardSearchDocumentationIngestPageUsage() {
  return (
    <div className="flex flex-col gap-10 xl:grid xl:grid-cols-4">
      <DashboardSearchDocumentationIngestPageUsageCard
        title="Parse credits"
        description="Last 30 days"
        content={<DashboardSearchDocumentationIngestPageUsageParse />}
        contentKey="documentation-ingest-usage-parse-30-days"
      />
      <DashboardSearchDocumentationIngestPageUsageCard
        title="Parse credits"
        description="All time"
        content={<DashboardSearchDocumentationIngestPageUsageParse />}
        contentKey="documentation-ingest-usage-parse-all-time"
      />
      <DashboardSearchDocumentationIngestPageUsageCard
        title="Embedding costs"
        description="Last 30 days"
        content={<DashboardSearchDocumentationIngestPageUsageEmbedding />}
        contentKey="documentation-ingest-usage-embedding-30-days"
      />
      <DashboardSearchDocumentationIngestPageUsageCard
        title="Embedding costs"
        description="All time"
        content={<DashboardSearchDocumentationIngestPageUsageEmbedding />}
        contentKey="documentation-ingest-usage-embedding-all-time"
      />
    </div>
  );
}
