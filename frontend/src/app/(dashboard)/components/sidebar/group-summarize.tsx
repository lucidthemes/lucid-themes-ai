import Link from 'next/link';
import { GlobeCode, FileText } from 'lucide-react';

import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';

import type { SidebarNavMenu } from './nav-menu';
import DashboardLayoutSidebarNavMenu from './nav-menu';

export default function DashboardLayoutSidebarGroupSummarize() {
  const items: SidebarNavMenu[] = [
    {
      title: 'Web page',
      url: '/summarize/webpage',
      icon: <GlobeCode />,
    },
    {
      title: 'Document',
      url: '/summarize/document',
      icon: <FileText />,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel render={<Link href="/summarize" />}>Summarize</SidebarGroupLabel>
      <DashboardLayoutSidebarNavMenu items={items} />
    </SidebarGroup>
  );
}
