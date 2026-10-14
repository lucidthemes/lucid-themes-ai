import DashboardLayoutContainer from '../../../../../../components/container';
import DashboardLayoutHeading from '../../../../../../components/heading';

import DocumentationIngestParse from '../../components/parse';
import DocumentationIngestChunks from '../../components/chunks';
import DocumentationIngestCosts from '../../components/costs';

import DocumentationIngestNewBackButton from './components/back-button';
import DocumentationIngestNewCreateOptions from './components/create-options/create-options';

export default async function DashboardSearchDocumentationIngestNewPage({}) {
  return (
    <DashboardLayoutContainer>
      <DashboardLayoutHeading heading="New job" />
      <div className="flex flex-col gap-10">
        <DocumentationIngestNewBackButton />
        <DocumentationIngestNewCreateOptions />
      </div>
      <DocumentationIngestParse />
      <DocumentationIngestChunks />
      <DocumentationIngestCosts />
    </DashboardLayoutContainer>
  );
}
