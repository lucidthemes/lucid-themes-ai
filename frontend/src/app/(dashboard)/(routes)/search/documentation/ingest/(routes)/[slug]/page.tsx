import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { isUUID } from '@/lib/validators';

import DashboardLayoutContainer from '../../../../../../components/container';

import {
  DocumentationIngestJobPendingHeading,
  DocumentationIngestJobCompletedHeading,
  DocumentationIngestJobTestingHeading,
} from '../../components/job/heading';
import DocumentationIngestJobLayout from '../../components/job/job-layout';

import getDocumentationIngestJob from './data/get-ingest-job';

export const metadata: Metadata = {
  title: 'Documentation - Ingest job',
  description: 'View a pending or completed documentation ingest jobs',
};

export default async function DashboardSearchDocumentationIngestJobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug || !isUUID(slug)) redirect('new');

  const ingestJobData2 = {
    id: '9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3',
    //user_id: '03c17ec8-71fe-45c6-a591-152d0ce9fe43',
    name: 'Test ingest job',
    source: {
      type: 'document',
      file_name: 'some-pdf-file-here.pdf',
      file_url: '',
      webpage_url: 'https://www.example.com',
    },
    parse_job: {
      id: '00563b80-ef1c-4f0c-b5e9-8762caed9c1b',
      status: 'completed',
      markdown_full: '#text',
      text_full: 'text',
      tier: '',
      error_message: '',
      usage: {
        credits: 30.0,
      },
    },
    chunks: [
      { id: '018204a2-9e58-4618-affe-e313be132aee', content: 'test content 1', vector: 'test vector 1' },
      { id: '01df1db6-87f1-45f4-b34f-b6c5820addad', content: 'test content 2', vector: 'test vector 2' },
    ],
    embeddings_job: {
      // status: '',
      model: 'text-embedding-3-small',
      usage: {
        prompt_tokens: '',
        total_tokens: '',
      },
    },
    status: 'pending',
    created_at: '',
    updated_at: '',
  };

  // source_type: '', // pdf or url
  // source_name: '', // file name or url

  const ingestJobData = await getDocumentationIngestJob(slug);

  console.log(ingestJobData);

  if (!ingestJobData) redirect('ingest');

  return (
    <DashboardLayoutContainer className="py-6">
      <div className="flex flex-col gap-10">
        {ingestJobData.status === 'pending' && <DocumentationIngestJobPendingHeading />}
        {ingestJobData.status === 'completed' && <DocumentationIngestJobCompletedHeading />}
        <DocumentationIngestJobLayout ingestJobStatus={ingestJobData.status} ingestJobData={ingestJobData} />
        {ingestJobData.status === 'completed' && <DocumentationIngestJobTestingHeading />}
      </div>
    </DashboardLayoutContainer>
  );
}
