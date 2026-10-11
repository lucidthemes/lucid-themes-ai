import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import type { DocumentationIngestJobParseJob } from '../../../../schemas/ingest-job.schema';

export default function DocumentationIngestJobParseJobsItemContentTabs({
  parse_job,
}: {
  parse_job: DocumentationIngestJobParseJob;
}) {
  if (!parse_job || (!parse_job.markdown_full && !parse_job.text_full)) return;

  return (
    <Tabs defaultValue="account">
      <TabsList>
        {parse_job.markdown_full && (
          <TabsTrigger value="markdown" className="cursor-pointer">
            Markdown
          </TabsTrigger>
        )}
        {parse_job.text_full && (
          <TabsTrigger value="plain-text" className="cursor-pointer">
            Plain text
          </TabsTrigger>
        )}
      </TabsList>
      {parse_job.markdown_full && (
        <TabsContent value="markdown">
          <Textarea id="parsed-markdown" value={parse_job.markdown_full} disabled className="max-h-100 opacity-100!" />
        </TabsContent>
      )}
      {parse_job.text_full && (
        <TabsContent value="plain-text">
          <Textarea id="parsed-plain-text" value={parse_job.text_full} disabled className="max-h-100 opacity-100!" />
        </TabsContent>
      )}
    </Tabs>
  );
}
