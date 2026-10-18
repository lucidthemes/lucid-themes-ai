'use client';

// import { Send } from 'lucide-react';
import { cn } from 'cn';

// import { Button } from '@/components/ui/button';
// import { CardContent, CardFooter } from '@/components/ui/card';
// import { Spinner } from '@/components/ui/spinner';

// import {
//   useDocumentationIngestJobParseUploadDocumentForm,
//   useDocumentationIngestJobParseUploadWebpageForm,
// } from '../../../new/hooks/use-parse-upload-form';
import { useIngestJobNewStore } from '../../../new/store/ingest-job-new.store';

import DocumentationIngestJobLoading from '../../../../components/job/loading';

import DocumentationIngestJobParseUploadDocumentForm from './document';
import DocumentationIngestJobParseUploadWebpageForm from './webpage';

export default function DocumentationIngestJobParseUpload() {
  // const { form: formDocument, onSubmit: onSubmitDocument } = useDocumentationIngestJobParseUploadDocumentForm();
  // const { form: formWebpage, onSubmit: onSubmitWebpage } = useDocumentationIngestJobParseUploadWebpageForm();

  const ingestJobParseUploadType = useIngestJobNewStore((state) => state.ingestJobParseUploadType);

  // const form = ingestJobParseUploadType === 'document' ? formDocument : formWebpage;
  // const onSubmit = ingestJobParseUploadType === 'document' ? onSubmitDocument : onSubmitWebpage;

  console.log(ingestJobParseUploadType);

  const loading = false;

  const showUploadDocumentForm = !ingestJobParseUploadType || ingestJobParseUploadType === 'document';
  const showUploadWebpageForm = !ingestJobParseUploadType || ingestJobParseUploadType === 'webpage';

  const formGridClasses = !ingestJobParseUploadType ? 'grid-cols-2' : '';

  return (
    <>
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <CardContent className="flex gap-5">
          {!loading && (
            <>
              {showUploadDocument && <DocumentationIngestJobParseUploadDocument form={form} />}
              {showUploadWebpage && <DocumentationIngestJobParseUploadWebpage form={form} />}
            </>
          )}
        </CardContent>

        {ingestJobParseUploadType && !loading && (
          <CardFooter className="justify-end">
            <Button type="submit" className="cursor-pointer">
              <Spinner />
              Send to LlamaParse
              <Send />
            </Button>
          </CardFooter>
        )}
      </form> */}

      <div className={cn('grid grid-cols-1 gap-5 px-(--card-spacing)', formGridClasses)}>
        {showUploadDocumentForm && <DocumentationIngestJobParseUploadDocumentForm />}
        {showUploadWebpageForm && <DocumentationIngestJobParseUploadWebpageForm />}
      </div>

      {loading && <DocumentationIngestJobLoading title="Processing LlamaParse job" />}
    </>
  );
}
