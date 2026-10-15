import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';

import DocumentationIngestLoading from '../../loading';

import DocumentationIngestParseUploadDocument from './document';
import DocumentationIngestParseUploadWebpage from './web-page';

export default function DocumentationIngestParseUpload() {
  const loading = false;

  return (
    <>
      <CardContent className="flex gap-5">
        {!loading && (
          <>
            <DocumentationIngestParseUploadDocument />
            <DocumentationIngestParseUploadWebpage />
          </>
        )}

        {loading && <DocumentationIngestLoading title="Processing LlamaParse job" />}
      </CardContent>

      {!loading && (
        <CardFooter className="justify-end">
          <Button className="cursor-pointer">
            Send to LlamaParse
            <Send />
          </Button>
        </CardFooter>
      )}
    </>
  );
}
