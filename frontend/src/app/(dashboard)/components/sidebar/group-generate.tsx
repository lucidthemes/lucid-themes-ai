import Link from 'next/link';
import { Newspaper, PanelsTopLeft } from 'lucide-react';

import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';

import type { SidebarNavMenu } from './nav-menu';
import DashboardLayoutSidebarNavMenu from './nav-menu';

export default function DashboardLayoutSidebarGroupGenerate() {
  const items: SidebarNavMenu[] = [
    {
      title: 'Article',
      url: '/generate/article',
      icon: <Newspaper />,
    },
    {
      title: 'UI',
      url: '/generate/ui',
      icon: <PanelsTopLeft />,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel render={<Link href="/generate" />}>Generate</SidebarGroupLabel>
      <DashboardLayoutSidebarNavMenu items={items} />
    </SidebarGroup>
  );
}
