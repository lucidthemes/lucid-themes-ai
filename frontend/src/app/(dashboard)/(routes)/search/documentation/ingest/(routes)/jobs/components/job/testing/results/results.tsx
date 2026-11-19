import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import DocumentationIngestJobTestingResultsItems from './items';
import DocumentationIngestJobTestingResultsEmpty from './empty';

export default function DocumentationIngestJobTestingResults({ tests }) {
  if (!tests) return;

  const resultsCount = tests.length;

  return (
    <>
      <CardHeader>
        <CardTitle>Tests ({resultsCount})</CardTitle>
        <CardDescription>Previous test results</CardDescription>
      </CardHeader>
      <CardContent>
        {resultsCount > 0 && <DocumentationIngestJobTestingResultsItems tests={tests} />}
        {resultsCount === 0 && <DocumentationIngestJobTestingResultsEmpty />}
      </CardContent>
    </>
  );
}
