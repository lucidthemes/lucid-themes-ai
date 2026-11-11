import ListFilter from '@/components/list/filters';

export default function DocumentationIngestJobsListFilterStatus() {
  const filterOptions = [
    {
      id: 1,
      section: 'Status',
      items: [
        {
          id: 1,
          value: 'pending',
          label: 'Pending',
        },
        {
          id: 2,
          value: 'completed',
          label: 'Completed',
        },
        {
          id: 3,
          value: 'failed',
          label: 'Failed',
        },
      ],
    },
  ];

  return <ListFilter type={'status'} label={'Status'} options={filterOptions} />;
}
