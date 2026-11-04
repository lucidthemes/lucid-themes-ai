// import type { Dispatch, SetStateAction } from 'react';

// import type { DocumentationIngestJob } from '../../../../schemas/ingest-job.schema';

// import DocumentationIngestJobParseJobsItem from './item';

// export default function DocumentationIngestJobParseJobsItems({
//   viewContentOpen,
//   setViewContentOpen,
//   viewContentSplit,
//   setViewContentSplit,
//   ingestJobData,
// }: {
//   viewContentOpen: boolean;
//   setViewContentOpen: Dispatch<SetStateAction<boolean>>;
//   viewContentSplit: boolean;
//   setViewContentSplit: Dispatch<SetStateAction<boolean>>;
//   ingestJobData: DocumentationIngestJob;
// }) {
//   return (
//     <div className="flex flex-col gap-5">
//       {ingestJobData.parse_jobs.map((parse_job) => (
//         <DocumentationIngestJobParseJobsItem key={parse_job.id} ingestJobData={ingestJobData} parse_job={parse_job} />
//       ))}
//     </div>
//   );
// }
