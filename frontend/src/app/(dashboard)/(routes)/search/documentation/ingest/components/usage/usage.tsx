import DashboardSearchDocumentationIngestPageUsageCard from './card';
import DashboardSearchDocumentationIngestPageUsageParse from './parse';
import DashboardSearchDocumentationIngestPageUsageEmbedding from './embedding';

export default function DashboardSearchDocumentationIngestPageUsage() {
  const calculateUsageDateFrom = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.abs(daysAgo));
    return date;
  };

  const usageDateFrom = calculateUsageDateFrom(30);
  const usageDateTo = new Date();

  return (
    <div className="grid grid-cols-2 gap-5 md:gap-10 xl:grid-cols-4">
      <DashboardSearchDocumentationIngestPageUsageCard
        title="Parse credits"
        description="Last 30 days"
        content={<DashboardSearchDocumentationIngestPageUsageParse dateFrom={usageDateFrom} dateTo={usageDateTo} />}
        contentKey="documentation-ingest-usage-parse-30-days"
      />
      <DashboardSearchDocumentationIngestPageUsageCard
        title="Parse credits"
        description="All time"
        content={<DashboardSearchDocumentationIngestPageUsageParse />}
        contentKey="documentation-ingest-usage-parse-all-time"
      />
      <DashboardSearchDocumentationIngestPageUsageCard
        title="Embedding tokens"
        description="Last 30 days"
        content={<DashboardSearchDocumentationIngestPageUsageEmbedding dateFrom={usageDateFrom} dateTo={usageDateTo} />}
        contentKey="documentation-ingest-usage-embedding-30-days"
      />
      <DashboardSearchDocumentationIngestPageUsageCard
        title="Embedding tokens"
        description="All time"
        content={<DashboardSearchDocumentationIngestPageUsageEmbedding />}
        contentKey="documentation-ingest-usage-embedding-all-time"
      />
    </div>
  );
}
