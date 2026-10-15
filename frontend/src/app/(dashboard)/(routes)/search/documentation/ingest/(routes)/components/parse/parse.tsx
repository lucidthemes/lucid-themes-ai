import { Card } from '@/components/ui/card';

import DocumentationIngestParseHeader from './header';
import DocumentationIngestParseUpload from './upload';
import DocumentationIngestParseProcessed from './processed';

export default function DocumentationIngestParse() {
  return (
    <Card className="mx-auto w-full">
      <DocumentationIngestParseHeader />

      <DocumentationIngestParseUpload />

      <DocumentationIngestParseProcessed />
    </Card>
  );
}
