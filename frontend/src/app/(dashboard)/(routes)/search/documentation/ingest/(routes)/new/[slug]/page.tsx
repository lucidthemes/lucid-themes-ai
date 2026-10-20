// import { Metadata } from 'next';
// import { redirect } from 'next/navigation';

// import { isUUID } from '@/lib/validators';

// import DashboardLayoutContainer from '../../../../../../../components/container';
// import DashboardLayoutHeading from '../../../../../../../components/heading';

// import DashboardSearchDocumentationIngestJobNewLayout from '../components/new-job-layout';

// export const metadata: Metadata = {
//   title: 'Documentation - Pending ingest job',
//   description: 'Continue a pending documentation ingest jobs',
// };

// export default async function DashboardSearchDocumentationIngestJobNewContinuePage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;

//   if (!slug || !isUUID(slug)) redirect('new');

//   const ingestJobData = {
//     id: '9a93cf64-8bfc-4c69-8ae3-eaf08b43b6f3',
//     option: 'generated',
//     name: 'Test ingest job!',
//     parse: {
//       type: 'document',
//       fileName: 'some-pdf-file-here.pdf',
//       url: 'https://www.example.com',
//     },
//     parseJob: {
//       id: '00563b80-ef1c-4f0c-b5e9-8762caed9c1b',
//       status: 'completed',
//       markdownFull: '#text',
//       textFull: 'text',
//     },
//     user_id: '',
//     source_type: '', // pdf or url
//     source_name: '', // file name or url
//     status: '', // pending or completed
//     created_at: '',
//     updated_at: '',
//   };

//   return (
//     <DashboardLayoutContainer>
//       <DashboardLayoutHeading heading="Pending ingest job" />
//       <DashboardSearchDocumentationIngestJobNewLayout ingestJobStatus="pending" ingestJobData={ingestJobData} />
//     </DashboardLayoutContainer>
//   );
// }
