import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import type { DocumentationIngestJob } from '../../../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobParseProcessedContentTabs({
  ingestJobData,
}: {
  ingestJobData?: DocumentationIngestJob;
}) {
  if (!ingestJobData || (!ingestJobData.parse_job.markdown_full && !ingestJobData.parse_job.text_full)) return;

  return (
    <Tabs defaultValue="account">
      <TabsList>
        {ingestJobData.parse_job.markdown_full && (
          <TabsTrigger value="markdown" className="cursor-pointer">
            Markdown
          </TabsTrigger>
        )}
        {ingestJobData.parse_job.text_full && (
          <TabsTrigger value="plain-text" className="cursor-pointer">
            Plain text
          </TabsTrigger>
        )}
      </TabsList>
      {ingestJobData.parse_job.markdown_full && (
        <TabsContent value="markdown">
          <Textarea
            id="parsed-markdown"
            value={ingestJobData.parse_job.markdown_full}
            disabled
            className="max-h-100 opacity-100!"
          />
        </TabsContent>
      )}
      {ingestJobData.parse_job.text_full && (
        <TabsContent value="plain-text">
          <Textarea
            id="parsed-plain-text"
            value={ingestJobData.parse_job.text_full}
            disabled
            className="max-h-100 opacity-100!"
          />
        </TabsContent>
      )}
    </Tabs>
  );
}
