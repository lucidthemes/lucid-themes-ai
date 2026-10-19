import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function DocumentationIngestJobParseProcessedContentTabs({ ingestJobData }) {
  if (!ingestJobData || (!ingestJobData.parseJob.markdownFull && !ingestJobData.parseJob.textFull)) return;

  return (
    <Tabs defaultValue="account">
      <TabsList>
        {ingestJobData.parseJob.markdownFull && (
          <TabsTrigger value="markdown" className="cursor-pointer">
            Markdown
          </TabsTrigger>
        )}
        {ingestJobData.parseJob.textFull && (
          <TabsTrigger value="plain-text" className="cursor-pointer">
            Plain text
          </TabsTrigger>
        )}
      </TabsList>
      {ingestJobData.parseJob.markdownFull && (
        <TabsContent value="markdown">
          <Textarea
            id="parsed-markdown"
            value={ingestJobData.parseJob.markdownFull}
            disabled
            className="max-h-100 opacity-100!"
          />
        </TabsContent>
      )}
      {ingestJobData.parseJob.textFull && (
        <TabsContent value="plain-text">
          <Textarea
            id="parsed-plain-text"
            value={ingestJobData.parseJob.textFull}
            disabled
            className="max-h-100 opacity-100!"
          />
        </TabsContent>
      )}
    </Tabs>
  );
}
