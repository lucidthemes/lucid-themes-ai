import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import DocumentationIngestJobTestingResultsItems from './items';

export default function DocumentationIngestJobTestingResults({}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Tests(1)</CardTitle>
        <CardDescription>Previous test results</CardDescription>
      </CardHeader>
      <CardContent>
        <DocumentationIngestJobTestingResultsItems />
      </CardContent>
    </>
  );
}
