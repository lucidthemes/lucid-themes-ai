import Link from 'next/link';
import { CodeXml, MonitorSmartphone } from 'lucide-react';

import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';

import type { SidebarNavMenu } from './nav-menu';
import DashboardLayoutSidebarNavMenu from './nav-menu';

export default function DashboardLayoutSidebarGroupValidate() {
  const items: SidebarNavMenu[] = [
    {
      title: 'HTML',
      url: '/validate/html',
      icon: <CodeXml />,
    },
    {
      title: 'Responsive',
      url: '/validate/responsive',
      icon: <MonitorSmartphone />,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel render={<Link href="/validate" />}>Validate</SidebarGroupLabel>
      <DashboardLayoutSidebarNavMenu items={items} />
    </SidebarGroup>
  );
}
