import ListFilter from '@/components/list/filters';

export default function DocumentationIngestSourcesListFilterType() {
  const filterOptions = [
    {
      id: 1,
      section: 'Type',
      items: [
        {
          id: 1,
          value: 'document',
          label: 'Document',
        },
        {
          id: 2,
          value: 'webpage',
          label: 'Webpage',
        },
      ],
    },
  ];

  return <ListFilter type={'type'} label={'Type'} options={filterOptions} />;
}
