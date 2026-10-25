import Link from 'next/link';
import { BookOpenText } from 'lucide-react';

import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';

import type { SidebarNavMenu } from './nav-menu';
import DashboardLayoutSidebarNavMenu from './nav-menu';

export default function DashboardLayoutSidebarGroupSearch() {
  const items: SidebarNavMenu[] = [
    {
      title: 'Documentation',
      url: '/search/documentation',
      icon: <BookOpenText />,
      isCollapsible: true,
      items: [
        {
          title: 'Overview',
          url: '/search/documentation',
        },
        {
          title: 'Ingest',
          url: '/search/documentation/ingest',
        },
        {
          title: 'Retrieval',
          url: '#',
          items: [
            {
              title: 'Overview',
              url: '/search/documentation/retrieval',
            },
            {
              title: 'Semantic',
              url: '/search/documentation/retrieval/semantic',
            },
            // {
            //   title: 'Semantic - reranked',
            //   url: '/search/documentation/retrieval/semantic-reranked',
            // },
            {
              title: 'Keyword',
              url: '/search/documentation/retrieval/keyword',
            },
            // {
            //   title: 'Keyword - reranked',
            //   url: '/search/documentation/retrieval/keyword-reranked',
            // },
            {
              title: 'Hybrid',
              url: '/search/documentation/retrieval/hybrid',
            },
            // {
            //   title: 'Hybrid - reranked',
            //   url: '/search/documentation/retrieval/hybrid-reranked',
            // },
          ],
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel render={<Link href="/search" />}>Search</SidebarGroupLabel>
      <DashboardLayoutSidebarNavMenu items={items} />
    </SidebarGroup>
  );
}
