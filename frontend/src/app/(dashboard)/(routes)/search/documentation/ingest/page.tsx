import DashboardLayoutContainer from '../../../../components/container';
import DashboardLayoutHeading from '../../../../components/heading';

export default function DashboardSearchDocumentationIngestPage() {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="Ingest" buttonUrl="/new" buttonText="New job" />
      <p>search documentation ingest!</p>
      <DashboardLayoutHeading heading="Jobs" level={2} />
      <ul>
        <li>job 1!</li>
        <li>job 2!</li>
      </ul>
    </DashboardLayoutContainer>
  );
}
