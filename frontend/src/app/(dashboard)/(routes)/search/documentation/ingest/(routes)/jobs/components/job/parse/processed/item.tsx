import type { Dispatch, SetStateAction } from 'react';
import { FileText, GlobeCode, Check, CircleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Spinner } from '@/components/ui/spinner';

import type { DocumentationIngestJob, DocumentationIngestJobParseJob } from '../../../../schemas/ingest-job.schema';

import DocumentationIngestJobParseJobsItemContent from './content';
import DocumentationIngestJobParseJobsItemStatus from './item-status';
import DocumentationIngestJobParseJobsItemButtons from './item-buttons';

export default function DocumentationIngestJobParseJobsItem({
  parse_job,
  ingestJobData,
  viewContentOpen,
  setViewContentOpen,
  viewContentSplit,
  setViewContentSplit,
}: {
  parse_job: DocumentationIngestJobParseJob;
  ingestJobData: DocumentationIngestJob;
  viewContentOpen: boolean;
  setViewContentOpen: Dispatch<SetStateAction<boolean>>;
  viewContentSplit: boolean;
  setViewContentSplit: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">{ingestJobData.source.type === 'document' ? <FileText /> : <GlobeCode />}</ItemMedia>
      <ItemContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          {ingestJobData.source.type === 'document' ? (
            <>
              <ItemTitle>Document</ItemTitle>
              {ingestJobData.source.file_name && <ItemDescription>{ingestJobData.source.file_name}</ItemDescription>}
            </>
          ) : (
            <>
              <ItemTitle>Web page</ItemTitle>
              {ingestJobData.source.webpage_url && (
                <ItemDescription>{ingestJobData.source.webpage_url}</ItemDescription>
              )}
            </>
          )}
        </div>
        {viewContentOpen && (
          <DocumentationIngestJobParseJobsItemContent viewContentSplit={viewContentSplit} parse_job={parse_job} />
        )}
      </ItemContent>
      <ItemActions>
        <DocumentationIngestJobParseJobsItemStatus parse_job={parse_job} />
        {parse_job.status === 'completed' && (
          <DocumentationIngestJobParseJobsItemButtons
            viewContentOpen={viewContentOpen}
            setViewContentOpen={setViewContentOpen}
            viewContentSplit={viewContentSplit}
            setViewContentSplit={setViewContentSplit}
          />
        )}
      </ItemActions>
    </Item>
  );
}
