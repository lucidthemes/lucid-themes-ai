import { redirect } from 'next/navigation';

import DashboardLayoutContainer from '../../../../../components/container';
import DashboardLayoutHeading from '../../../../../components/heading';

const isUUID = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);

export default async function DashboardSearchDocumentationIngestJobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isUUID(slug)) redirect('new');

  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="View job" />
      <p>view ingest job! slug: {slug}</p>
    </DashboardLayoutContainer>
  );
}
