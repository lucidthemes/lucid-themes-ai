import Link from 'next/link';
import { BookOpenText } from 'lucide-react';

import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';

import type { SidebarNavMenu } from './nav-menu';
import DashboardLayoutSidebarNavMenu from './nav-menu';

export default function DashboardLayoutSidebarGroupSearch() {
  const items: SidebarNavMenu[] = [
    {
      title: 'Documentation',
      url: '#',
      icon: <BookOpenText />,
      isCollapsible: true,
      items: [
        {
          title: 'Ingest',
          url: '/search/documentation/ingest',
        },
        {
          title: 'Retrieval',
          url: '#',
          isActive: true,
          items: [
            {
              title: 'Basic',
              url: '/search/documentation/retrieval/basic',
            },
            {
              title: 'Basic - reranked',
              url: '/search/documentation/retrieval/basic-reranked',
            },
            {
              title: 'Hybrid',
              url: '/search/documentation/retrieval/hybrid',
            },
            {
              title: 'Hybrid - reranked',
              url: '/search/documentation/retrieval/hybrid-reranked',
            },
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
